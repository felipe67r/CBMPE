import pool from '../../db.js';

// 1. Etapa de Triagem (Cria a ocorrência)
export const salvarTriagem = async (req, res) => {
  const { tipo, gravidade, temVitimas, quantidadeVitimas, riscos, statusLocal, gps, usuario_matricula } = req.body;

  try {
    // Calculamos a quantidade de vítimas com base no 'temVitimas'
    const qtdVítimasCalculada = temVitimas === 'sim' ? parseInt(quantidadeVitimas) || 0 : 0;

    // Montamos um texto combinando os riscos e o status do local para guardar na coluna riscos_adicionais
    const riscosAdicionaisTexto = `Status: ${statusLocal || ''} | Riscos: ${riscos || ''}`;

    // Insere no PostgreSQL. O campo id_ocorrencia (SERIAL) gera o número sequencial automaticamente.
    const queryText = `
      INSERT INTO ocorrencias (tipo_ocorrencia, nivel_gravidade, qtd_vitimas, riscos_adicionais, localizacao, usuario_matricula)
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id_ocorrencia;
    `;
    
    const valores = [
      tipo, 
      gravidade, 
      qtdVítimasCalculada, 
      riscosAdicionaisTexto, 
      gps, // O campo gps do Ionic entra na coluna de localizacao
      usuario_matricula || null // É bom enviar a matrícula do usuário logado
    ];

    const resultado = await pool.query(queryText, valores);
    const idGerado = resultado.rows[0].id_ocorrencia;

    // Criamos um protocolo visual "001, 002..." simulado com base no ID real do banco
    const protocoloSimulado = idGerado.toString().padStart(3, '0');

    console.log('Triagem criada no Postgres, ID:', idGerado, 'Protocolo:', protocoloSimulado);
    
    return res.status(201).json({ 
      mensagem: 'Triagem salva!', 
      id: idGerado, // Retorna o ID numérico que o front precisa passar para as próximas rotas
      protocolo: protocoloSimulado 
    });

  } catch (error) {
    console.error('Erro ao salvar triagem:', error);
    return res.status(500).json({ mensagem: 'Erro interno ao salvar triagem no banco de dados.' });
  }
};

// 2. Etapa de Evidências (Insere os dados logísticos)
export const salvarEvidencias = async (req, res) => {
  // Desestruturando exatamente os nomes que vêm do seu formulário no Ionic
  const { 
    id, detalhamentoTecnico, agenteExtintor, mangueiras, protecaoRespiratoria, 
    arrombamento, suporteBasicoVida, transporte, curativosEConsumiveis, 
    diagnostico, ferramentasHidraulicas, iluminacaoEnergia, superficie, 
    mergulho, cordas, seguranca 
  } = req.body;

  try {
    // Primeiro, verifica se a ocorrência informada realmente existe no banco
    const verificarOcorrencia = await pool.query('SELECT id_ocorrencia FROM ocorrencias WHERE id_ocorrencia = $1', [id]);
    
    if (verificarOcorrencia.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Ocorrência não encontrada!' });
    }

    // Faz o INSERT na tabela de evidencias. Usamos ON CONFLICT para caso o agente decida atualizar as evidências da mesma ocorrência.
    const queryText = `
      INSERT INTO evidencias (
        id_ocorrencia, fotos, detalhamento_tecnico, agentes_extintores, estabelecimento_mangueira, 
        equip_protecao, ferramentas_arrombamento, suporte_basico, imobilizacao, 
        curativos, equip_diagnostico, ferramentas_hidraulicas, iluminacao, 
        equip_superficie, mergulho, sistema_cordas, seguranca
      ) VALUES ($1, null, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (id_ocorrencia) DO UPDATE SET
        detalhamento_tecnico = EXCLUDED.detalhamento_tecnico,
        agentes_extintores = EXCLUDED.agentes_extintores,
        estabelecimento_mangueira = EXCLUDED.estabelecimento_mangueira,
        equip_protecao = EXCLUDED.equip_protecao,
        ferramentas_arrombamento = EXCLUDED.ferramentas_arrombamento,
        suporte_basico = EXCLUDED.suporte_basico,
        imobilizacao = EXCLUDED.imobilizacao,
        curativos = EXCLUDED.curativos,
        equip_diagnostico = EXCLUDED.equip_diagnostico,
        ferramentas_hidraulicas = EXCLUDED.ferramentas_hidraulicas,
        iluminacao = EXCLUDED.iluminacao,
        equip_superficie = EXCLUDED.equip_superficie,
        mergulho = EXCLUDED.mergulho,
        sistema_cordas = EXCLUDED.sistema_cordas,
        seguranca = EXCLUDED.seguranca
      RETURNING *;
    `;

    const valores = [
      id, detalhamentoTecnico, agenteExtintor, mangueiras, protecaoRespiratoria,
      arrombamento, suporteBasicoVida, transporte, curativosEConsumiveis,
      diagnostico, ferramentasHidraulicas, iluminacaoEnergia, superficie,
      mergulho, cordas, seguranca
    ];

    const resultado = await pool.query(queryText, valores);

    return res.status(200).json({ 
      mensagem: 'Evidências salvas!', 
      evidencias: resultado.rows[0] 
    });

  } catch (error) {
    console.error('Erro ao salvar evidências:', error);
    return res.status(500).json({ mensagem: 'Erro interno ao salvar evidências.' });
  }
};

