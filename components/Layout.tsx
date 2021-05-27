import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';

const Layout: React.FC<{
  auth?: boolean;
}> = (props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl m-auto">
        <div className="mx-4 my-4">
          {props.auth ? (
            <div>
              <div>You are not Signed In</div>
              <Link href="/auth/signin">
                <a className="underline">Sign in now</a>
              </Link>
            </div>
          ) : (
            props.children
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
