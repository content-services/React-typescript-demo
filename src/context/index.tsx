import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface AppContextInterface {
  darkmode: boolean;
  setDarkmode: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextInterface | null>(null);

interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const [darkmode, setDarkmode] = useState<boolean>(false);

  const storedDarkmode = localStorage.getItem('darkmode');
  const initialDarkmode = storedDarkmode ? JSON.parse(storedDarkmode) : false;

  const contextValues = { darkmode: initialDarkmode, setDarkmode };
  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const store = useContext(AppContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
};
