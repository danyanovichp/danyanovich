/// <reference types="vite/client" />

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        enableClosingConfirmation?: () => void;
        sendData: (data: string) => void;
        close: () => void;
        CloudStorage: {
          getItem: (key: string, callback: (err: any, val: string | null) => void) => void;
          setItem: (key: string, val: string, callback?: () => void) => void;
        };
      };
    };
  }
}
