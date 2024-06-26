declare module 'react-speech-recognition' {
    type ListeningOptions = {
      continuous?: boolean;
      language?: string;
    };
  
    interface Command {
      command: string | RegExp;
      callback: (args?: any) => void;
    }
  
    interface UseSpeechRecognitionOptions {
      commands?: Command[];
    }
  
    interface SpeechRecognition {
      startListening: (options?: ListeningOptions) => void;
      stopListening: () => void;
      abortListening: () => void;
      browserSupportsSpeechRecognition: boolean;
    }
  
    export function useSpeechRecognition(
      options?: UseSpeechRecognitionOptions
    ): {
      transcript: string;
      listening: boolean;
      resetTranscript: () => void;
      browserSupportsSpeechRecognition: boolean;
    };
  
    const SpeechRecognition: SpeechRecognition;
    export default SpeechRecognition;
  }
  