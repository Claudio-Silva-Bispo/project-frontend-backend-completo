import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import ConsentPopup from './ConsentPopup';

const generateVisitorId = () => 'visitor-' + Math.random().toString(36).substring(2, 15);

const getDeviceType = () => /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

const getOperatingSystem = () => {
  const platform = navigator.platform.toLowerCase();
  if (platform.includes('win')) return 'Windows';
  if (platform.includes('mac')) return 'MacOS';
  if (/android/.test(navigator.userAgent.toLowerCase())) return 'Android';
  if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) return 'iOS';
  return 'Other';
};

const getBrazilTime = () => moment().tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss');

const collectInitialData = (visitorId: string): any => ({
  idVisitante: visitorId,
  paginaVisitada: window.location.pathname,
  ordemVisita: '1',
  tempoPermanencia: '',
  elementosClicados: '',
  tipoNavegador: navigator.appName,
  versaoNavegador: navigator.appVersion,
  tipoDispositivo: getDeviceType(),
  sistemaOperacional: getOperatingSystem(),
  dataConsentimento: '',
  dataHoraSessao: getBrazilTime(),
  enviado: false // Adicionando uma flag para verificar se já foi enviado
});

const collectUserData = (userId: string): any => ({
  idUsuario: userId,
  nome: '', // Preencher com os dados do usuário autenticado
  email: '', // Preencher com os dados do usuário autenticado
  paginaVisitada: window.location.pathname,
  ordemVisita: '1',
  tempoPermanencia: '',
  elementosClicados: '',
  tipoNavegador: navigator.appName,
  versaoNavegador: navigator.appVersion,
  tipoDispositivo: getDeviceType(),
  sistemaOperacional: getOperatingSystem(),
  dataHoraSessao: getBrazilTime(),
  enviado: false // Adicionando uma flag para verificar se já foi enviado
});

const calculateTimeSpent = (start: Date, end: Date) => {
  const duration = moment.duration(moment(end).diff(moment(start)));
  const minutes = Math.floor(duration.asMinutes());
  const seconds = duration.seconds();
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const validateData = (data: any) => {
  const requiredFields = [
    'idVisitante', 'paginaVisitada', 'ordemVisita', 'tempoPermanencia', 
    'elementosClicados', 'tipoNavegador', 'versaoNavegador', 
    'tipoDispositivo', 'sistemaOperacional', 'dataHoraSessao'
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      console.error(`Campo ausente ou inválido: ${field}`);
      return false;
    }
  }

  return true;
};

