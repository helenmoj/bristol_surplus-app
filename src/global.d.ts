declare global {
  interface Window {
    gaLoaded?: boolean;
  }
}

export {};

declare global {
  interface Window {
    gaLoaded?: boolean;
    dataLayer?: any[];
  }
}
