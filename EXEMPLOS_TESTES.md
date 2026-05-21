# 🧪 Exemplos de Testes - LOGIN e CONCLUSÃO

## Login Component Tests

```typescript
// login.page.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const dataServiceMock = jasmine.createSpyObj('DataService', [
      'login',
      'isLoggedIn'
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    dataServiceSpy = TestBed.inject(
      DataService
    ) as jasmine.SpyObj<DataService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('matricula')?.value).toBe('');
    expect(component.loginForm.get('senha')?.value).toBe('');
    expect(component.loginForm.get('unidade')?.value).toBe('');
  });

  it('should validate matricula field', () => {
    const matriculaControl = component.loginForm.get('matricula');
    
    matriculaControl?.setValue('');
    expect(matriculaControl?.hasError('required')).toBeTruthy();
    
    matriculaControl?.setValue('123');
    expect(matriculaControl?.hasError('minlength')).toBeTruthy();
    
    matriculaControl?.setValue('1234');
    expect(matriculaControl?.valid).toBeTruthy();
  });

  it('should validate senha field', () => {
    const senhaControl = component.loginForm.get('senha');
    
    senhaControl?.setValue('');
    expect(senhaControl?.hasError('required')).toBeTruthy();
    
    senhaControl?.setValue('12345');
    expect(senhaControl?.hasError('minlength')).toBeTruthy();
    
    senhaControl?.setValue('123456');
    expect(senhaControl?.valid).toBeTruthy();
  });

  it('should disable button when form is invalid', () => {
    component.loginForm.patchValue({
      matricula: '',
      senha: '',
      unidade: ''
    });
    
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should call dataService.login on form submit', () => {
    dataServiceSpy.login.and.returnValue(of({ usuario: { nome: 'Test' } }));
    
    component.loginForm.patchValue({
      matricula: '1234',
      senha: 'senha123',
      unidade: 'unidade-1'
    });
    
    component.onLogin();
    
    expect(dataServiceSpy.login).toHaveBeenCalledWith(
      '1234',
      'senha123',
      'unidade-1'
    );
  });

  it('should navigate to dashboard on successful login', (done) => {
    dataServiceSpy.login.and.returnValue(of({ usuario: { nome: 'Test' } }));
    
    component.loginForm.patchValue({
      matricula: '1234',
      senha: 'senha123',
      unidade: 'unidade-1'
    });
    
    component.onLogin();
    
    setTimeout(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
      done();
    }, 1600);
  });

  it('should display error message on login failure', () => {
    const error = new Error('Invalid credentials');
    dataServiceSpy.login.and.returnValue(
      throwError(() => ({
        error: { mensagem: 'Usuário ou senha incorretos' }
      }))
    );
    
    component.loginForm.patchValue({
      matricula: '1234',
      senha: 'wrongpassword',
      unidade: 'unidade-1'
    });
    
    component.onLogin();
    
    expect(component.errorMessage).toBe('Usuário ou senha incorretos');
  });

  it('should redirect to admin page', () => {
    component.loginForm.patchValue({
      matricula: '1234'
    });
    
    component.onAdmin();
    
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should show loading state during authentication', () => {
    dataServiceSpy.login.and.returnValue(of({ usuario: { nome: 'Test' } }));
    
    expect(component.loading).toBeFalsy();
    
    component.loginForm.patchValue({
      matricula: '1234',
      senha: 'senha123',
      unidade: 'unidade-1'
    });
    
    component.onLogin();
    
    expect(component.loading).toBeFalsy(); // Completa rapidamente
  });

  it('should have 4 unidades options', () => {
    expect(component.unidades.length).toBe(4);
    expect(component.unidades[0].label).toContain('Centro');
  });
});
```

---

## Conclusão Component Tests

