import Language from './LanguagePicker';
import Link from 'next/link';

const Header: React.FC = (props) => {
  return (
    <header className="flex w-full p-2 justify-around items-center flex-wrap bg-gray-100">
      <div className="font-extrabold text-lg">
        <Link href="/">
          <a>Nisfuddeen</a>
        </Link>
      </div>
      <ul className="flex">
        <li className="mr-4">Home</li>
        <li className="mr-4">About</li>
        <li className="mr-4">Blog</li>
      </ul>
      <Language />
      <div>signin</div>
    </header>
  );
};

export default Header;
