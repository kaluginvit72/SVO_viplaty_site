export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (counterId: number | string, method: string, ...args: unknown[]) => void;
  }
}
