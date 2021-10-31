import Language from './LanguagePicker';
import Link from 'next/link';
import Menubar from './Menubar';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { signout } from '../hooks/firebase';

const Header: React.FC = (props) => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <header className="w-full flex justify-center  bg-gray-50">
      <div className="px-4 py-2 flex w-full max-w-7xl justify-between items-center flex-wrap">
        <Menubar />
        <div className=" font-extrabold text-lg">
          <Link href="/">
            <a>
              <img src="/images/logo.svg" alt="nisfuddeen" />
            </a>
          </Link>
        </div>
        {/* <ul className="hidden md:flex">
          <li className="mr-4">
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li className="mr-4">
            <Link href="/faq">
              <a>FAQ</a>
            </Link>
          </li>
          <li className="mr-4">
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
        </ul> */}
        {/* <div style={{ color: 'black' }}>
          <Language />
        </div> */}
        <div className="hidden md:block">
          {auth.firebaseUser ? (
            <button onClick={signout}>signout</button>
          ) : (
            <button onClick={() => router.push('/auth/signin')}>signin</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
