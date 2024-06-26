import React, { useState } from 'react';

interface ConsentPopupProps {
  onConsentGiven: () => void;
}

const ConsentPopup: React.FC<ConsentPopupProps> = ({ onConsentGiven }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleConsent = () => {
    setIsVisible(false);
    onConsentGiven();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <span>Usamos cookies para melhorar sua experiência. Você aceita coletar seus dados?</span>
      <button onClick={handleConsent} className="bg-blue-500 px-4 py-2 rounded">
        Aceitar
      </button>
    </div>
  );
};

export default ConsentPopup;
