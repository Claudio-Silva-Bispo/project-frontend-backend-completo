import React from 'react';
import dynamic from 'next/dynamic';
import LoginAnimationJson from '../../public/assets/lotties/login-lottie.json';

// Carregamento dinâmico do Lottie sem SSR
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export const LoginAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoginAnimationJson,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <Lottie options={defaultOptions} width={450} height={450} />;
};
