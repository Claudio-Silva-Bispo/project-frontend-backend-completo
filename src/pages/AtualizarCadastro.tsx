import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; 

const AtualizarCadastro: React.FC = () => {
  const { user } = useAuth();
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setSenha(user.senha);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usuarioDados = {
      id: user.id,
      nome,
      email,
      senha,
    };

    console.log('Dados enviados para atualização:', usuarioDados);

    try {
      const response = await fetch(`http://localhost:3001/api/User/${user.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioDados),
      });

      if (response.ok) {
        console.log('Dados atualizados com sucesso');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000); // Oculta a mensagem após 3 segundos
      } else {
        console.error('Erro ao atualizar dados', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar dados', error);
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
            Dados atualizados com sucesso!
          </div>
        )}
        <fieldset className="flex gap-6 p-6 rounded-md shadow-sm h-[100vh]">
          <section className="flex flex-col p-6 justify-center items-center gap-10 mt-10">
            <div className='text-start font-bold text-4xl'>
              <h1>Atualização de Cadastro</h1>
            </div>

            <div className="col-span-full sm:col-span-3 w-full">
              <label htmlFor="firstname" className="text-xl">Nome Completo</label>
              <input
                id="firstname"
                type="text"
                placeholder="Seu nome"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 p-2 mt-3 text-gray-900"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </div>

            <div className="col-span-full sm:col-span-3 w-full">
              <label htmlFor="email" className="text-xl">Email</label>
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
              <label htmlFor="senha" className="text-xl">Senha</label>
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
                Atualizar
              </button>
            </div>
          </section>
        </fieldset>
      </form>
    </section>
  );
};

export default AtualizarCadastro;
