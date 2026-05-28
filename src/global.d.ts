declare global {
  interface Window {
    gaLoaded?: boolean;
    dataLayer?: any[];
  }
}

export {};
