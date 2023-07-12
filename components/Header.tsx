import { Settings } from './Settings';
import { Button } from './ui/button';
import { ContentTypeSelect } from './ContentTypeSelect/ContentTypeSelect';
import { useAppContext } from './AppContext';
import { LapTimerIcon, ShuffleIcon } from '@radix-ui/react-icons';
import { useTranslate } from '@/lib/langchain/hooks/useTranslate';

const Header = () => {
  const {
    inputLanguage,
    outputLanguage,
    setInputLanguage,
    setOutputLanguage,
    setHasTranslated,
    setInputCode,
    setOutputCode,
    loading,
  } = useAppContext();

  const translate = useTranslate();

  return (
    <header className="flex bg-slate-800 px-4 py-2 border-b border-slate-700">
      <nav className="flex w-full flex-row">
        <ul className="flex w-full items-center justify-between">
          <li>
            <div className="flex flex-row items-center space-x-4">
              <div className="flex flex-col items-end">
                <h3 className="text-center text-xs font-bold leading-3">This</h3>
                👉
              </div>
              <ContentTypeSelect
                language={inputLanguage}
                onChange={(value) => {
                  setInputLanguage(value);
                  setHasTranslated(false);
                  setInputCode('');
                  setOutputCode('');
                }}
              />
            </div>
          </li>
          <li className="ml-auto mr-auto">
            <Button
              onClick={async () => {
                await translate();
              }}
              disabled={loading}
            >
              {loading ? <LapTimerIcon /> : <ShuffleIcon />}
            </Button>
          </li>

          <li>
            <div className="flex flex-row items-center space-x-4">
              <div className="flex flex-col items-end">
                <h3 className="text-center text-xs font-bold leading-3">That</h3>
                👉
              </div>
              <ContentTypeSelect
                language={outputLanguage}
                onChange={(value) => {
                  setOutputLanguage(value);
                  setOutputCode('');
                }}
              />
            </div>
          </li>

          <li className="ml-2">
            <Settings />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
