import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import Tabs from '../components/Tabs';

const PaginaLogada: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<string>('Usuarios');
  const [data, setData] = useState<Array<any>>([]);
  const router = useRouter();

  const tabs = ['Usuarios', 'Cadastro', 'Login', 'Feedback'];

  useEffect(() => {
    // Verifica o localStorage para recuperar informações do usuário
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login'); // Redireciona para a página de login se o usuário não estiver logado
    }
  }, [router]);

  const fetchData = async () => {
    try {
      if (selectedTab === 'Usuarios') {
        const response = await axios.get('http://localhost:3001/api/User');
        setData(response.data);
      } else if (selectedTab === 'Cadastro') {
        const response = await axios.get('http://localhost:3001/api/Cadastro');
        setData(response.data);
      } else if (selectedTab === 'Login') {
        const response = await axios.get('http://localhost:3001/api/Login');
        setData(response.data);
      } else if (selectedTab === 'Feedback') {
        const response = await axios.get('http://localhost:3001/api/Feedback');
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  const getHeaders = () => {
    switch (selectedTab) {
      case 'Usuarios':
        return ['id', 'nome'];
      case 'Cadastro':
        return ['id', 'nome', 'email', 'senha'];
      case 'Login':
        return ['id', 'email', 'data', 'hora'];
      case 'Feedback':
        return ['data', 'hora', 'nome', 'email', 'telefone', 'nota', 'descricao'];
      default:
        return [];
    }
  };

  if (!user) {
    return <div>Redirecionando...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Tabs tabs={tabs} selectedTab={selectedTab} onSelectTab={setSelectedTab} />
        <button onClick={fetchData} className="mb-4 p-2 bg-blue-500 text-white rounded">
          Atualizar Dados
        </button>
        <Table
          title={selectedTab}
          data={data}
          headers={getHeaders()}
        />
      </div>
    </div>
  );
};

export default PaginaLogada;
