"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);

 async function enviarEmailRecuperaSenha(
  cpf,
  matricula,
  nome,
  senha
) {
  // Configuração do transporte com servidor Ethereal
  const transporter = _nodemailer2.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "camron.hartmann81@ethereal.email",
      pass: "wQmSnejyMxm8Aubcwg",
    },
  });

  // html para envio de email
  const htmlEmail = `
    <html>
      <body>
        <h3>Solicitação de recuperação de senha</h3>
        <p><strong>Nome: </strong> ${nome}</p>
        <p><strong>CPF: </strong> ${cpf}</p>
        <p><strong>N° Matrícula: </strong> ${matricula}</p>
        <p><strong>Senha Provisória: </strong> ${senha}</p>
      </body>
    </html>
  `;

  // Criar um email para enviar
  const info = await transporter.sendMail({
    from: "wesley Alves",
    to: " <info@ethereal.email>",
    subject: "Recuperação de senha",
    html: htmlEmail,
  });

  return _nodemailer2.default.getTestMessageUrl(info);
} exports.enviarEmailRecuperaSenha = enviarEmailRecuperaSenha;
