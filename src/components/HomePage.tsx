
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="bg-gray-800 text-white min-h-[100vh]">
        
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          
          <h1 className="text-4xl font-bold leading-none sm:text-5xl">Melhor painel de controle
            <span className=""> dos seus</span> DASHBOARDs
          </h1>
          
          <p className="px-8 mt-8 mb-12 text-lg">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
          
          <div className="flex flex-wrap justify-center">
            <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-violet-600 text-white"><Link href="/Cadastro">Cadastre-se</Link></button>
            
            <button className="px-8 py-3 m-2 text-lg font-semibold border rounded bg-white text-violet-600"><Link href="/Login">Login</Link></button>
          </div>
        </div>

    </section>
  );
}
