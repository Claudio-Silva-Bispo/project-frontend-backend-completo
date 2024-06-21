import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [informacoesLogin, setInformacoesLogin] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      senha,
    });

    if (res && res.ok) {
      router.push('/PaginaLogada');
    } else {
      setInformacoesLogin('Erro ao realizar login');
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/PaginaLogada' });
  };

  const handleGithubLogin = () => {
    signIn('github', { callbackUrl: '/PaginaLogada' });
  };

  const handleLinkedInLogin = () => {
    signIn('linkedin', { callbackUrl: '/PaginaLogada' });
  };

  return (
    <main className="border flex flex-col justify-center items-center bg-gray-800 text-white">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8">
        <h2 className="mb-3 text-3xl font-semibold text-center">Login com uma conta parceira</h2>
        <p className="text-sm text-center ">
          não possui conta?
          <a href="/Cadastro" rel="noopener noreferrer" className="focus:underline hover:underline"> cadastre-se aqui</a>
        </p>
        <div className="my-6 space-y-4">
          <button 
            aria-label="Login with Google" 
            type="button" 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 hover:bg-violet-600 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current ">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login com Google</p>
          </button>
          
          <button 
            aria-label="Login with GitHub" 
            role="button" 
            onClick={handleGithubLogin}
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 hover:bg-violet-600 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
            </svg>
            <p>Login com GitHub</p>
          </button>

          <button 
            aria-label="Login with LinkedIn" 
            role="button" 
            onClick={handleLinkedInLogin}
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 hover:bg-violet-600 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M29 0h-26c-1.1 0-2 .9-2 2v28c0 1.1.9 2 2 2h26c1.1 0 2-.9 2-2v-28c0-1.1-.9-2-2-2zm-20 29h-4v-17h4v17zm-2-19.2c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm18.5 19.2h-4v-8.5c0-2-.8-3.3-2.7-3.3-1.5 0-2.3 1-2.7 2-0.1 0.3-0.1 0.7-0.1 1v8.8h-4s0.1-14.3 0-15.7h4v2.2c0.5-0.8 1.4-2 3.5-2 2.5 0 4.5 1.6 4.5 5v10.5z"></path>
            </svg>
            <p>Login com LinkedIn</p>
          </button>
        </div>

        <div className="flex items-center w-full my-4">
          <hr className="w-full" />
          <p className="px-3 ">OU</p>
          <hr className="w-full " />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">Seu email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="leroy@dominio.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-black" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">Senha</label>
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline ">Esqueceu sua senha?</a>
              </div>
              <input 
                type="password" 
                name="senha" 
                id="senha" 
                placeholder="******" 
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-black" />
            </div>
          </div>
          <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-white ">Acesse</button>
        </form>
      </div>
    </main>
  );
}
