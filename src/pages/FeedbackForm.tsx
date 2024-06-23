import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const FeedbackForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (rating === 0 || message === '') {
      alert('Por favor, forneça uma avaliação e uma mensagem.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/Feedback', {
        dataHora: new Date().toISOString(),
        nome: nome,
        email: email,
        telefone: telefone,
        nota: rating,
        descricao: message
      });
      if (response.status === 201) {
        alert('Feedback enviado com sucesso!');
        // Limpar o formulário
        setMessage('');
        setRating(0);
        setEmail('');
        setNome('');
        setTelefone('');
      }
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      alert('Erro ao enviar feedback. Tente novamente.');
    }
  };

  return (

    <main className='bg-white p-6'>

      <div className='flex justify-between p-6 bg-gray-800'>

        <section className="flex flex-col p-5 text-white">
              
              <div className="flex flex-col items-center w-full p-5">
                
                <h2 className="text-3xl font-semibold text-center">sua opinião é importante!</h2>

                <div className="flex flex-col items-center py-6 space-y-3">
                  
                  <span className="text-center">como foi sua experiência?</span>
                  
                  <div className="flex space-x-7">
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        title={`Rate ${rate} stars`}
                        aria-label={`Rate ${rate} stars`}
                        onClick={() => handleRating(rate)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`w-10 h-10 ${rating >= rate ? 'dark:text-yellow-400' : 'dark:text-gray-400'}`}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                    ))}
                  </div>

                </div>

                <div className="flex flex-col w-full gap-3 text-black">
                  
                  <textarea
                    rows={3}
                    placeholder="Mensagem..."
                    className="p-4 rounded-md resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>

                  <input
                    type="text"
                    placeholder="Nome"
                    className="p-4 rounded-md dark:text-gray-800 dark:bg-gray-50"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    className="p-4 rounded-md dark:text-gray-800 dark:bg-gray-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Telefone"
                    className="p-4 rounded-md"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                  <button
                    type="button"
                    className="py-4 my-8 font-semibold rounded-md bg-blue-700 text-white"
                    onClick={handleSubmit}
                  >
                    enviar feedback
                  </button>
                </div>
              </div>
             
        </section>

        <section>

  <div className="bg-blue-700">
    <div className="container flex flex-col items-center justify-center mx-auto text-center h-[90vh] p-10">
      <h1 className="text-5xl font-bold leading-none sm:text-5xl xl:max-w-3xl dark:text-gray-50">
        ainda não conhece nossos <br /> serviços e deseja saber com mais detalhes?
      </h1>
      <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">
        Se tiver um conta e quiser um atendimento personalizado, apenas faça o login e aproveite os beneficios.
      </p>
      <div className="flex flex-wrap justify-center">
        <button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-900">
          <Link href="/Cadastro">cadastre-se</Link>
        </button>
        <button type="button" className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-300 dark:text-gray-50">
          <Link href="/Login">faça login</Link>
        </button>
      </div>
    </div>
  </div>
  <img src="https://source.unsplash.com/random/480x320" alt="" className="w-5/6 mx-auto mb-12 -mt-20 dark:bg-gray-500 rounded-lg shadow-md lg:-mt-40" />
        </section>

      </div>

    </main>
    
  );
};

export default FeedbackForm;
