import Link from 'next/link';
import Layout from '../components/Layout';
import { SearchIcon } from '@heroicons/react/outline';

const Home: React.FC = () => {
  return (
    <>
      <Layout>
        <div className="w-full relative">
          <div
            className="ml-0 md:ml-[25%] h-[540px] hidden md:block"
            // style={{ height: '540px' }}
          >
            {/* TODO: need a background */}
            <img
              className="h-full rounded-xl w-full object-cover"
              loading="lazy"
              src="https://previews.123rf.com/images/zamirkadyzhev09/zamirkadyzhev091803/zamirkadyzhev09180300137/97819236-islamic-calligraphy-them-the-quran-sura-48-al-fath-the-victory-1-ayah-for-registration-of-muslim-hol.jpg"
            />
          </div>
          <div className="flex flex-col justify-center md:absolute h-full top-0 w-full md:w-[420px] mb-8 md:mb-0">
            <div className="md:p-8 bg-white  rounded-xl md:shadow-my">
              <div className="font-extrabold text-3xl antialiased mb-1.5">
                Matrimoni for Muslims in Bangladesh
              </div>
              <div className=" text-[#717171] mb-1.5">Find you partner now</div>
              <div className="mb-4">data</div>
              <div className="relative">
                <div className="absolute px-3 text-xs font-semibold pt-3 leading-3">
                  DISTRICT
                </div>
                <input
                  type="text"
                  className="mb-4 shadow-my1 focus:shadow-my2 border-gray-200 rounded-lg focus:outline-none  w-full px-3 pb-2 pt-6"
                  placeholder="Bangladesh"
                />
              </div>
              <div className="relative">
                <div className="absolute px-3 text-xs font-semibold pt-3 leading-3">
                  TEST
                </div>
                <input
                  type="text"
                  className=" shadow-my1 focus:shadow-my2 border-gray-200 rounded-lg focus:outline-none  w-full px-3 pb-2 pt-6"
                  placeholder="Mytest"
                />
              </div>
              <div
                className="flex justify-center p-3 mt-4 rounded-lg text-white font-semibold"
                style={{
                  backgroundImage: `linear-gradient(to right, #ad5389, #3c1053)`,
                }}
              >
                <SearchIcon className="w-5 h-5 mr-1" />
                <div>Search</div>
              </div>
            </div>
          </div>
        </div>
        hello orl dad hello world
        <Link href="/langtest">
          <a className="underline text-blue-600"> test lang</a>
        </Link>
      </Layout>
    </>
  );
};

export default Home;
