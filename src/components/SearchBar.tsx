import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const commands = [
    {
      command: 'limpar',
      callback: () => setQuery(''),
    }
  ];

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleVoiceSearch = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchText = query || transcript;
    console.log('Texto para pesquisa:', searchText);
    onSearch(searchText);
    await sendSearchToBackend(searchText);
    resetTranscript();
    setQuery('');
  };

  const sendSearchToBackend = async (term: string) => {
    const searchPayload = {
      termo: term,
      userId: "string", // Substitua pelo ID do usuário atual
      dataHora: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:3001/api/Pesquisa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchPayload)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar a pesquisa');
      }

      const result = await response.json().catch(() => null); // Adiciona catch para lidar com respostas vazias ou não JSON
      if (result) {
        console.log('Pesquisa enviada com sucesso:', result);
      } else {
        console.log('Pesquisa enviada com sucesso, mas sem resposta JSON.');
      }
    } catch (error) {
      console.error('Erro ao enviar a pesquisa:', error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Seu navegador não é compatível com reconhecimento de voz.</span>;
  }

  return (
    <form className="flex items-center max-w-lg mx-auto" onSubmit={handleSubmit}>
      
      <label htmlFor="voice-search" className="sr-only">Pesquisar</label>
      
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
          </svg>
        </div>

        <input
          type="text"
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Pesquisar, Falar..."
          value={query || transcript}
          onChange={handleInputChange}
          required
        />

        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          onClick={handleVoiceSearch}
        >
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
          </svg>
        </button>
      </div>

      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-[] bg-white rounded-lg border border-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-white dark:hover:bg-[#0A9DDA] dark:focus:ring-blue-800 dark:text-[#042D60]"
      >
        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>Pesquisar
      </button>
    </form>
  );
};

export default SearchBar;
