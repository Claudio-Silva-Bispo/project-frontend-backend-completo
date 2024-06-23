import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import Tabs from '../components/Tabs';
import { useAuth } from '../context/AuthContext'; // Ajuste o caminho conforme necessário

const PaginaLogada: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>('Usuarios');
  const [data, setData] = useState<Array<any>>([]);
  const router = useRouter();

  const tabs = ['Usuarios', 'Cadastro', 'Login', 'Feedback'];

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const fetchData = async () => {
    try {
      let response;
      if (selectedTab === 'Usuarios') {
        response = await axios.get('http://localhost:3001/api/User');
      } else if (selectedTab === 'Cadastro') {
        response = await axios.get('http://localhost:3001/api/Cadastro');
      } else if (selectedTab === 'Login') {
        response = await axios.get('http://localhost:3001/api/Login');
      } else if (selectedTab === 'Feedback') {
        response = await axios.get('http://localhost:3001/api/Feedback');
      }

      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [selectedTab, user]);

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
