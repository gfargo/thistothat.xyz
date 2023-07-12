import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorageState } from 'ahooks';
import { OpenAIModel } from '@/types/types';
import { IFuncUpdater } from 'ahooks/lib/createUseStorageState';

interface AppContextProps {
  apiKey?: string;
  setApiKey?: (value?: string | IFuncUpdater<string> | undefined) => void;
  model?: OpenAIModel;
  setModel?: (
    value?: OpenAIModel | IFuncUpdater<OpenAIModel> | undefined,
  ) => void;
  prompt?: string;
  setPrompt?: (value?: string | IFuncUpdater<string> | undefined) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hasTranslated: boolean;
  setHasTranslated: React.Dispatch<React.SetStateAction<boolean>>;
  inputLanguage: string;
  setInputLanguage: React.Dispatch<React.SetStateAction<string>>;
  outputLanguage: string;
  setOutputLanguage: React.Dispatch<React.SetStateAction<string>>;
  inputCode: string;
  setInputCode: React.Dispatch<React.SetStateAction<string>>;
  outputCode: string;
  setOutputCode: React.Dispatch<React.SetStateAction<string>>;
}

const NOOP = () => {};

const AppContext = createContext<AppContextProps>({
  apiKey: undefined,
  model: 'gpt-3.5-turbo',
  prompt: undefined,
  inputLanguage: 'javascript',
  outputLanguage: 'python',
  loading: false,
  hasTranslated: false,
  inputCode: '',
  outputCode: '',
  setInputCode: NOOP,
  setOutputCode: NOOP,
  setHasTranslated: NOOP,
  setLoading: NOOP,
  setApiKey: NOOP,
  setModel: NOOP,
  setPrompt: NOOP,
  setInputLanguage: NOOP,
  setOutputLanguage: NOOP,
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useLocalStorageState<string>('tttOpenAIKey', {
    defaultValue: '',
  });
  const [model, setModel] = useLocalStorageState<OpenAIModel>('tttModel', {
    defaultValue: 'gpt-3.5-turbo',
  });
  const [prompt, setPrompt] = useLocalStorageState<string>('tttPrompt');

  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [inputLanguage, setInputLanguage] = useState<string>('javascript');
  const [outputLanguage, setOutputLanguage] = useState<string>('python');

  return (
    <AppContext.Provider
      value={{
        apiKey,
        model,
        prompt,
        inputLanguage,
        outputLanguage,
        loading,
        hasTranslated,
        inputCode,
        outputCode,
        setInputCode,
        setOutputCode,
        setLoading,
        setHasTranslated,
        setApiKey,
        setModel,
        setPrompt,
        setInputLanguage,
        setOutputLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};
