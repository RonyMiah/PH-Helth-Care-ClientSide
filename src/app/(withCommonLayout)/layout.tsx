import Footer from '@/components/Shared/Footer/Footer';
import Navber from '@/components/Shared/Navber/Navber';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navber />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
