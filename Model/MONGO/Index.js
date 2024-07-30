const { ObjectId } = require('mongodb');
const Helper = require('../Helper/Helper');


// -----------------------------------------------------------------------------------------------------------------------------------------------

//INSTÂNCIA PARA USAR O MÉTODOS AUXILIARES
const helper = new Helper();


///-----------------------------------------*ATENÇÃO*-----------------------------------
//O INDEX sempre vai estender a último repositório, a ordem dos extends está no 'ProviderDB', isto permite herdar 
//todos os métodos que possui em todos osrepositórios, exemplo aqui posso usar db.'algum método do RegisterDB';

const DB = require('./Connection');

///-----------------------------------------*ATENÇÃO*-----------------------------------


class IndexDB extends DB {
    constructor(){
        super();
    }


    async verifyChave(dbname, chave) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.connection(dbname, 'link_help');
                const convite = await db.findOne({ chave });
                if (convite.limitUsed >= +convite.limit) return resolve({ error: 'Limite de uso da chave excedido' });
                const newLimit = ++convite.limitUsed;
                await db.updateOne(
                    { chave },
                    { $set: { limitUsed: newLimit }}
                );
                resolve({ message: 'Chave válida' });
            } catch (error) {
                console.error('Erro ao verificar chave:', error.message);
                reject(error);
            }
        });
    }
    
    async findPrefById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.connection();
                const pref = await db.findOne({ _id : new ObjectId(id)});
                resolve(pref);
            } catch (error) {
                console.error('Erro ao buscar conta:', error.message);
                reject(error);
            }
        });
    }

    
// -----------------------------------------------------------------------------------------------------------------------------
    
}

module.exports = IndexDB;