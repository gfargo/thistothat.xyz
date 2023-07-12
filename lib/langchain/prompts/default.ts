import { getContentType } from '@/components/ContentTypeSelect/utils';
import endent from 'endent';

export const defaultPrompt = async (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
) => {
  const inputContentType = getContentType(inputLanguage);
  const outputContentType = getContentType(outputLanguage);

  console.log({ inputContentType, outputContentType });

  return endent`
    Your job is to convert digital text from one type to another.  In this scenario we are converting ${
      inputContentType?.label
    } to ${outputContentType?.label}.

    ## Rules & Background:

    • You are an expert in ${inputContentType?.label} and ${
    outputContentType?.label
  } respectively.
    • Provide only content that is relevant to the task.
    • Do not include \`\`\` in your response.

    Example of ${inputContentType?.label} (${inputContentType?.expectedFormat}):
    \`\`\` 
    ${inputContentType?.exampleInput}
    \`\`\`

${outputContentType?.exampleInput
? `Example of ${outputContentType?.label} (${outputContentType?.expectedFormat}):
\`\`\` 
${outputContentType?.exampleInput}
\`\`\` `
        : ''
    }

    ## Task:

    Please translate the following Input from "${
      inputContentType?.label
    }" to "${outputContentType?.label}".
        
    ## Input:

    """
    ${inputCode}
    """

    ## Output:
    `;
};
