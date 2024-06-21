import React, { useState } from 'react';
import Link from 'next/link';

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Quero printar os dados que serão enviados
    const usuarioDados = {
      nome,
      email,
      senha,
    };

    console.log('Dados enviados:', usuarioDados);

    try {
      const response = await fetch('http://localhost:3001/api/User', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioDados)
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso');
        setShowSuccessMessage(true);
        setNome('');
        setEmail('');
        setSenha('');
        setTimeout(() => setShowSuccessMessage(false), 3000); // Oculta a mensagem após 3 segundos
      } else {
        console.error('Erro ao enviar dados', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar dados', error);
    }
  };

  return (
    <section className="p-6">
      <form
        onSubmit={handleSubmit}
        className="container flex flex-col mx-auto space-y-12 min-h-[100vh] justify-center bg-gray-800 text-white"
      >
        {showSuccessMessage && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded">
            Dados enviados com sucesso!
          </div>
        )}
        <fieldset className="flex gap-6 p-6 rounded-md shadow-sm h-[100vh]">
          <section>
            <div className="dark:bg-violet-600">
              <div className="container flex flex-col items-center justify-center mx-auto text-center h-[90vh]">
                <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-50">
                  já conhece nossos <br /> serviços e possui uma conta?
                </h1>
                <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">
                  Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!
                </p>
                <div className="flex flex-wrap justify-center">
                  <button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-900">
                    <Link href="/Login">faça login</Link>
                  </button>
                  <button type="button" className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-300 dark:text-gray-50">
                    <Link href="/">retornar a página inicial</Link>
                  </button>
                </div>
              </div>
            </div>
            <img src="https://source.unsplash.com/random/480x320" alt="" className="w-5/6 mx-auto mb-12 -mt-20 dark:bg-gray-500 rounded-lg shadow-md lg:-mt-40" />
          </section>

          <section className="flex flex-col p-6 justify-center items-center gap-10 mt-10">
            <div className='text-start font-bold text-4xl'>
              <h1>formulário de cadastro</h1>
            </div>

            <div className="col-span-full sm:col-span-3 w-full">
              <label htmlFor="firstname" className="text-xl">nome completo</label>
              <input
                id="firstname"
                type="text"
                placeholder="seu nome"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 mt-3 text-gray-900"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </div>

            <div className="col-span-full sm:col-span-3 w-full">
              <label htmlFor="email" className="text-xl">email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 mt-3 text-gray-900"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="col-span-full sm:col-span-3 w-full">
              <label htmlFor="senha" className="text-xl">senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 mt-3 text-gray-900"
                value={senha}
                onChange={e => setSenha(e.target.value)}
              />
            </div>

            <div className='col-span-full sm:col-span-3 w-full'>
              <button type="submit" className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 mt-3 bg-white text-black">
                Enviar
              </button>
            </div>
          </section>
        </fieldset>
      </form>
    </section>
  );
};

export default Cadastro;
