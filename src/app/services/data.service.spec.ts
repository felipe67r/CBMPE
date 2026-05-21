import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService, UsuarioLogado } from './data.service';
import { Ocorrencia } from '../core/models/ocorrencia.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const mockUsuario: UsuarioLogado = {
    nome: 'João Silva',
    matricula: '12345',
    unidade: 'Bombeiros Centro',
  };

  const mockOcorrencia: Ocorrencia = {
    protocolo: 'OC001',
    natureza: 'Incêndio',
    estado: 'Despachado',
    gravidade: 'Alta',
    local: 'Rua A, 123',
    horaPedido: '10:30',
    riscosAdicionais: 'Nenhum',
    statusLocal: 'Ativo',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);

    // Limpar localStorage e sessionStorage antes de cada teste
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
    sessionStorage.clear();
  });

  // ========== TESTES DE AUTENTICAÇÃO ==========

  describe('Login', () => {
    it('deve fazer login com sucesso e armazenar usuário', (done) => {
      const matricula = '12345';
      const senha = '123456';
      const unidade = 'Bombeiros Centro';

      service.login(matricula, senha, unidade).subscribe(
        (response) => {
          expect(service.isLoggedIn()).toBe(true);
          expect(service.getUsuarioAtual()).toEqual(mockUsuario);
          done();
        },
        () => {
          fail('O login deveria ter sido bem-sucedido');
        }
      );

      const req = httpMock.expectOne('http://localhost:3000/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush({ usuario: mockUsuario });
    });

    it('deve retornar erro 401 para credenciais inválidas', (done) => {
      const matricula = 'invalido';
      const senha = 'invalido';
      const unidade = 'Bombeiros Centro';

      service.login(matricula, senha, unidade).subscribe(
        () => {
          fail('Deveria retornar um erro');
        },
        (error) => {
          expect(error.message).toContain('Credenciais inválidas');
          done();
        }
      );

      const req = httpMock.expectOne('http://localhost:3000/auth/login');
      req.flush(
        { message: 'Credenciais inválidas' },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });

  describe('Logout', () => {
    it('deve fazer logout e limpar dados', () => {
      // Simular login
      localStorage.setItem('usuario_cbmpe', JSON.stringify(mockUsuario));
      service['usuarioSubject'].next(mockUsuario);

      service.logout();

      expect(service.isLoggedIn()).toBe(false);
      expect(service.getUsuarioAtual()).toBeNull();
      expect(localStorage.getItem('usuario_cbmpe')).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('deve retornar true quando usuário está logado', () => {
      service['usuarioSubject'].next(mockUsuario);
      expect(service.isLoggedIn()).toBe(true);
    });

    it('deve retornar false quando não há usuário logado', () => {
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('getUsuarioAtual', () => {
    it('deve retornar o usuário atualmente logado', () => {
      service['usuarioSubject'].next(mockUsuario);
      expect(service.getUsuarioAtual()).toEqual(mockUsuario);
    });

    it('deve retornar null quando não há usuário logado', () => {
      expect(service.getUsuarioAtual()).toBeNull();
    });
  });

  // ========== TESTES DE OCORRÊNCIAS ==========

  describe('getOcorrenciaAtual', () => {
    it('deve retornar um Observable da ocorrência atual', (done) => {
      service.setOcorrenciaAtual(mockOcorrencia);

      service.getOcorrenciaAtual().subscribe((ocorrencia) => {
        expect(ocorrencia).toEqual(mockOcorrencia);
        done();
      });
    });
  });

  describe('setOcorrenciaAtual', () => {
    it('deve definir a ocorrência atual e armazenar no sessionStorage', () => {
      service.setOcorrenciaAtual(mockOcorrencia);

      expect(service.getOcorrenciaAtualSync()).toEqual(mockOcorrencia);
      expect(sessionStorage.getItem('ocorrencia_cbmpe')).toBe(
        JSON.stringify(mockOcorrencia)
      );
    });
  });

  describe('limparOcorrenciaAtual', () => {
    it('deve limpar a ocorrência atual', () => {
      service.setOcorrenciaAtual(mockOcorrencia);
      service.limparOcorrenciaAtual();

      expect(service.getOcorrenciaAtualSync()).toBeNull();
      expect(sessionStorage.getItem('ocorrencia_cbmpe')).toBeNull();
    });
  });

  describe('salvarConclusao', () => {
    it('deve salvar conclusão com sucesso', (done) => {
      service['usuarioSubject'].next(mockUsuario);

      const conclusao = { parecer: 'Caso resolvido', acoesRealizadas: ['Resgate'] };

      service.salvarConclusao(conclusao).subscribe(
        (response) => {
          expect(service.getOcorrenciaAtualSync()).toBeNull();
          done();
        },
        () => {
          fail('Deveria ter salvado a conclusão com sucesso');
        }
      );

      const req = httpMock.expectOne('http://localhost:3000/ocorrencias/conclusao');
      expect(req.request.method).toBe('POST');
      req.flush({ sucesso: true });
    });

    it('deve retornar erro se usuário não está autenticado', (done) => {
      const conclusao = { parecer: 'Caso resolvido' };

      service.salvarConclusao(conclusao).subscribe(
        () => {
          fail('Deveria retornar um erro');
        },
        (error) => {
          expect(error.message).toBe('Usuário não autenticado');
          done();
        }
      );
    });
  });

  describe('getOcorrencias', () => {
    it('deve buscar ocorrências do backend', (done) => {
      service['usuarioSubject'].next(mockUsuario);

      service.getOcorrencias().subscribe(
        (ocorrencias) => {
          expect(ocorrencias.length).toBe(1);
          expect(ocorrencias[0]).toEqual(mockOcorrencia);
          done();
        },
        () => {
          fail('Deveria ter buscado ocorrências com sucesso');
        }
      );

      const req = httpMock.expectOne(
        'http://localhost:3000/ocorrencias?unidade=Bombeiros Centro'
      );
      expect(req.request.method).toBe('GET');
      req.flush([mockOcorrencia]);
    });
  });

  describe('atualizarOcorrencia', () => {
    it('deve atualizar ocorrência com sucesso', (done) => {
      service['usuarioSubject'].next(mockUsuario);

      const dadosAtualizacao = { estado: 'Atendido' as const };

      service
        .atualizarOcorrencia(mockOcorrencia.protocolo, dadosAtualizacao)
        .subscribe(
          (ocorrencia) => {
            expect(ocorrencia.estado).toBe('Atendido');
            done();
          },
          () => {
            fail('Deveria ter atualizado a ocorrência com sucesso');
          }
        );

      const req = httpMock.expectOne(
        'http://localhost:3000/ocorrencias/OC001'
      );
      expect(req.request.method).toBe('PUT');
      req.flush({ ...mockOcorrencia, estado: 'Atendido' });
    });
  });

  // ========== TESTES DE ARMAZENAMENTO ==========

  describe('Armazenamento', () => {
    it('deve carregar usuário do localStorage ao inicializar', () => {
      localStorage.setItem('usuario_cbmpe', JSON.stringify(mockUsuario));

      // Criar nova instância do serviço para testar o carregamento
      const novoService = new DataService(TestBed.inject(HttpClientTestingModule));
      expect(novoService.getUsuarioAtual()).toEqual(mockUsuario);
    });

    it('deve carregar ocorrência do sessionStorage ao inicializar', () => {
      sessionStorage.setItem('ocorrencia_cbmpe', JSON.stringify(mockOcorrencia));

      const novoService = new DataService(TestBed.inject(HttpClientTestingModule));
      expect(novoService.getOcorrenciaAtualSync()).toEqual(mockOcorrencia);
    });
  });
});
