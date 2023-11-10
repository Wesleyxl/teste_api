# Rabecão API

<!--Descrição do projeto-->
Api utilizada para conexão entre o App do Rabecão com a base de dados do sistemas, toda a aplicação está sendo escrita em Typescript, seguindo todas os padrões moderno, fazendo com o sistema se torne um sistema escalável, simples e completo.

## Pré-requisitos

- [Node.js > 20.0](https://nodejs.org)  e npm (recomendado: usar nvm )

## Dependências principais

- [bcryptjs](https://www.npmjs.com/package/bcryptjs) No node.js, a interface randomBytes do módulo criptográfico embutido é usada para obter números aleatórios seguros..
- [cors](https://www.npmjs.com/package/cors) CORS é um pacote node.js para fornecer um middleware Connect / Express que pode ser usado para habilitar o CORS com várias opções.
- [express](https://expressjs.com/pt-br/guide/routing.html) Express.js é um framework para Node.js que fornece recursos mínimos para construção de servidores web
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) O JSON Web Token é um padrão da Internet para a criação de dados com assinatura opcional e/ou criptografia cujo payload contém o JSON que afirma algum número de declarações.
- [eslint](https://eslint.org/) Ferramenta para padronização de códigos
- [multer](https://www.npmjs.com/package/multer) Multer é um middleware node.js para manipulação multipart/form-data, usado principalmente para upload de arquivos. Está escrito em cima do ajudante de garçom para máxima eficiência.
- [sequelize](https://sequelize.org/docs/v6/getting-started/) Sequelize é um ORM moderno de TypeScript e Node.js para Oracle, Postgres, MySQL, MariaDB, SQLite e SQL Server e muito mais.
- [nodemailer](https://nodemailer.com/) - Nodemailer é um módulo para aplicativos Node.js que permite o envio de e-mail com facilidade. O projeto começou em 2010, quando não havia uma opção sensata para enviar mensagens de e-mail. Hoje é a solução que a maioria dos usuários do Node.js recorre por padrão.

## Modo de usar

- `npn run dev` -- Executa a plataforma de desenvolvimento.
- `npx run build` -- Build o projeto convertendo em jasvascript (Modo Produção).
- `npx run test` -- Executa os teste jest na aplicação.

## Estrutura de Pastas

Este modelo segue uma estrutura de projeto muito simples:

- `src`: Esta pasta é o contêiner principal de todo o código da sua aplicação.
  - `app`: Pasta principal onde fica as regras de negócio.
    - `controller`: Pasta onde fica todos os controllers da aplicação.
      - `AuthController.ts`: Controller responsável por gerir todo o fluxo de autenticação.
    - `middleware`: Pasta onde ficam todos os middlewares da aplicação.
      - `Auth.ts`: Middleware responsável pela autenticação utilizando token jwt.
    - `model`: Pasta Models ficam as classes referentes ao seu modelo de classes.
      - `Funcionario.ts`: Arquivo model representa a camada Model, que está vinculado a tabela Funcionario no banco de dados.
    - `services`: Pasta Services utilizado para códigos de serviços, como envio de emails, SMS e outros serviços.
      - `SendEmail`: arquivo utilizado para envio de e-mails.
    - `utils`: Para utilizado para códigos utilitários para auxílios na aplicação
      - `gerarSenha.ts`: Arquivo utilizado para gerar palavra aleatórias para senhas provisórias
    - `config`: Pasta onde ficam todos os arquivos de configuração da aplicação.
      - `app.ts`: Arquivo de configuração da aplicação.
      - `database.ts`: Arquivo de configuração do banco de dados.
      - `email.ts`: Arquivo de configuração do e-mail.
      - `jwt.ts`: Arquivo de configuração do token JWT.
      - `multer.ts`: Arquivo de configuração do Multer.
      - `sequelize.json`: Arquivo de configuração do sequelize.
  - `database`: Pasta onde ficam todos as configuração da conexão com o banco de dados.
    - `migrations`: Não utilizado nessa aplicação.
    - `index.ts`: Arquivo utilizado para conectar os Models a base de dados.
  - `routes`: Pasta onde ficam todas as rotas da aplicação.
    - `routes`: Arquivo de rotas da aplicação.
  - `App.ts`: Classe principal onde agrupa todas as configuração da aplicação.
  - `index.ts`: Ponto de entrada do seu aplicativo de acordo com os padrões Rest-API Node.
