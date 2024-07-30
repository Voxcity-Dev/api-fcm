const jwt = require("jsonwebtoken");
// ------------------------------------------------------------------------------------------------------------
const HelperApp = {
  

    authenticateToken: async (req, res, next) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if (!token) {
                return res.send({ error: "Acesso não autorizado" });
            }
            try {
                const decoded = jwt.verify(token, process.env.SECRETE);
                const { id, organizacao, email } = decoded;
                req.user = {
                    id,
                    org : organizacao,
                    email,
                };
                next();
            } catch (error) {
                return res.send({ error: "Token inválido ou acesso não autorizado" });
            }
        } catch (error) {
            console.error("Erro durante autenticação:", error);
        }
    },



    // ///-----------------------------------------------------------------------------------------------------------------------
};
module.exports = HelperApp;


     