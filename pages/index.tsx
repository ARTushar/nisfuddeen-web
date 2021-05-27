import Link from 'next/link';
import Layout from '../components/Layout';
import { SearchIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { XSingleButton, XSingleInput, XSingleSelect } from '../components/XInputFields';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Home: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Layout>
        <div className="w-full relative">
          <div className="ml-0 md:ml-[25%] h-[540px] hidden md:block">
            {/* TODO: need a background */}
            <img
              className="h-full rounded-xl w-full object-cover"
              loading="lazy"
              src="https://previews.123rf.com/images/zamirkadyzhev09/zamirkadyzhev091803/zamirkadyzhev09180300137/97819236-islamic-calligraphy-them-the-quran-sura-48-al-fath-the-victory-1-ayah-for-registration-of-muslim-hol.jpg"
            />
          </div>
          <div className="flex flex-col justify-center md:absolute h-full top-0 w-full md:w-[420px] mb-8 md:mb-0">
            <div className="md:p-8 bg-white  rounded-xl md:shadow-my">
              <div className="font-extrabold text-3xl antialiased mb-1.5">Matrimoni for Muslims in Bangladesh</div>
              <div className=" text-[#717171] mb-2">Find you partner now</div>
              <XSingleInput label="DISTRICT" register={register} name="data1" placeholder="Dhaka" />
              <XSingleInput label="TEST" register={register} name="data2" placeholder="My test" />
              <XSingleSelect label="GENDER" register={register} name="gender" options={options} />
              <XSingleButton label="Search" onClick={handleSubmit(onSubmit)} icon={SearchIcon} />
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
