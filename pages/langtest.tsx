import { useRouter } from 'next/router';
import LanguagePicker from '../components/LanguagePicker';

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <div className="m-8">
      {router.locale === 'en' ? 'hello English' : 'হ্যালো বাংলা'}
      <LanguagePicker />
    </div>
  );
};

export default Home;
