import Language from './LanguagePicker';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Menubar from './Menubar';

const Header: React.FC = (props) => {
  const dispatch = useDispatch();

  return (
    <header className="flex w-full p-2 justify-between items-center flex-wrap bg-gray-100">
      <Menubar />
      <div className="font-semibold text-lg">
        <Link href="/">
          <a>NISFUDDEEN</a>
        </Link>
      </div>
      <ul className="hidden sm:flex">
        <li className="mr-4">Home</li>
        <li className="mr-4">About</li>
        <li className="mr-4">Blog</li>
        <li className="mr-4">
          <button
            onClick={() =>
              dispatch({
                type: 'INCREMENT',
                step: 1,
              })
            }
          >
            increment
          </button>
        </li>
      </ul>
      <Language />
      <div className="hidden sm:block">signin</div>
    </header>
  );
};

export default Header;
