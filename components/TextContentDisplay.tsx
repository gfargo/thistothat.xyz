import { CodeBlock } from './CodeBlock';
import { TextBlock } from './TextBlock';

import {
  ACADEMIC_CONTENT,
  ADVERTISING_CONTENT,
  BUSINESS_DOCUMENTS,
  GOVERNMENT_DOCUMENTS,
  LEGAL_DOCUMENTS,
  LITERARY_CONTENT,
  NEWS_MEDIA_CONTENT,
  SCIENTIFIC_CONTENT,
  TECHNICAL_CONTENT,
  WEB_CONTENT,
} from '@/components/ContentTypeSelect/constants';

const isCodeInput = (language: string) =>
  ![
    ...ACADEMIC_CONTENT.map((o) => o.value),
    ...ADVERTISING_CONTENT.map((o) => o.value),
    ...BUSINESS_DOCUMENTS.map((o) => o.value),
    ...GOVERNMENT_DOCUMENTS.map((o) => o.value),
    ...LEGAL_DOCUMENTS.map((o) => o.value),
    ...LITERARY_CONTENT.map((o) => o.value),
    ...NEWS_MEDIA_CONTENT.map((o) => o.value),
    ...SCIENTIFIC_CONTENT.map((o) => o.value),
    ...TECHNICAL_CONTENT.map((o) => o.value),
    ...WEB_CONTENT.map((o) => o.value),
  ].includes(language);

interface TextDisplayProps {
  text: string;
  contentType?: string;
  loading?: boolean;
  onChange?: (text: string) => void;
}

const TextContentDisplay: React.FC<TextDisplayProps> = ({
  text,
  contentType = 'code',
  loading,
  onChange,
}) => {
  return (
    <>
      {isCodeInput(contentType) ? (
        <CodeBlock
          code={text}
          editable={!loading}
          onChange={(value) => {
            if (onChange) {
              onChange(value);
            }
          }}
        />
      ) : (
        <TextBlock
          text={text}
          editable={!loading}
          onChange={(value) => {
            if (onChange) {
              onChange(value);
            }
          }}
        />
      )}
    </>
  );
};

export default TextContentDisplay;
