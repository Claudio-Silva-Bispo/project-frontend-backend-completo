import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface StyleContextProps {
  backgroundClass: string;
  textClass: string;
  titleClass: string;
  paragraphClass: string;
  setBackgroundClass: (bgClass: string) => void;
  setTextClass: (textClass: string) => void;
  setTitleClass: (titleClass: string) => void;
  setParagraphClass: (paragraphClass: string) => void;
}

const StyleContext = createContext<StyleContextProps | undefined>(undefined);

export const StyleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [backgroundClass, setBackgroundClass] = useState<string>('bg-white');
  const [textClass, setTextClass] = useState<string>('text-black');
  const [titleClass, setTitleClass] = useState<string>('text-black');
  const [paragraphClass, setParagraphClass] = useState<string>('text-black');

  useEffect(() => {
    const savedBackgroundClass = localStorage.getItem('backgroundClass') || 'bg-gray-800';
    const savedTextClass = localStorage.getItem('textClass') || 'text-white';
    const savedTitleClass = localStorage.getItem('titleClass') || 'text-black';
    const savedParagraphClass = localStorage.getItem('paragraphClass') || 'text-black';

    setBackgroundClass(savedBackgroundClass);
    setTextClass(savedTextClass);
    setTitleClass(savedTitleClass);
    setParagraphClass(savedParagraphClass);
  }, []);

  return (
    <StyleContext.Provider
      value={{
        backgroundClass,
        textClass,
        titleClass,
        paragraphClass,
        setBackgroundClass,
        setTextClass,
        setTitleClass,
        setParagraphClass,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};
