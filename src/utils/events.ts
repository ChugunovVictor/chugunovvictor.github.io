
export function on(eventType: string, listener: () => void) {
    document.addEventListener(eventType, listener);
  }
  
  export function off(eventType: string, listener: () => void) {
    document.removeEventListener(eventType, listener);
  }
  