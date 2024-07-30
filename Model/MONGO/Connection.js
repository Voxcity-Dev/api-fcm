const uri = process.env.DB_URL;
const { MongoClient } = require('mongodb');

// _______________________________________________________________________________________________________________________________________________________

async function espera(s) {
    return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

class ConnectionDB {
    constructor() {
        new MongoClient(uri).connect().then(client => {
            this.client = client;
            console.log('Conexão estabelecida com o MongoDB');
        });
    }

    async connection(db = "users", collection = "prefeituras") {
        while (!this.client) await espera(0.1);
        return new Promise((resolve, reject) => {
            this.db = this.client.db(db);
            this.collection = this.db.collection(collection);
            resolve(this.collection, this.db);
        });
    }    

}
// _______________________________________________________________________________________________________________________________________________________
module.exports = ConnectionDB;