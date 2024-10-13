import storage from 'redux-persist/lib/storage'; // Client-side storage for redux-persist

// Define a type for the storage interface
interface Storage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// Create a no-operation storage for server-side (to avoid errors during SSR)
const createNoopStorage = (): Storage => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Export the appropriate storage method based on whether window is defined
export const storageMethod: Storage = typeof window !== 'undefined' ? storage : createNoopStorage();
