import React, { useState, useEffect } from 'react';
import { FolderMinusIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import ReadingRuler from './ReadingRuler';
import TextZoom from './TextZoom';

const solutions = [
    { name: 'Documentação', description: 'Conheça o que foi criado e como utilizar cada recurso para acessibilidade', href: '/documentation', icon: FolderMinusIcon },
    { name: 'Tema', description: 'Defina entre claro ou escuro', action: 'toggleDarkMode', icon: MoonIcon },
    { name: 'Régua de Leitura', description: 'Ativar/Desativar régua de leitura', action: 'toggleReadingRuler', icon: MoonIcon },
    { name: 'Zoom de Texto', description: 'Ativar/Desativar zoom de texto', action: 'toggleTextZoom', icon: MagnifyingGlassIcon }, // Novo item
];

const RightSidebar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isReadingRulerActive, setIsReadingRulerActive] = useState(false);
    const [isTextZoomActive, setIsTextZoomActive] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            const darkModeEnabled = storedTheme === 'dark';
            setIsDarkMode(darkModeEnabled);
            document.documentElement.classList.toggle('dark', darkModeEnabled);
        }
    }, []);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleClick = (action: string | undefined) => {
        if (!action) return;

        switch (action) {
            case 'toggleDarkMode':
                const newDarkMode = !isDarkMode;
                setIsDarkMode(newDarkMode);
                document.documentElement.classList.toggle('dark', newDarkMode);
                localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
                break;

            case 'toggleReadingRuler':
                setIsReadingRulerActive(!isReadingRulerActive);
                break;

            case 'toggleTextZoom':
                setIsTextZoomActive(!isTextZoomActive);
                break;

            default:
                console.log('Ação não reconhecida:', action);
        }
    };

    return (
        <>
            <nav
                className={`fixed ${isMobile ? 'bottom-0 left-0 w-full flex justify-between' : 'top-0 right-0'} bg-gray-800 p-4 ${isMobile ? 'md:hidden' : 'hidden md:flex md:flex-col md:justify-start md:h-full z-50'}`}
                onMouseEnter={() => !isMobile && setExpanded(true)}
                onMouseLeave={() => !isMobile && setExpanded(false)}
            >
                {solutions.map((item, index) => (
                    <a
                        key={index}
                        href={item.href || '#'}
                        className="text-white flex items-center p-2 hover:bg-gray-700"
                        onClick={() => handleClick(item.action)}
                    >
                        <item.icon className="h-6 w-6 mr-2" />
                        <span className={expanded && !isMobile ? 'block' : 'hidden'}>{item.name}</span>
                    </a>
                ))}
            </nav>
            <ReadingRuler isActive={isReadingRulerActive} onDeactivate={() => setIsReadingRulerActive(false)} />
            <TextZoom isActive={isTextZoomActive} />
        </>
    );
};

export default RightSidebar;
