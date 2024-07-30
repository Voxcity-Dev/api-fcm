const md5 = require('md5');
const nodemailer = require("nodemailer");

const dns = "http://localhost:3000/"
// ------------------------------------------------------------------------------------------------------------------------------
class ChatMailer {
    constructor(email) {
        this.email = email;
    }

    /// ---------------------------------------------------------------------------------------------------------------------

    async createHash() {
        try {
            const hash = md5(this.email + Math.random() * 99999);
            this.hash = hash;
            return this.hash;
        } catch (error) {
            console.log("Erro ao criar a hash", error);
        }
    }
    
    async sendEmail(message) {
        try {
            let transporter = nodemailer.createTransport({
                //host: "smtp.kinghost.net", //Para testar localhost use este
                host: 'smtpi.kinghost.net', //Para usar em produção
                port: 465,
                service: 'kinghost',
                pool: true, //Para prdoução
                secure: true, // true para porta 465, false para outras portas
                auth: {
                    user: 'noreply@voxcity.com.br', // Usuário de autenticação para o serviço de e-mail
                    pass: process.env.EMAIL_PASS, // Senha de autenticação para o serviço de e-mail            
                },
                tls: {rejectUnauthorized: false}
            });
            // Enviar e-mail com o objeto de transporte definido
            let info = await transporter.sendMail({               
                from: '"noreply" <noreply@voxcity.com.br>', // Endereço do remetente
                // replyTo: 'noreply.journeybuilder@gmail.com'
                to: this.email, // (INCLUIR E-MAIL DE QUEM VAI RECEBER O E-MAIL) list of receivers
                subject: "Voxcity", // Assunto do e-mail
                text: "Olá", // Corpo do e-mail em texto simples
                html: message, // Corpo do e-mail em formato HTML
            });
            console.log("Mensagem enviada: %s", info.messageId);
            return {message: 'Email enviado', error: null};
        } catch (error) {
            console.log("Erro no envio da mensagem", error);
        }
    }
    
    async forgetPassEmail(hash) {
        try {
            let message = "Olá,\n" +
                "Você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha para sua conta." +
                `<br><a href='${dns}changeforgot/` + hash + "'>Clique aqui</a><br>" +
                "Esse link é válido somente por 30 minutos.<br><br>" +
                "Se você não solicitou uma redefinição de senha, nenhuma ação adicional será necessária.";
            
            await this.sendEmail(message);
            return true;    
        } catch (error) {
            console.log("Erro interno", error);
        }
    }

    async confirmEmail(userName, hash) {
        try {
            let message = `Olá ${userName},
            é uma alegria termos você aqui, sua conta foi criada com sucesso.
            Clique no link abaixo  para confirmar o seu email e ter acesso a aplição:
            OBS: Sem a confirmação de email você não terá acesso a aplicação.
            <br>    
            Link:  <a href='${dns}emailConfirm/${hash}'>Clique aqui https://localhost</a><br>
            <br>
            <br>
            <br>
            Consulte também nossa base de conhecimento e saiba mais sobre as funcionalidades da aplicação em: <a href='https://voxcity.tomticket.com/kb/chat-corporativo'>https://voxcity.tomticket.com/kb/chat-corporativo</a>
            <br>        
            Att
            <br>        
            Time de Desenvolvimento
            Voxcity Tecnologia
            (48) 3478-2300`;
    
            await this.sendEmail(message);
        } catch (error) {
            console.log("Erro interno", error);
        }
    }

    async confirmEmailAndCreatePass(userName, hash) {
        try {
            let message = `Olá ${userName},
            é uma alegria termos você aqui, sua conta foi criada com sucesso.
            Clique no link abaixo  para confirmar o seu email e criar a sua senha de acesso a aplicação:
            <br>    
            Link:  <a href='${dns}createpass/${hash}'>Clique aqui https://localhost</a><br>
            <br>
            <br>
            <br>
            Consulte também nossa base de conhecimento e saiba mais sobre as funcionalidades da aplicação em: <a href='https://voxcity.tomticket.com/kb/chat-corporativo'>https://voxcity.tomticket.com/kb/chat-corporativo</a>
            <br>        
            Att
            <br>        
            Time de Desenvolvimento
            Voxcity Tecnologia
            (48) 3478-2300`;
    
            await this.sendEmail(message);
        } catch (error) {
            console.log("Erro interno", error);
        }
    }
    

    /// -------------------------------------------------------------------------------------------------------------------------
    
}

module.exports = ChatMailer