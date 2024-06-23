import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Menu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  
  const handleNavigation = (path: string) => {
    if (router.pathname === '/') {
      document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/' + path);
    }
    closeMenu();
  };


  return (
    
    <section className="relative flex justify-center items-center w-full h-[80px] bg-[#077B74] dark:bg-gray-900 dark:text-white">
      
      <div className="absolute top-0 left-0 w-full h-[80px] flex items-center bg-transparent px-10">
        <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">

        
          <div className="flex-shrink-0">
            <h1 className='font-bold'>Logo</h1>
          </div>

          

          <div className="hidden lg:flex items-center space-x-8">
            
            <ul className="flex space-x-8 font-montserrat font-semibold">
              <li id="text1" tabIndex={1} className="text-white font-semibold text-lg cursor-pointer" onClick={() => handleNavigation('/')}>
                sobre o projeto
              </li>

              <li id="text2" tabIndex={2} className="text-white font-semibold text-lg cursor-pointer" onClick={() => handleNavigation('/')}>
                funcionalidades
              </li>

              <li id="text6" tabIndex={6}  className="text-white font-semibold text-lg">
                <Link href="/FeedbackForm">feedback</Link>
              </li>

              <li id="text6" tabIndex={6}  className="text-white font-semibold text-lg">
                <Link href="/Contact">contato</Link>
              </li>

              <li id="text7" tabIndex={7}  className="text-white font-semibold text-lg">
                <Link href="/Login">login</Link>
              </li>

            </ul>

          </div>

            <div>
                <form className="flex items-center max-w-lg mx-auto">   
                    
                    <label htmlFor="voice-search" className="sr-only">Pesquisar</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                            </svg>
                        </div>
                        <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar, Falar..." required />
                        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
                            </svg>
                        </button>
                    </div>

                    <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>Pesquisar
                    </button>
                </form>
            </div>

          <div className="hidden lg:flex gap-5">
            <div className="flex items-center space-x-6">
              
              <button className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <span className="text-white font-semibold text-lg">
                  <Link id="text8" tabIndex={8}  href="/Cadastro">cadastre-se</Link>
                </span>
              </button>

            </div>
          </div>

          <button className="lg:hidden p-4 text-white" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-[#B9E2E0] z-50 flex flex-col items-center justify-center lg:hidden">
          <ul className="flex flex-col items-center space-y-8 font-montserrat font-semibold">
            <li className="text-black font-semibold text-lg cursor-pointer" onClick={() => handleNavigation('#sobreProjeto')}>
              sobre o projeto
            </li>
            <li className="text-black font-semibold text-lg cursor-pointer" onClick={() => handleNavigation('#Funcionalidades')}>
              funcionalidades
            </li>
           

            <li className="text-black font-semibold text-lg cursor-pointer" onClick={() => handleNavigation('#Educacao')}>
              feedback
            </li>

            <li className="text-black font-semibold text-lg">
              <Link href="/Contato" onClick={closeMenu}>contato</Link>
            </li>

            <div className="flex flex-col space-y-4 items-center">
              <button className="p-2 w-full text-center bg-[#F1A027] rounded-md text-white">
                <span className=" font-semibold text-lg">
                  <Link href="/Cadastro" onClick={closeMenu}>cadastre-se</Link>
                </span>
              </button>
              <button className="p-2 w-full text-center bg-[#007871] rounded-md text-white">
                <span className="font-semibold text-lg">
                  <Link href="/Login" onClick={closeMenu}>Login</Link>
                </span>
              </button>
            </div>
            <li className="text-black font-semibold text-lg">
              <button onClick={closeMenu} className="w-full text-center">Fechar</button>
            </li>
          </ul>
        </div>
      )}

    </section>
  );
};

export default Menu;