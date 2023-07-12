import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { GearIcon } from '@radix-ui/react-icons';
import { ModelSelect } from './ModelSelect';
import { useAppContext } from '@/components/AppContext';
import PromptSelect from './PromptSelect/PromptSelect';
import { Separator } from './ui/separator';

export function Settings() {
  const { apiKey, model, setApiKey, setModel, prompt, setPrompt } =
    useAppContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">
          <GearIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your API key, model, and prompt.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="col-span-4 flex flex-col items-start gap-4">
            <Label htmlFor="apiKey" className="flex-shrink-0 text-right">
              API Key
            </Label>
            <Input
              autoFocus={false}
              name="apiKey"
              type="password"
              placeholder="OpenAI API Key"
              className="w-full"
              value={apiKey}
              onChange={(e) => {
                if (setApiKey) {
                  setApiKey(e.target.value);
                }
              }}
            />
          </div>
          <Separator />

          <div className="col-span-4 flex flex-col items-start gap-4">
            <Label htmlFor="model" className="flex-shrink-0 text-right">
              Model
            </Label>

            <ModelSelect
              model={model || 'gpt-3.5-turbo'}
              onChange={(value) => {
                if (setModel) {
                  setModel(value);
                }
              }}
            />
          </div>
          <Separator />
          <div className="col-span-4 flex flex-col items-start gap-4">
            <Label htmlFor="prompt" className="text-right">
              Prompt
            </Label>

            <PromptSelect
              prompt={prompt || ''}
              onChange={(value) => {
                if (setPrompt) {
                  setPrompt(value);
                }
              }}
            />
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
