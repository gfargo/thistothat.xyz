import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const Footer = () => (
  <footer className="flex w-full items-center justify-between border-t border-slate-800 bg-slate-950 px-4 py-2 text-neutral-200">
    <div>
      <p className="text-xs">This 🔀 That &copy; {new Date().getFullYear()} </p>
    </div>
    <div>
      <Link href="https://github.com/gfargo/thistothat.xyz">
        <GitHubLogoIcon className="h-5 w-5 text-white" />
      </Link>
    </div>
  </footer>
);

export default Footer;
