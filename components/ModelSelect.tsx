import { OpenAIModel } from '@/types/types';
import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Props {
  model: OpenAIModel;
  onChange: (model: OpenAIModel) => void;
}

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  const handleChange = (value:string) => {
    onChange(value as OpenAIModel);
  };

  return (
    <Select value={model} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>OpenAI</SelectLabel>
          <SelectItem value="gpt-3.5-turbo">GPT-3.5</SelectItem>
          <SelectItem value="gpt-4">GPT-4</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>HuggingFace</SelectLabel>
          <SelectItem value="gpt2">GPT-2</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
