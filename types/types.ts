export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export type ContentTypeOption = {
  value: string;
  label: string;
  category?: string;
  promptDescription?: string;
  expectedFormat?: string;
  exampleInput?: string;
};

export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  model: OpenAIModel;
  apiKey: string;
}

export interface TranslateResponse {
  code: string;
}
