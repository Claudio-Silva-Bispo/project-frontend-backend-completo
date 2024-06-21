
# Coletar dados dos endpoints
Para coletar dados do banco e armazenar nas minhas tabelas:

npm install axios

# Conexão com a API do Google

Instalar:

npm install next-auth

1. npm install next-auth @types/next-auth google-auth-library

2. Atualize o componente de login para usar signIn do next-auth:
// Fazer Login pelo Goole
import { signIn } from "next-auth/react";

3. Criar a função para chamar no botão:
const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/PaginaLogada' });
  };

4. Precisa colocar nas credenciais a rota de teste: http://localhost:3000. Isso aqui na página do Google.

5. Precisa inserir as rotas de direcionamento: http://localhost:3000/api/auth/callback/google

6. Criar o arquivo .env.local e deixar tanto o ID quanto a chave secreta nele.

7. Criar a pasta api > auth > arquivo [...nextauth].js Nele conterá as rotas das demais apis.

# Processo para o GitHub

1. https://github.com/settings/developers

2. Registrar nova aplicação

Preencha as informações do aplicativo:

Application name: Nome do seu aplicativo.
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
Após criar o aplicativo, você verá o Client ID e Client Secret. Guarde esses valores para configurar no seu projeto.

3. Preencher os dados no arquivo .env.local
GITHUB_CLIENT_ID=your-github-client-id as string
GITHUB_CLIENT_SECRET=your-github-client-secret as string
NEXTAUTH_URL=http://localhost:3000

4. ajustar o arquivo nextauth

import GithubProvider from "next-auth/providers/github";

GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

5. importar os dados na página de Login

const handleGithubLogin = () => {
    signIn('github', { callbackUrl: '/PaginaLogada' });
  };

# Linkedin

1. https://developer.linkedin.com/ para criar as credenciais

2. no link https://www.linkedin.com/developers/apps/220393553/auth vai mostrar as credenciais.

2.1. Não esquecer de colocar a rota de direcionamento http://localhost:3000/api/auth/callback/linkedin

3. Salvar no .env.local
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
NEXTAUTH_URL=http://localhost:3000

4. No nextauth, importar e inserir o comando
 import LinkedInProvider from "next-auth/providers/linkedin";

 LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),

5. Atualizar o componente de Login

const handleLinkedInLogin = () => {
    signIn('linkedin', { callbackUrl: '/PaginaLogada' });
  };

6. Atualizar o botao onClick={handleLinkedInLogin}


