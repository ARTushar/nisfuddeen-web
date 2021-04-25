import Language from './LanguagePicker';
import Link from 'next/link';
import Menubar from './Menubar';

const Header: React.FC = (props) => {
  return (
    <header
      className="w-full flex justify-center bg-gray-100"
      style={{ backgroundImage: `linear-gradient(to right, #ad5389, #3c1053)`, color: 'white' }}
    >
      <div className="p-4 flex w-full max-w-7xl justify-between items-center flex-wrap">
        <Menubar />
        <div className=" font-extrabold text-lg">
          <Link href="/">
            <a>NISFUDDEEN</a>
          </Link>
        </div>
        <ul className="hidden md:flex">
          <li className="mr-4">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
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
        </ul>
        <div style={{ color: 'black' }}>
          <Language />
        </div>
        <div className="hidden md:block">
          <Link href="/login">
            <a>signin</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
