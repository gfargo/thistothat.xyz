import { copyToClipboard } from '@/lib/utils';
import { useAppContext } from '@/components/AppContext';
import { OpenAIModel } from '@/types/types';

interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  model: OpenAIModel;
  apiKey: string;
}

export const useTranslate = () => {
  const {
    apiKey,
    model =  'gpt-3.5-turbo',
    inputLanguage,
    outputLanguage,
    inputCode,
    setOutputCode,
    setLoading,
    setHasTranslated,
  } = useAppContext();

  const translate = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000;

    if (
      !apiKey ||
      inputLanguage === outputLanguage ||
      !inputCode ||
      inputCode.length > maxCodeLength
    ) {
      // Handle input errors here...
      return;
    }

    setLoading(true);
    setOutputCode('');

    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
      apiKey,
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      // Handle response error here...
      return;
    }

    const reader = (await response.body)?.getReader();
    const decoder = new TextDecoder();
    let code = '';

    while (true) {
      if (!reader) {
        break;
      }
      
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      const chunkValue = decoder.decode(value);
      code += chunkValue;
      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
  };

  return translate;
};
