import pkg from 'pg';
const { Pool } = pkg;

// Configurações do seu banco PostgreSQL
const pool = new Pool({
    user: 'postgres',       
    host: '127.0.0.1',        
    database: 'gestao_ocorrencias',
    password: 'admin', 
    port: 5432,           
});

// Testar a conexão com o banco de dados
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Erro ao conectar ao PostgreSQL:', err.stack);
    } else {
        console.log('✅ Conectado ao PostgreSQL com sucesso!');
    }
});

export default pool;