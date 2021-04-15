import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = (props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
