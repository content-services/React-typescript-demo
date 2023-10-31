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

  const toggleDarkmode = () => {
    setDarkmode((prevDarkmode) => !prevDarkmode);
  };

  const contextValues = { darkmode, setDarkmode: toggleDarkmode };
  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const store = useContext(AppContext);
  if (!store) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
};