// 3. Etapa de Conclusão (Insere a assinatura e finaliza)
export const salvarConclusao = async (req, res) => {
  const { id, assinatura } = req.body; // assinatura deve ser uma string longa contendo o Base64 da rubrica

  try {
    const verificarOcorrencia = await pool.query('SELECT id_ocorrencia FROM ocorrencias WHERE id_ocorrencia = $1', [id]);
    
    if (verificarOcorrencia.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Ocorrência não encontrada!' });
    }

    // Salva a assinatura na tabela vinculada
    const queryText = `
      INSERT INTO assinaturas (id_ocorrencia, rubrica) 
      VALUES ($1, $2)
      ON CONFLICT (id_ocorrencia) DO UPDATE SET rubrica = EXCLUDED.rubrica;
    `;
    await pool.query(queryText, [id, assinatura]);

    console.log(`Ocorrência ID ${id} finalizada com assinatura salva.`);
    
    return res.status(200).json({ 
      mensagem: 'Ocorrência concluída com sucesso!', 
      id: id 
    });

  } catch (error) {
    console.error('Erro ao salvar conclusão:', error);
    return res.status(500).json({ mensagem: 'Erro interno ao finalizar ocorrência.' });
  }
};

// 4. Listagem Geral (Busca todas unificando com INNER JOINs para o Dashboard)
export const listarOcorrencias = async (req, res) => {
  try {
    // Faz uma busca trazendo a ocorrência e acoplando as evidências e assinaturas se existirem (LEFT JOIN)
    const queryText = `
      SELECT 
        o.id_ocorrencia AS id,
        LPAD(o.id_ocorrencia::text, 3, '0') AS protocolo,
        json_build_object(
          'tipo', o.tipo_ocorrencia,
          'gravidade', o.nivel_gravidade,
          'quantidadeVitimas', o.qtd_vitimas,
          'riscos', o.riscos_adicionais,
          'gps', o.localizacao
        ) AS triagem,
        json_build_object(
          'detalhamentoTecnico', e.detalhamento_tecnico,
          'agenteExtintor', e.agentes_extintores,
          'mangueiras', e.estabelecimento_mangueira
        ) AS evidencias,
        a.rubrica AS assinatura,
        CASE WHEN a.id_ocorrencia IS NOT NULL THEN 'finalizado' ELSE 'em_andamento' END AS status
      FROM ocorrencias o
      LEFT JOIN evidencias e ON o.id_ocorrencia = e.id_ocorrencia
      LEFT JOIN assinaturas a ON o.id_ocorrencia = a.id_ocorrencia
      ORDER BY o.id_ocorrencia DESC;
    `;

    const resultado = await pool.query(queryText);
    return res.status(200).json(resultado.rows);

  } catch (error) {
    console.error('Erro ao listar ocorrências:', error);
    return res.status(500).json({ mensagem: 'Erro ao buscar dados do painel.' });
  }
};

// 5. ROTA ADICIONAL: Sincronização Unificada para o Modo OFFLINE do Ionic
export const sincronizarOcorrenciaCompleta = async (req, res) => {
  const { ocorrencia, evidencias, assinatura } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Grava a Ocorrência offline
    const resOco = await client.query(`
      INSERT INTO ocorrencias (tipo_ocorrencia, nivel_gravidade, qtd_vitimas, riscos_adicionais, localizacao, usuario_matricula)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_ocorrencia;
    `, [
      ocorrencia.tipo,
      ocorrencia.gravidade,
      ocorrencia.temVitimas === 'sim' ? ocorrencia.quantidadeVitimas : 0,
      `Status: ${ocorrencia.statusLocal || ''} | Riscos: ${ocorrencia.riscos || ''}`,
      ocorrencia.gps,
      ocorrencia.usuario_matricula || null
    ]);

    const idGerado = resOco.rows[0].id_ocorrencia;

    // 2. Grava as Evidências vinculando ao ID gerado
    await client.query(`
      INSERT INTO evidencias (
        id_ocorrencia, detalhamento_tecnico, agentes_extintores, estabelecimento_mangueira, 
        equip_protecao, ferramentas_arrombamento, suporte_basico, imobilizacao, 
        curativos, equip_diagnostico, ferramentas_hidraulicas, iluminacao, 
        equip_superficie, mergulho, sistema_cordas, seguranca
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
    `, [
      idGerado, evidencias.detalhamentoTecnico, evidencias.agenteExtintor, evidencias.mangueiras,
      evidencias.protecaoRespiratoria, evidencias.arrombamento, evidencias.suporteBasicoVida, evidencias.transporte,
      evidencias.curativosEConsumiveis, evidencias.diagnostico, evidencias.ferramentasHidraulicas, evidencias.iluminacaoEnergia,
      evidencias.superficie, evidencias.mergulho, evidencias.cordas, evidencias.seguranca
    ]);

    // 3. Grava a Assinatura vinculando ao ID gerado
    await client.query(`
      INSERT INTO assinaturas (id_ocorrencia, rubrica) VALUES ($1, $2);
    `, [idGerado, assinatura]);

    await client.query('COMMIT');
    
    return res.status(201).json({ 
      sucesso: true, 
      id: idGerado, 
      protocolo: idGerado.toString().padStart(3, '0') 
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erro no sincronismo em lote:', error);
    return res.status(500).json({ erro: 'Falha crítica ao descarregar dados offline.' });
  } finally {
    client.release();
  }
};