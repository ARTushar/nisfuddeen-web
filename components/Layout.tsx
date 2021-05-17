import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = (props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl m-auto">
        <div className="mx-4 my-4">{props.children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
