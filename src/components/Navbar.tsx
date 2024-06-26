import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';
import Button from './Button';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchResult(query);
  };

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

              <li id="text6" tabIndex={6} className="text-white font-semibold text-lg">
                <Link href="/FeedbackForm">feedback</Link>
              </li>

              <li id="text6" tabIndex={6} className="text-white font-semibold text-lg">
                <Link href="/Contact">contato</Link>
              </li>
              <li id="text7" tabIndex={7} className="text-white font-semibold text-lg">
                <Link href="/Login">login</Link>
              </li>
            </ul>

          </div>

          <div>
            <SearchBar onSearch={handleSearch}/>
          </div>

          <div className="hidden lg:flex gap-5">
            <div className="flex items-center space-x-6">
              <Button href="/Cadastro" label="cadastre-se" color="bg-blue-700" />
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
        <div className="fixed inset-0 bg-gray-700 text-white z-50 flex flex-col items-center justify-center lg:hidden">
          
          <ul className="flex flex-col items-center space-y-8 font-montserrat font-semibold">
            
            <li className=" font-semibold text-lg cursor-pointer" onClick={() => handleNavigation('/sobreProjeto')}>
              sobre o projeto
            </li>

            <li className=" font-semibold text-lg cursor-pointer" onClick={() => handleNavigation('/Funcionalidades')}>
              funcionalidades
            </li>

            <li className=" font-semibold text-lg cursor-pointer" onClick={() => handleNavigation('/FeedbackForm')}>
              feedback
            </li>

            <li className=" font-semibold text-lg">
              <Link href="/Contact" onClick={closeMenu}>contato</Link>
            </li>

            <div className="flex flex-col space-y-4 items-center w-full">
              <Button href="/Cadastro" label="cadastre-se" color="bg-blue-700" />
            </div>

            <div className="flex flex-col space-y-4 items-center w-full">
              <Button href="/Login" label="Login" color="bg-blue-700"/>
            </div>

            <li className="font-semibold text-lg">
              <button onClick={closeMenu} className="w-full text-center">Fechar</button>
            </li>

          </ul>
          
        </div>
      )}
    </section>
  );
};

export default Navbar;
