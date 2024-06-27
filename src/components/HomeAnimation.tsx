import React from 'react';
import dynamic from 'next/dynamic';
import HomeAnimationJson from '../../public/assets/lotties/computer-lottie.json';

// Carregamento dinâmico do Lottie sem SSR
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export const HomeAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: HomeAnimationJson,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <Lottie options={defaultOptions} width={650} height={650} />;
};
