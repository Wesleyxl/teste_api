import nodemailer from "nodemailer";

export async function enviarEmailRecuperaSenha(
  cpf: string,
  matricula: string,
  nome: string,
  senha: string
): Promise<any> {
  // Configuração do transporte com servidor Ethereal
  const transporter = nodemailer.createTransport({
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

  return nodemailer.getTestMessageUrl(info);
}