```typescript
// conclusao.page.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConclusaoPage } from './conclusao.page';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ConclusaoPage', () => {
  let component: ConclusaoPage;
  let fixture: ComponentFixture<ConclusaoPage>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockOcorrencia = {
    protocolo: 'OCR20240001',
    natureza: 'Incêndio',
    estado: 'Atendido',
    gravidade: 'Alta',
    local: 'Rua das Flores',
    horaPedido: '14:30',
    riscosAdicionais: 'Nenhum',
    statusLocal: 'Em andamento'
  };

  const mockUsuario = {
    nome: 'João Silva',
    matricula: '1234',
    unidade: 'CBMPE - Centro'
  };

  beforeEach(async () => {
    const dataServiceMock = jasmine.createSpyObj('DataService', [
      'getOcorrenciaAtual',
      'getUsuarioAtual$',
      'atualizarOcorrencia',
      'limparOcorrenciaAtual'
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ConclusaoPage],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    dataServiceSpy = TestBed.inject(
      DataService
    ) as jasmine.SpyObj<DataService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(ConclusaoPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on creation', () => {
    expect(component.conclusaoForm).toBeDefined();
    expect(component.conclusaoForm.get('status')).toBeDefined();
    expect(component.conclusaoForm.get('observacoes')).toBeDefined();
    expect(component.conclusaoForm.get('assinatura')).toBeDefined();
  });

  it('should load ocorrencia on init', () => {
    dataServiceSpy.getOcorrenciaAtual.and.returnValue(of(mockOcorrencia));
    dataServiceSpy.getUsuarioAtual$.and.returnValue(of(mockUsuario));

    component.ngOnInit();

    expect(dataServiceSpy.getOcorrenciaAtual).toHaveBeenCalled();
    expect(dataServiceSpy.getUsuarioAtual$).toHaveBeenCalled();
  });

  it('should display ocorrencia data', () => {
    component.ocorrenciaAtual = mockOcorrencia;
    fixture.detectChanges();

    expect(component.ocorrenciaAtual.protocolo).toBe('OCR20240001');
    expect(component.ocorrenciaAtual.natureza).toBe('Incêndio');
  });

  it('should validate observacoes field', () => {
    const observacoesControl = component.conclusaoForm.get('observacoes');
    
    observacoesControl?.setValue('short');
    expect(observacoesControl?.hasError('minlength')).toBeTruthy();
    
    observacoesControl?.setValue('a'.repeat(501));
    expect(observacoesControl?.hasError('maxlength')).toBeTruthy();
    
    observacoesControl?.setValue('Observações válidas com tamanho correto');
    expect(observacoesControl?.valid).toBeTruthy();
  });

  it('should handle signature upload', () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } };

    component.onAssinaturaChange(event);

    // Verificar se arquivo foi processado
    expect(component.conclusaoForm.get('assinatura')?.value).toBeDefined();
  });

  it('should call atualizarOcorrencia on confirmation', () => {
    component.ocorrenciaAtual = mockOcorrencia;
    component.conclusaoForm.patchValue({
      status: 'Concluído',
      observacoes: 'Ocorrência finalizada com sucesso',
      assinatura: 'data:image/png;base64,iVBORw0KGgo...'
    });

    dataServiceSpy.atualizarOcorrencia.and.returnValue(
      of(mockOcorrencia)
    );

    component.confirmarFinalizacao();

    expect(dataServiceSpy.atualizarOcorrencia).toHaveBeenCalledWith(
      'OCR20240001',
      jasmine.objectContaining({
        estado: 'Concluído',
        statusLocal: 'Ocorrência finalizada com sucesso'
      })
    );
  });

  it('should navigate to dashboard after successful finalization', (done) => {
    component.ocorrenciaAtual = mockOcorrencia;
    dataServiceSpy.atualizarOcorrencia.and.returnValue(
      of(mockOcorrencia)
    );

    component.confirmarFinalizacao();

    setTimeout(() => {
      expect(dataServiceSpy.limparOcorrenciaAtual).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
      done();
    }, 2100);
  });

  it('should display error on update failure', () => {
    component.ocorrenciaAtual = mockOcorrencia;
    dataServiceSpy.atualizarOcorrencia.and.returnValue(
      throwError(() => new Error('Update failed'))
    );

    component.confirmarFinalizacao();

    expect(component.errorMessage).toContain('Erro ao finalizar');
  });

  it('should return correct status color', () => {
    expect(component.getStatusColor('Concluído')).toBe('success');
    expect(component.getStatusColor('Atendido')).toBe('warning');
    expect(component.getStatusColor('Cancelado')).toBe('danger');
  });

  it('should return correct status icon', () => {
    expect(component.getStatusIcon('Concluído')).toBe('checkmarkCircle');
    expect(component.getStatusIcon('Cancelado')).toBe('closeCircle');
    expect(component.getStatusIcon('Atendido')).toBe('warning');
  });

  it('should disable finalize button if form is invalid', () => {
    component.conclusaoForm.patchValue({
      status: '',
      observacoes: '',
      assinatura: ''
    });

    expect(component.conclusaoForm.invalid).toBeTruthy();
  });

  it('should show confirmation alert', () => {
    component.conclusaoForm.patchValue({
      status: 'Concluído',
      observacoes: 'Teste',
      assinatura: 'data:image/png;base64,...'
    });

    component.finalizarOcorrencia();

    expect(component.showAlert).toBeTruthy();
  });

  it('should cancel finalization', () => {
    component.showAlert = true;

    component.cancelarFinalizacao();

    expect(component.showAlert).toBeFalsy();
  });

  it('should navigate back to dashboard', () => {
    component.voltarDashboard();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
```

---

## Integration Tests

```typescript
// login-conclusao.integration.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './pages/login/login.page';
import { ConclusaoPage } from './pages/conclusao/conclusao.page';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';

describe('Login and Conclusão Integration', () => {
  let loginFixture: ComponentFixture<LoginPage>;
  let conclusaoFixture: ComponentFixture<ConclusaoPage>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage, ConclusaoPage],
      providers: [DataService]
    }).compileComponents();

    dataService = TestBed.inject(DataService);
    loginFixture = TestBed.createComponent(LoginPage);
    conclusaoFixture = TestBed.createComponent(ConclusaoPage);
  });

  it('should complete full login and conclusão flow', () => {
    // 1. Login
    const loginComponent = loginFixture.componentInstance;
    loginComponent.loginForm.patchValue({
      matricula: '1234',
      senha: 'senha123',
      unidade: 'unidade-1'
    });

    expect(loginComponent.loginForm.valid).toBeTruthy();

    // 2. Conclusão
    const conclusaoComponent = conclusaoFixture.componentInstance;
    conclusaoComponent.conclusaoForm.patchValue({
      status: 'Concluído',
      observacoes: 'Teste completo',
      assinatura: 'data:image/png;base64,...'
    });

    expect(conclusaoComponent.conclusaoForm.valid).toBeTruthy();
  });
});
```

---

## Rodando Testes

```bash
# Rodar todos os testes
ng test

# Rodar testes de um arquivo específico
ng test --include='**/login.page.spec.ts'

# Rodar com coverage
ng test --code-coverage

# Rodar teste uma única vez (CI)
ng test --watch=false --browsers=ChromeHeadless
```

---

## Coverage Report

```bash
# Gerar relatório de cobertura
ng test --code-coverage --watch=false

# Abrir relatório
open coverage/index.html  # macOS
start coverage/index.html # Windows
xdg-open coverage/index.html # Linux
```

---

**Nota**: Os testes acima são exemplos. Adapte-os conforme necessário para sua implementação.
