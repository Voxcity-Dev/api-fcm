const Mailer = require('../Mailer/ChatMailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const axios = require('axios');

/// _______________________________________________________________________________________________________________________________
                        ///-----------------------------------------*MÉTODOS AUXILIARES*-----------------------------------

class Helper {
    constructor(){
    }

    //gera um hash aleatório
    createHash() {
        let hash = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for(let i = 0; i < 12; i++) {
            hash += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return hash;
    }
    // Função para verificar se o e-mail está em um formato válido
    async isEmailValid(email) {
        return validator.isEmail(email);
    }
    // Converte um timestamp para uma data legível
    convertTimestamp(timestamp) {
        return new Date(timestamp * 1000); 
    }
   

    
   
    // -----------------------------------------------------------------------------------------------------------------------------
}

module.exports = Helper;