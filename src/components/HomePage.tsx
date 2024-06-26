
import Link from "next/link";
import { useStyle } from '../context/StyleContext';

export default function HomePage() {

  const { backgroundClass, textClass, titleClass, paragraphClass } = useStyle();

  return (
    <section className={`${backgroundClass} ${textClass} text-white min-h-[100vh]`}>
        
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          
          <h1 className={`text-4xl font-bold leading-none sm:text-5xl ${textClass}`}>Melhor painel de controle
            <span className=""> dos seus</span> DASHBOARDs
          </h1>
          
          <p className="px-8 mt-8 mb-12 text-lg">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
          
          <div className="flex flex-wrap justify-center">
            <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-blue-700 text-white"><Link href="/Cadastro">Cadastre-se</Link></button>
            
            <button className="px-8 py-3 m-2 text-lg font-semibold border rounded bg-white text-blue-700"><Link href="/Login">Login</Link></button>
          </div>

          <div>

            <button className="px-8 py-3 m-2 text-lg font-semibold border rounded bg-white text-blue-700"><Link href="/PaginaLogada">area logada</Link></button>

            <button className="px-8 py-3 m-2 text-lg font-semibold border rounded bg-white text-blue-700"><Link href="/TestePesquisa">Pesquisa</Link></button>

          </div>
        </div>

    </section>
  );
}
