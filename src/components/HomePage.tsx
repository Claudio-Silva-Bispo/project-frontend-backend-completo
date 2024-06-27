import React from "react";
import Link from "next/link";
import { useStyle } from '../context/StyleContext';
import { HomeAnimation } from "./HomeAnimation";

export default function HomePage() {
  const { backgroundClass, textClass, titleClass, paragraphClass } = useStyle();

  return (
    <section className={`${backgroundClass} ${textClass} bg-white min-h-[100vh] dark:bg-gray-800 dark:text-white`}>
      <div className="flex justify-center items-center p-10">
        
        <div>
          <HomeAnimation />
        </div>
        
        <div className="container mx-auto flex flex-col justify-center items-center px-4 py-16 text-start md:text-center md:py-32 md:px-10 lg:px-32">
          <h1 className={`text-2xl font-bold leading-none sm:text-5xl text-[#042D60] uppercase dark:text-white`}>
            Descubra o Painel de controle!
          </h1>
          
          <p className="md:px-8 mt-8 mb-12 text-lg text-[#042D60] dark:text-white">
            Transforme seus dados em insights poderosos com nosso painel de controle líder no mercado. Proporcione uma experiência visual única, intuitiva e eficiente para sua equipe.
          </p>
          
          <div className="flex w-full justify-center">
            <button className="px-8 py-3 m-2 text-md font-semibold border rounded bg-white text-[#042D60] hover:bg-[#042D60] hover:text-white dark:hover:bg-[#0A9DDA]">
              <Link href="/PaginaLogada">Dashboard</Link>
            </button>

            <button className="px-8 py-3 m-2 text-md font-semibold border rounded bg-white text-[#042D60] hover:bg-[#042D60] hover:text-white dark:hover:bg-[#0A9DDA]">
              <Link href="/TestePesquisa">Pesquisa</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
