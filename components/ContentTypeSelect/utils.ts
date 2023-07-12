import {
  ACADEMIC_CONTENT,
  ADVERTISING_CONTENT,
  BUSINESS_DOCUMENTS,
  DATABASES,
  GOVERNMENT_DOCUMENTS,
  LEGAL_DOCUMENTS,
  LITERARY_CONTENT,
  NEWS_MEDIA_CONTENT,
  PROGRAMMING_LANGUAGES,
  SCIENTIFIC_CONTENT,
  SOFTWARE_TESTING_TOOLS,
  TECHNICAL_CONTENT,
  WEB_CONTENT,
  WEB_FRAMEWORKS,
  WEB_TECHNOLOGIES,
} from './constants';

export const ALL_CONTENT_TYPES = [
  ...ACADEMIC_CONTENT,
  ...ADVERTISING_CONTENT,
  ...BUSINESS_DOCUMENTS,
  ...DATABASES,
  ...WEB_FRAMEWORKS,
  ...GOVERNMENT_DOCUMENTS,
  ...LEGAL_DOCUMENTS,
  ...LITERARY_CONTENT,
  ...NEWS_MEDIA_CONTENT,
  ...PROGRAMMING_LANGUAGES,
  ...SCIENTIFIC_CONTENT,
  ...TECHNICAL_CONTENT,
  ...SOFTWARE_TESTING_TOOLS,
  ...WEB_CONTENT,
  ...WEB_TECHNOLOGIES,
];

export const ALL_CODE_CONTENT_TYPES = [
  ...DATABASES,
  ...PROGRAMMING_LANGUAGES,
  ...SOFTWARE_TESTING_TOOLS,
  ...WEB_FRAMEWORKS,
  ...WEB_TECHNOLOGIES,
];

export const isCodeInput = (language: string) =>
  [...ALL_CONTENT_TYPES.map((o) => o.value)].includes(language);

export const getContentType = (language: string) =>
  ALL_CONTENT_TYPES.find((option) => option.value === language);