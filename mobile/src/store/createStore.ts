// Tiny Zustand-shaped store using only `useSyncExternalStore` from React.
// The exported `create` function gives you the same `useStore()` /
// `useStore(selector)` ergonomics as Zustand so migration is one import swap.
//
// When ready: `npm i zustand` and replace this file with `export { create }
// from 'zustand'`. No call-site changes needed.

import { useSyncExternalStore } from 'react';

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
type GetState<T> = () => T;
type Listener = () => void;
type StateCreator<T> = (set: SetState<T>, get: GetState<T>) => T;

export interface StoreApi<T> {
  getState: GetState<T>;
  setState: SetState<T>;
  subscribe: (listener: Listener) => () => void;
}

export interface UseStore<T> extends StoreApi<T> {
  (): T;
  <U>(selector: (state: T) => U): U;
}

export function create<T extends object>(initializer: StateCreator<T>): UseStore<T> {
  let state: T;
  const listeners = new Set<Listener>();

  const setState: SetState<T> = (partial) => {
    const next = typeof partial === 'function' ? partial(state) : partial;
    if (next == null) return;
    state = { ...state, ...next };
    listeners.forEach((l) => l());
  };

  const getState: GetState<T> = () => state;

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  state = initializer(setState, getState);

  function useStore<U = T>(selector?: (state: T) => U): U | T {
    return useSyncExternalStore(
      subscribe,
      () => (selector ? selector(state) : state),
      () => (selector ? selector(state) : state)
    );
  }

  const api = useStore as UseStore<T>;
  api.getState = getState;
  api.setState = setState;
  api.subscribe = subscribe;
  return api;
}
