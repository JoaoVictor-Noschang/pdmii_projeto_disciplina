import * as SQLite from 'expo-sqlite';

// Variável para armazenar a instância do banco de dados
let _db = null;

export const getDb = () => {
    if (!_db) {
        throw new Error('Database não inicializado. Call initDb() first.');
    }
    return _db;
};

export const initDb = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('pluslife');
        _db = db;

        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                pass TEXT NOT NULL,
                dateNasc TEXT NOT NULL,
                status INTEGER NOT NULL DEFAULT 0
            );
            CREATE TABLE IF NOT EXISTS refeicoes (
                id INTEGER PRIMARY KEY NOT NULL,
                titulo TEXT NOT NULL,
                diaHora TEXT NOT NULL,
                peso REAL NOT NULL,
                caloria INTEGER NOT NULL,
                idUser INTEGER NOT NULL,
                    FOREIGN KEY (idUser) 
                    REFERENCES user (id) 
                        ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS hidratacoes (
                id INTEGER PRIMARY KEY NOT NULL,
                quantidade REAL NOT NULL,
                diaHora TEXT NOT NULL,
                idUser INTEGER NOT NULL,
                    FOREIGN KEY (idUser) 
                    REFERENCES user (id) 
                        ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS exercicios (
                id INTEGER PRIMARY KEY NOT NULL,
                titulo TEXT NOT NULL,
                tempoMin REAL NOT NULL,
                diaHora TEXT NOT NULL,
                idUser INTEGER NOT NULL,
                    FOREIGN KEY (idUser) 
                    REFERENCES user (id) 
                        ON DELETE CASCADE
            );
        `);

        console.log('Database inicializado e as tabelas foram criadas com sucesso!');
        return db;
    } catch (error) {
        console.error('Falha ao iniciar o Database: ', error);
        throw error;
    }
};


// Funções de inserção e regate de usuários -------------------------------------------------------------

// Função para inserir o usuário
export const insertUser = async (name, email, pass, dateNasc, status = false) => {
    const db = getDb();
    try {
        const statusValue = status ? 1 : 0;
        await db.runAsync(
            'INSERT INTO user (name, email, pass, dateNasc, status) VALUES (?, ?, ?, ?, ?);',
            [name, email, pass, dateNasc, statusValue]
        );
        console.log('Usuário inserido com sucesso!');

    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        throw error;

    }
};

// Função para resgatar todos os usuários
export const getUsers = async () => {
    const db = getDb();
    try {
        const allRows = await db.getAllAsync('SELECT * FROM user;');
        // Converter o status de volta para booleano ao recuperar é uma boa prática
        return allRows.map(user => ({
            ...user,
            status: user.status === 1 // Converte 1 para true, qualquer outro (0) para false
        }));

    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        throw error;

    }
};

// Função para alterar o status (logado ou não) do usuário
export const updateUserStatus = async (userId, newStatus) => {
    const db = getDb();
    try {
        const statusValue = newStatus ? 1 : 0;
        await db.runAsync(
            'UPDATE user SET status = ? WHERE id = ?;',
            [statusValue, userId]
        );
        console.log(`Status do usuário ${userId} atualizado para ${newStatus}.`);

    } catch (error) {
        console.error('Erro ao atualizar status do usuário:', error);
        throw error;

    }
};

// Função para resgatar o usuário logado
export const getUsuarioLogado = async () => {
    const db = getDb();
    try {
        // Seleciona o primeiro usuário onde status é 1 (true)
        const user = await db.getFirstAsync('SELECT * FROM user WHERE status = 1 LIMIT 1;');
        if (user) {
            // Converte o status de volta para booleano ao recuperar
            return {
                ...user,
                status: user.status === 1
            };
        }
        return null; // Retorna null se nenhum usuário logado for encontrado

    } catch (error) {
        console.error('Erro ao obter usuário logado:', error);
        throw error;

    }
};

// Para deslogar totos os usuários ao fazer o login com um novo usuário
export const logoutAllUsers = async () => {
    const db = getDb();
    try {
        await db.runAsync('UPDATE user SET status = 0;'); // Define todos os status para 0 (false)
        console.log('Todos os usuários foram deslogados (status = 0).');

    } catch (error) {
        console.error('Erro ao deslogar todos os usuários:', error);
        throw error;

    }
};

// Função para fazer login a partir de dados registrados
export const loginUsuarioRegistrado = async (email, password) => {
    const db = getDb();
    try {
        // Busca um usuário que corresponda ao email e senha
        const user = await db.getFirstAsync(
            'SELECT * FROM user WHERE email = ? AND pass = ? LIMIT 1;',
            [email, password]
        );
        if (user) {
            // Converte o status de volta para booleano
            return {
                ...user,
                status: user.status === 1
            };
        }
        return null;

    } catch (error) {
        console.error('Erro ao buscar usuário por credenciais:', error);
        throw error;

    }
};
// ------------------------------------------------------------------------------------------------------------


// Funções de CRUD de refeições --------------------------------------------------------------------

// Função para cadastrar uma nova refeição
export const addNewRefeicao = async (titulo, diaHora, peso, caloria, userId) => {
    const db = getDb();
    try {
        await db.runAsync(
            'INSERT INTO refeicoes (titulo, diaHora, peso, caloria, idUser) VALUES (?, ?, ?, ?, ?);',
            [titulo, diaHora, peso, caloria, userId]
        );
        console.log('Refeição inserida com sucesso!');

    } catch (error) {
        console.error('Erro ao inserir uma nova refeição:', error);
        throw error;

    }
}

// Função para resgatar os registros de refeições
export const getRefeicoesByUserId = async (userId) => {
    const db = getDb();
    try {
        const results = await db.getAllAsync(
            'SELECT * FROM refeicoes WHERE idUser = ? ORDER BY diaHora DESC;',
            [userId]
        );
        console.log(`Refeições encontradas para o usuário ${userId}:`, results);
        return results;

    } catch (error) {
        console.error('Erro ao buscar refeições por ID de usuário:', error);
        throw error;

    }
};

// Função para deletar uma refeição específica
export const deleteRefeicao = async (refeicaoId) => {
    const db = getDb();
    try {
        await db.runAsync('DELETE FROM refeicoes WHERE id = ?;', [refeicaoId]);
        console.log(`Refeição com ID ${refeicaoId} deletada com sucesso!`);

    } catch (error) {
        console.error(`Erro ao deletar a refeição com ID ${refeicaoId}:`, error);
        throw error;

    }
};
// ------------------------------------------------------------------------------------------------------------


// Funções de CRUD de hidratações --------------------------------------------------------------------

// Função para cadastrar uma nova hidratação
export const addNewHidro = async (quantidade, diaHora, userId) => {
    const db = getDb();
    try {
        await db.runAsync(
            'INSERT INTO hidratacoes (quantidade, diaHora, idUser) VALUES (?, ?, ?);',
            [quantidade, diaHora, userId]
        );
        console.log('Hidratação inserida com sucesso!');

    } catch (error) {
        console.error('Erro ao inserir uma nova hidratação:', error);
        throw error;

    }
}

// Função para resgatar os registro de hidratação
export const getHidroByUserId = async (userId) => {
    const db = getDb();
    try {
        const results = await db.getAllAsync(
            'SELECT * FROM hidratacoes WHERE idUser = ? ORDER BY diaHora DESC;',
            [userId]
        );
        console.log(`Hidratações encontradas para o usuário ${userId}:`, results);
        return results;

    } catch (error) {
        console.error('Erro ao buscar idratações por ID de usuário:', error);
        throw error;

    }
};

// Função para deletar uma hidratação específica
export const deleteHidro = async (hidroId) => {
    const db = getDb();
    try {
        await db.runAsync('DELETE FROM hidratacoes WHERE id = ?;', [hidroId]);
        console.log(`Hidratação com ID ${hidroId} deletada com sucesso!`);

    } catch (error) {
        console.error(`Erro ao deletar a hidratação com ID ${hidroId}:`, error);
        throw error;

    }
};
// ------------------------------------------------------------------------------------------------------------


// Funções de CRUD de exercicios --------------------------------------------------------------------

// Função para cadastrar um novo evxercicio
export const addNewExerc = async (titulo, duracao, diaHora, userId) => {
    const db = getDb();
    try {
        await db.runAsync(
            'INSERT INTO exercicios (titulo, tempoMin, diaHora, idUser) VALUES (?, ?, ?, ?);',
            [titulo, duracao, diaHora, userId]
        );
        console.log('Exercícios inserido com sucesso!');

    } catch (error) {
        console.error('Erro ao inserir um novo exercício:', error);
        throw error;

    }
}

// Função para resgatar os registro de hidratação
export const getExercByUserId = async (userId) => {
    const db = getDb();
    try {
        const results = await db.getAllAsync(
            'SELECT * FROM exercicios WHERE idUser = ? ORDER BY diaHora DESC;',
            [userId]
        );
        console.log(`Exercícios encontradas para o usuário ${userId}:`, results);
        return results;

    } catch (error) {
        console.error('Erro ao buscar exercícios por ID de usuário:', error);
        throw error;

    }
};

// Função para deletar uma hidratação específica
export const deleteExerc = async (exercId) => {
    const db = getDb();
    try {
        await db.runAsync('DELETE FROM exercicios WHERE id = ?;', [exercId]);
        console.log(`Exercício com ID ${exercId} deletado com sucesso!`);

    } catch (error) {
        console.error(`Erro ao deletar a exercício com ID ${exercId}:`, error);
        throw error;

    }
};
// ------------------------------------------------------------------------------------------------------------


// Funções de rergate de dados para o Dashboiard --------------------------------------------------------------

// Função para regatar o consumo de calorias
export const getCaloriasDoDia = async (userId, hoje) => {
    const db = getDb();
    try {
        const result = await db.getFirstAsync(
            'SELECT SUM(caloria) AS totalCalorias FROM refeicoes WHERE idUser = ? AND diaHora LIKE ? || "%";',
            [userId, hoje]
        );

        // O valor será null se não houver registros, então retornamos 0 nesse caso
        const totalCalorias = (result?.totalCalorias ?? 0);

        console.log(`Total de calorias no dia ${hoje} para o user ${userId}:`, totalCalorias);
        return totalCalorias;

    } catch (error) {
        console.error('Erro ao regatar e somar calorias:', error);
        throw error;

    }
};

// Para resgatar e somar a quantidade de agua consumida no dia 
export const getHidroDoDia = async (userId, hoje) => {
    const db = getDb();
    try {
        const result = await db.getFirstAsync(
            'SELECT SUM(quantidade) AS totalQuantidade FROM hidratacoes WHERE idUser = ? AND diaHora LIKE ? || "%";',
            [userId, hoje]
        );
        
        const totalQuantidade = (result?.totalQuantidade ?? 0);

        console.log(`Total de água consumida no dia ${hoje} para o user ${userId}:`, totalQuantidade);
        return totalQuantidade;

    } catch (error) {
        console.error('Erro ao regatar e somar hidratação:', error);
        throw error;

    }
};

// Para regatar e somar o tempo de exercícios realizados no dia
export const getTempoExercDoDia = async (userId, hoje) => {
    const db = getDb();
    try {
        const result = await db.getFirstAsync(
            'SELECT SUM(tempoMin) AS totalTempoMin FROM exercicios WHERE idUser = ? AND diaHora LIKE ? || "%";',
            [userId, hoje]
        );

        const totalTempoMin = (result?.totalTempoMin ?? 0);

        console.log(`Tempo total de exercício no dia ${hoje} para o user ${userId}:`, totalTempoMin);
        return totalTempoMin;

    } catch (error) {
        console.error('Erro ao resgatar e somar tempo de exercícios:', error); // Corrigido 'regatar'
        throw error;
    }
};