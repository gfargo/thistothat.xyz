import Header from './Header';
import Footer from './Footer';
import { Toaster } from './ui/toaster';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0E1117]  text-neutral-200 ">
      <Header />
      <main className="flex flex-grow">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