const VisitorTracker: React.FC = () => {
  const [visitorData, setVisitorData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Adiciona um estado para autenticação

  useEffect(() => {
    const visitorId = localStorage.getItem('visitorId') || generateVisitorId();
    localStorage.setItem('visitorId', visitorId);

    // Verificar autenticação (simulação)
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
      // Simulação de recuperação de dados do usuário autenticado
      const userId = 'authenticated-user-id'; // Recuperar o ID real do usuário autenticado
      setUserData(collectUserData(userId));
    } else {
      // Verificar e limpar dados inválidos
      const storedData = localStorage.getItem('visitorData');
      if (storedData) {
        try {
          JSON.parse(storedData);
        } catch (error) {
          console.error('Dados inválidos encontrados no localStorage, limpando...', error);
          localStorage.removeItem('visitorData');
        }
      }
      fetchVisitorData(visitorId);
    }
  }, []);

  useEffect(() => {
    if (visitorData || userData) {
      const data = visitorData || userData;
      storeVisitorData(data);
      console.log('Dados iniciais coletados:', data);

      const handleRouteChange = (url: string) => {
        const endTime = new Date();
        const timeSpent = calculateTimeSpent(startTime, endTime);
        updateVisitorData(url, timeSpent);
        sendVisitorDataToBackend(data.enviado);
        setStartTime(new Date());
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      const handleBeforeUnload = () => {
        const endTime = new Date();
        const timeSpent = calculateTimeSpent(startTime, endTime);
        updateVisitorData(window.location.pathname, timeSpent);
        sendVisitorDataToBackend(data.enviado);
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('click', handleElementClick);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('click', handleElementClick);
      };
    }
  }, [visitorData, userData, startTime, router.events]);

  const fetchVisitorData = async (visitorId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/VisitanteAnonimo/${visitorId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Dados do visitante recuperados do backend:', data);
        setVisitorData(data);
      } else {
        setVisitorData(collectInitialData(visitorId));
      }
    } catch (error) {
      console.error('Erro ao buscar dados do visitante:', error);
      setVisitorData(collectInitialData(visitorId));
    }
  };

  const handleConsentGiven = () => {
    const dataWithConsent = {
      ...visitorData,
      dataConsentimento: getBrazilTime(),
    };
    storeVisitorData(dataWithConsent, true);
    console.log('Dados coletados (com consentimento):', dataWithConsent);
    sendVisitorDataToBackend(dataWithConsent.enviado);
  };

  const storeVisitorData = (data: any, consented: boolean = false) => {
    const key = consented ? 'visitorDataWithConsent' : 'visitorData';
    localStorage.setItem(key, JSON.stringify(data));
  };

  const updateVisitorData = (newPage: string, timeSpent: string) => {
    const data = visitorData || userData;
    const existingData = { ...data };

    existingData.paginaVisitada += `, ${newPage}`;
    existingData.ordemVisita += `, ${existingData.ordemVisita.split(',').length + 1}`;
    existingData.tempoPermanencia += `, ${timeSpent}`;
    existingData.dataHoraSessao = getBrazilTime();

    if (isAuthenticated) {
      setUserData(existingData);
    } else {
      setVisitorData(existingData);
    }
    storeVisitorData(existingData);
  };

  const handleElementClick = (event: MouseEvent) => {
    const clickedText = (event.target as Element).textContent || '';
    const data = visitorData || userData;
    const newVisitorData = { 
      ...data, 
      elementosClicados: data.elementosClicados 
        ? `${data.elementosClicados}, ${clickedText}` 
        : clickedText 
    };

    if (isAuthenticated) {
      setUserData(newVisitorData);
    } else {
      setVisitorData(newVisitorData);
    }
    storeVisitorData(newVisitorData);
  };

  const sendVisitorDataToBackend = async (isSent: boolean) => {
    const anonDataString = localStorage.getItem('visitorData');
    const consentDataString = localStorage.getItem('visitorDataWithConsent');
    const authDataString = isAuthenticated ? JSON.stringify(userData) : null;

    if (anonDataString) {
      try {
        const anonData = JSON.parse(anonDataString);
        if (validateData(anonData)) {
          console.log('Enviando dados anônimos:', anonData);
          await sendData(anonData, 'VisitanteAnonimo', isSent);
        }
      } catch (error) {
        console.error('Erro ao processar dados anônimos:', error);
      }
    }

    if (consentDataString) {
      try {
        const consentData = JSON.parse(consentDataString);
        if (validateData(consentData)) {
          console.log('Enviando dados com consentimento:', consentData);
          await sendData(consentData, 'VisitanteAceite', isSent);
        }
      } catch (error) {
        console.error('Erro ao processar dados com consentimento:', error);
      }
    }

    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        if (validateData(authData)) {
          console.log('Enviando dados autenticados:', authData);
          await sendData(authData, 'UsuarioAutenticado', isSent);
        }
      } catch (error) {
        console.error('Erro ao processar dados autenticados:', error);
      }
    }

    localStorage.removeItem('visitorData');
    localStorage.removeItem('visitorDataWithConsent');
  };

  const sendData = async (data: any, endpoint: string, isSent: boolean) => {
    const url = isSent ? `http://localhost:3001/api/${endpoint}/${data.idVisitante || data.idUsuario}` : `http://localhost:3001/api/${endpoint}`;
    const method = isSent ? 'PUT' : 'POST';

    try {
      console.log(`Enviando dados para ${endpoint}:`, data);
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao enviar dados do visitante: ${response.status} - ${errorText}`);
      }

      const result = await response.text();
      console.log(`Dados enviados para ${endpoint}:`, result ? JSON.parse(result) : 'Resposta vazia');

      // Marcar como enviado
      if (!isSent) {
        const updatedData = { ...data, enviado: true };

        if (isAuthenticated) {
          setUserData(updatedData);
        } else {
          setVisitorData(updatedData);
        }
        storeVisitorData(updatedData);
      }
    } catch (error) {
      console.error(`Erro ao enviar dados para ${endpoint}:`, error);
    }
  };

  return <ConsentPopup onConsentGiven={handleConsentGiven} />;
};

export default VisitorTracker;
