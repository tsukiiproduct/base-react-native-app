// Storage abstraction. Currently backed by an in-memory map so the app
// doesn't depend on @react-native-async-storage/async-storage yet.
//
// To activate persistent storage:
//   1. `npm i @react-native-async-storage/async-storage`
//   2. Replace the body below with AsyncStorage.getItem/setItem/removeItem.
// Call sites stay unchanged.

const mem = new Map<string, string>();

export const storage = {
  async get(key: string): Promise<string | null> {
    return mem.has(key) ? (mem.get(key) as string) : null;
  },
  async set(key: string, value: string): Promise<void> {
    mem.set(key, value);
  },
  async remove(key: string): Promise<void> {
    mem.delete(key);
  },
  async clear(): Promise<void> {
    mem.clear();
  },
};
