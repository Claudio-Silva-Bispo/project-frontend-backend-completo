import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TestePesquisa: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [response, setResponse] = useState<string | null>(null);
  const router = useRouter();

  const commands = [
    { command: 'login', action: '/Login', type: 'redirect' },
    { command: 'cadastro', action: '/Cadastro', type: 'redirect' },
    { command: 'contato', action: '/Contact', type: 'redirect' },
    { command: 'feedback', action: '/FeedbackForm', type: 'redirect' },
    { command: 'ajuda', action: 'Aqui está a página de ajuda.', type: 'response' },
    // Adicione mais comandos conforme necessário
  ];

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/Pesquisa');
        if (!response.ok) {
          throw new Error('Erro ao buscar resultados de pesquisa');
        }
        const data = await response.json();
        setSearchResults(data.map((item: { termo: string }) => item.termo));
      } catch (error) {
        console.error('Erro ao buscar resultados de pesquisa:', error);
      }
    };

    fetchSearchResults();
  }, []);

  const handleSearch = (query: string) => {
    setSearchResults((prevResults) => [...prevResults, query]);
    const matchedCommand = commands.find((cmd) => query.toLowerCase().includes(cmd.command));

    if (matchedCommand) {
      if (matchedCommand.type === 'redirect') {
        router.push(matchedCommand.action);
      } else if (matchedCommand.type === 'response') {
        setResponse(matchedCommand.action);
      }
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center mt-20 bg-white text-black dark:bg-gray-800 dark:text-white">
      {response && (
        <div className="mt-4 text-center">
          <h2>Resposta:</h2>
          <p>{response}</p>
        </div>
      )}
      <div className="mt-4 text-center">
        <h2>Resultados da Pesquisa:</h2>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestePesquisa;
