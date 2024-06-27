import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="flex bg-white text-black min-h-screen dark:bg-gray-800 dark:text-white">
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Documentação de Acessibilidade</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Função de Zoom de Texto</h2>
          <p className="mb-2">
            A função de zoom de texto é um recurso de acessibilidade que permite que o texto seja ampliado quando o usuário passa o mouse sobre ele. Este recurso é particularmente útil para usuários que têm dificuldades para ler textos pequenos, mas não querem ou não podem aumentar o tamanho da fonte de toda a página.
          </p>
          <h3 className="text-lg font-semibold mb-1">Propósito</h3>
          <p className="mb-2">
            Este recurso foi criado para melhorar a experiência de leitura dos usuários, permitindo que eles leiam facilmente textos pequenos sem alterar o layout geral da página. O zoom de texto é ativado quando o usuário passa o mouse sobre um texto, exibindo uma versão ampliada do texto para facilitar a leitura.
          </p>
          <h3 className="text-lg font-semibold mb-1">Públicos Alvos</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Usuários com Deficiência Visual</li>
            <li>Idosos</li>
            <li>Qualquer Usuário</li>
          </ul>
          <h3 className="text-lg font-semibold mb-1">Passo a Passo para Ativar e Desativar</h3>
          <p className="mb-1">Ativar o Zoom de Texto:</p>
          <ol className="list-decimal list-inside mb-2">
            <li>Navegue até a sidebar no seu site.</li>
            <li>Clique no botão "Ativar Zoom de Texto".</li>
            <li>Usando o Teclado: Navegue até a sidebar usando as teclas de navegação e pressione "Enter" ou "Espaço".</li>
          </ol>
          <p className="mb-1">Desativar o Zoom de Texto:</p>
          <ol className="list-decimal list-inside mb-2">
            <li>Navegue até a sidebar no seu site.</li>
            <li>Clique no botão "Desativar Zoom de Texto".</li>
            <li>Usando o Teclado: Navegue até a sidebar usando as teclas de navegação e pressione "Enter" ou "Espaço".</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Função de Desativar Imagens</h2>
          <p className="mb-2">
            A função de desativar imagens permite que os usuários ocultem todas as imagens do site, deixando apenas o conteúdo de texto visível. Este recurso é útil para pessoas que preferem uma experiência de leitura mais limpa e menos distrativa.
          </p>
          <h3 className="text-lg font-semibold mb-1">Propósito</h3>
          <p className="mb-2">
            Este recurso foi criado para melhorar a acessibilidade e a experiência de leitura para usuários que desejam focar apenas no texto. Ocultar imagens pode ajudar a reduzir distrações e tornar o conteúdo mais acessível para leitores que acham que muitas imagens dificultam a navegação ou a compreensão.
          </p>
          <h3 className="text-lg font-semibold mb-1">Públicos Alvos</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Usuários com Deficiência Visual</li>
            <li>Leitores Focados no Texto</li>
            <li>Usuários com Conexão Lenta</li>
          </ul>
          <h3 className="text-lg font-semibold mb-1">Passo a Passo para Ativar e Desativar</h3>
          <p className="mb-1">Ativar a Ocultação de Imagens:</p>
          <ol className="list-decimal list-inside mb-2">
            <li>Navegue até a sidebar no seu site.</li>
            <li>Clique no botão "Ocultar Imagens".</li>
            <li>Usando o Teclado: Navegue até a sidebar usando as teclas de navegação e pressione "Enter" ou "Espaço".</li>
          </ol>
          <p className="mb-1">Desativar a Ocultação de Imagens:</p>
          <ol className="list-decimal list-inside mb-2">
            <li>Navegue até a sidebar no seu site.</li>
            <li>Clique no botão "Mostrar Imagens".</li>
            <li>Usando o Teclado: Navegue até a sidebar usando as teclas de navegação e pressione "Enter" ou "Espaço".</li>
          </ol>
        </section>
      </main>
    </div>
  );
};

export default Documentation;
