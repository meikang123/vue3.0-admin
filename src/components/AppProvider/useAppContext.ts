import { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from './useContext';

export interface AppProviderContextProps {
  device: Ref<string>;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

const key: InjectionKey<AppProviderContextProps> = Symbol();

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key, { readonly: false });
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}
