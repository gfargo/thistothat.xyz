'use client';
import type { FC } from 'react';
import * as React from 'react';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

import type { ContentTypeOption } from '@/types/types';
import * as ALL_OPTIONS from './constants';
import { ALL_CONTENT_TYPES } from './utils';

interface Props {
  language: string;
  onChange: (language: string) => void;
}

const options = ALL_CONTENT_TYPES

export const ContentTypeSelect: FC<Props> = ({ language, onChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[360px] justify-between"
        >
          {language
            ? options.find((option) => option.value === language)?.label
            : 'Select option...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-80" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0">
        <Command>
          <CommandInput placeholder="Search this..." className="h-9" />
          <CommandEmpty className="p-3 text-xs">Not found.</CommandEmpty>
          <ScrollArea className="h-72">
            {Object.keys(ALL_OPTIONS).map((key) => {
              const options = (ALL_OPTIONS[
                key as keyof typeof ALL_OPTIONS
              ] as ContentTypeOption[]).sort((a, b) =>
                a.label.localeCompare(b.label),
              );

              const heading = key.replace(/_/g, ' ');

              return (
                <CommandGroup heading={heading} key={key}>
                  {options.map((option: ContentTypeOption) => (
                    <CommandItem
                      key={option.value}
                       onSelect={(currentValue) => {
                        onChange(currentValue === language ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          language === option.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
