import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorageState, usePrevious } from 'ahooks';
import { Button } from '@/components/ui/button';
import { defaultPrompt } from '@/lib/langchain/prompts/default';
import { useAppContext } from '@/components/AppContext';

interface PromptSelectProps {
  prompt: string;
  onChange: (value: string) => void;
}

const PromptSelect: React.FC<PromptSelectProps> = ({ prompt, onChange }) => {
  const { inputLanguage, outputLanguage, inputCode } = useAppContext();
  const [pendingChanges, setPendingChanges] = useState<boolean>(false);
  const [promptTemplate, cachePromptTemplate] = useLocalStorageState<string>(
    'tttPromptTemplate',
    {
      defaultValue: 'default',
    },
  );
  const previousTemplate = usePrevious(promptTemplate);

  const onTemplateSelectChange = (value: string) => {
    setPendingChanges(true);
    cachePromptTemplate(value);
  };

  const onPromptConfirm = async () => {
    setPendingChanges(false);
    await updatePromptTemplate();
  };

  const onPromptCancel = () => {
    setPendingChanges(false);
    cachePromptTemplate(previousTemplate);
  };

  const updatePromptTemplate = async () => {
    let template = prompt;
    if (promptTemplate !== 'custom') {
      switch (promptTemplate) {
        // TODO: Complex prompt
        case 'complex':
        case 'default':
          template = await defaultPrompt(
            inputLanguage,
            outputLanguage,
            inputCode,
          );
          onChange(template);
          break;
      }
    } else {
      onChange(template);
    }
  };

  useEffect(() => {
    updatePromptTemplate();
  }, [inputLanguage, outputLanguage, inputCode]);

  return (
    <div className="flex w-full flex-col gap-4">
      <Select
        onValueChange={onTemplateSelectChange}
        value={previousTemplate !== promptTemplate ? promptTemplate : undefined}
      >
        <SelectTrigger>
          <SelectValue placeholder="Prompt Templates" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="complex">Complex</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        autoFocus={false}
        name="prompt"
        placeholder="Type your prompt here"
        value={prompt}
        className="w-full"
        rows={20}
        onChange={(e) => {
          if (promptTemplate !== 'custom') {
            cachePromptTemplate('custom');
          }
          onChange(e.target.value);
        }}
      />

      <AlertDialog open={pendingChanges}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Use this template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will replace the current prompt with the selected
              template. It cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant={'ghost'} onClick={onPromptCancel}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant={'secondary'} onClick={onPromptConfirm}>
                Use Template
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PromptSelect;
