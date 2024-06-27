// src/react-lottie.d.ts
declare module 'react-lottie' {
    import { Component } from 'react';
  
    export interface LottieOptions {
      loop?: boolean;
      autoplay?: boolean;
      animationData: any;
      rendererSettings?: {
        preserveAspectRatio?: string;
        [key: string]: any;
      };
    }
  
    export interface LottieProps {
      options: LottieOptions;
      height?: number | string;
      width?: number | string;
      isStopped?: boolean;
      isPaused?: boolean;
      eventListeners?: Array<{
        eventName: string;
        callback: () => void;
      }>;
      [key: string]: any;
    }
  
    export default class Lottie extends Component<LottieProps> {}
  }
  