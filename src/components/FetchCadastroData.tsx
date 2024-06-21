import React, { useState } from 'react';
import axios from 'axios';

const FetchCadastroData: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3001/api/User');
      setData(response.data);
    } catch (error) {
      setError('Erro ao buscar os dados');
      console.error('Error fetching cadastro data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">Dados de Cadastro</h2>
      <button onClick={fetchData} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Buscar Dados
      </button>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-3">ID</th>
                <th className="p-3">Nome</th>
              </tr>
            </thead>
            <tbody className="border-b bg-gray-50 border-gray-300">
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-2">{row.id}</td>
                  <td className="px-3 py-2">{row.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FetchCadastroData;
