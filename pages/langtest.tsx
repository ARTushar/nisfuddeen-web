import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="m-8">
        <div>hello English</div>
        <strong className=" font-semibold">
          {router.locale === 'en' ? 'hello English' : 'হ্যালো বাংলা'}
        </strong>
        <h1 className="text-xl">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h1>
        <h1 className="text-2xl">আমরা তোমাদের ভুলবো না</h1>
        <h1 className="text-xl">আসুন ইংরেজি বর্জন করি</h1>
        <h1 className="text-xl font-extrabold">আমরা তোমাদের ভুলবো না</h1>
        <h1 className="text-xl font-extrabold">مَا شَاءَ ٱللّٰهْ‎</h1>
      </div>
    </Layout>
  );
};

export default Home;
