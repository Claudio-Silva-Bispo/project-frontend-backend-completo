import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ConfiguracaoTela: React.FC = () => {
  const [backgroundClass, setBackgroundClass] = useState<string>('bg-white');
  const [textClass, setTextClass] = useState<string>('text-black');
  const [titleClass, setTitleClass] = useState<string>('text-black');
  const [paragraphClass, setParagraphClass] = useState<string>('text-black');
  const [message, setMessage] = useState<string>('');

  const handleBackgroundChange = (bgClass: string) => {
    setBackgroundClass(bgClass);
  };

  const handleTextChange = (textClass: string) => {
    setTextClass(textClass);
  };

  const handleTitleChange = (titleClass: string) => {
    setTitleClass(titleClass);
  };

  const handleParagraphChange = (paragraphClass: string) => {
    setParagraphClass(paragraphClass);
  };

  const handleSave = () => {
    localStorage.setItem('backgroundClass', backgroundClass);
    localStorage.setItem('textClass', textClass);
    localStorage.setItem('titleClass', titleClass);
    localStorage.setItem('paragraphClass', paragraphClass);
    setMessage('Configurações salvas com sucesso!');
    setTimeout(() => setMessage(''), 3000); // Remove a mensagem após 3 segundos
  };

  const handleReset = () => {
    setBackgroundClass('bg-white');
    setTextClass('text-black');
    setTitleClass('text-black');
    setParagraphClass('text-black');
    localStorage.removeItem('backgroundClass');
    localStorage.removeItem('textClass');
    localStorage.removeItem('titleClass');
    localStorage.removeItem('paragraphClass');
    setMessage('Configurações redefinidas para o padrão!');
    setTimeout(() => setMessage(''), 3000); // Remove a mensagem após 3 segundos
  };

  useEffect(() => {
    const savedBackgroundClass = localStorage.getItem('backgroundClass') || 'bg-white';
    const savedTextClass = localStorage.getItem('textClass') || 'text-black';
    const savedTitleClass = localStorage.getItem('titleClass') || 'text-black';
    const savedParagraphClass = localStorage.getItem('paragraphClass') || 'text-black';

    setBackgroundClass(savedBackgroundClass);
    setTextClass(savedTextClass);
    setTitleClass(savedTitleClass);
    setParagraphClass(savedParagraphClass);
  }, []);

  const backgroundColors = [
    'bg-white', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400',
    'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900',
    'bg-blue-400', 'bg-red-400', 'bg-yellow-400', 'bg-green-400'
  ];

  const textColors = [
    'text-black', 'text-gray-700', 'text-gray-500', 'text-gray-300', 'text-white',
    'text-red-400', 'text-blue-400', 'text-yellow-400', 'text-green-400'
  ];

  return (
    <div className={`min-h-screen p-10`}>

        <section>
            <div className="bg-blue-700">
                <div className="container flex flex-col items-center justify-center mx-auto text-center h-[90vh]">
                <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-50">
                🎨 personalize sua experiência!
                </h1>
                <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">
                configure as cores do fundo, títulos e textos <br />de acordo com seu estilo e torne seu painel único! 🌈 quando voltar em outro momento, elas serão únicas, do jeito que você definiu.
                </p>
                <div className="flex flex-wrap justify-center">
                    <button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-900">
                    <Link href="/Login">retornar para página do usuário</Link>
                    </button>
                    <button type="button" className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-300 dark:text-gray-50">
                    <Link href="/">retornar para página inicial</Link>
                    </button>
                </div>
                </div>
            </div>
            <img src="https://source.unsplash.com/random/480x320" alt="" className="w-5/6 mx-auto mb-12 -mt-20 dark:bg-gray-500 rounded-lg shadow-md lg:-mt-40" />
        </section>
      
        <div className="max-w-6xl mx-auto p-10 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-8 text-black">configurações de aparência</h1>

            {message && (
            <div className="mb-2 p-2 text-center bg-green-100 text-green-700 rounded">
                {message}
            </div>
            )}

            <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">selecione a cor de fundo:</h2>
            <div className="flex flex-wrap gap-4 mb-4">
                {backgroundColors.map(bgClass => (
                <button
                    key={bgClass}
                    className={`w-12 h-12 rounded-full border-2 ${bgClass} ${backgroundClass === bgClass ? 'border-black' : 'border-transparent'}`}
                    onClick={() => handleBackgroundChange(bgClass)}
                />
                ))}
            </div>
            <div className={`${backgroundClass} w-full h-16 border rounded-md flex items-center justify-center`}>
                <span className="text-black">Exemplo de Fundo</span>
            </div>
            </div>

            <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">selecione a cor dos títulos:</h2>
            <div className="flex flex-wrap gap-4 mb-4">
                {textColors.map(titleClass => (
                <button
                    key={titleClass}
                    className={`p-2 rounded border-2 ${titleClass} ${titleClass === titleClass ? 'border-black' : 'border-transparent'}`}
                    onClick={() => handleTitleChange(titleClass)}
                >
                    {titleClass.split('-')[1]}
                </button>
                ))}
            </div>
            <div className={`${titleClass} w-full h-16 border rounded-md flex items-center justify-center`}>
                <h1>exemplo de Título</h1>
            </div>
            </div>

            <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">selecione a cor dos textos (paragráfos):</h2>
            <div className="flex flex-wrap gap-4 mb-4">
                {textColors.map(paragraphClass => (
                <button
                    key={paragraphClass}
                    className={`p-2 rounded border-2 ${paragraphClass} ${paragraphClass === paragraphClass ? 'border-black' : 'border-transparent'}`}
                    onClick={() => handleParagraphChange(paragraphClass)}
                >
                    {paragraphClass.split('-')[1]}
                </button>
                ))}
            </div>
            <div className={`${paragraphClass} w-full h-16 border rounded-md flex items-center justify-center`}>
                <p>exemplo de Parágrafo</p>
            </div>
            </div>

            <div className="flex justify-end gap-5">
            <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                gravar
            </button>
            <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                voltar ao Padrão
            </button>
            </div>
        </div>
      
    </div>
  );
};

export default ConfiguracaoTela;
