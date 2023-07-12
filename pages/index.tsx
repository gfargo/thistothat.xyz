import { useAppContext } from '@/components/AppContext';
import Layout from '@/components/Layout';
import TextContentDisplay from '@/components/TextContentDisplay';
import { useTranslate } from '@/lib/langchain/hooks/useTranslate';
import Head from 'next/head';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useMount } from 'ahooks';

export default function Home() {
  const {
    inputLanguage,
    outputLanguage,
    outputCode,
    inputCode,
    setInputCode,
    loading,
    hasTranslated,
    setHasTranslated,
  } = useAppContext();
  const translate = useTranslate();
  const { toast } = useToast();

  useEffect(() => {
    if (hasTranslated) {
      translate();
    }
  }, [outputLanguage]);

  useEffect(() => {
    if (loading) {
      toast({
        title: 'Translating...',
        variant: 'info',
        description: 'This may take a few seconds.',
      });
    } else if (hasTranslated) {
      toast({
        title: 'Translation complete',
        description: 'Resulting output has been copied to clipboard.',
        variant: 'success',
      });
    }
  }, [loading, hasTranslated]);

  useMount(() => {
    toast({
      title: 'Enter some code and click "Translate"',
      variant: 'info',
    });
  });

  return (
    <>
      <Head>
        <title>This🔀That</title>
        <meta
          name="description"
          content="Using LLMs to translate 'This' to 'That."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="p-4 flex w-full flex-col justify-between sm:flex-row">
          <div className="h-100 flex flex-col justify-stretch space-y-2 sm:w-2/4 pr-2">
            <TextContentDisplay
              text={inputCode}
              contentType={inputLanguage}
              loading={loading}
              onChange={(value) => {
                setInputCode(value);
                setHasTranslated(false);
              }}
            />
          </div>
          <div className="mt-8 flex h-full flex-col justify-stretch space-y-2 sm:mt-0 sm:w-2/4 pl-2">
            <TextContentDisplay
              text={outputCode}
              contentType={outputLanguage}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
