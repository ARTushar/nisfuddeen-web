import Language from './LanguagePicker';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Menubar from './Menubar';

const Header: React.FC = (props) => {
  const dispatch = useDispatch();

  return (
    <header className="w-full flex justify-center bg-gray-100">
      <div className="p-4 flex w-full max-w-7xl justify-between items-center flex-wrap">
        <Menubar />
        <div className=" font-extrabold text-lg">
          <Link href="/">
            <a>NISFUDDEEN</a>
          </Link>
        </div>
        <ul className="hidden md:flex">
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
        <div className="hidden md:block">signin</div>
      </div>
    </header>
  );
};

export default Header;
