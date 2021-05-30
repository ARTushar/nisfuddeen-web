import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { XSingleButton, XSingleInput } from '../components/XInputFields';

const LoginPage = () => {
  const router = useRouter();
  const { option } = router.query;

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Layout>
        <div className="flex mx-auto mt-8 md:mt-20 flex-col justify-center md:w-[480px] mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-2 ">
              Login with {option === 'email' ? 'email' : 'phone-number'}
            </div>
            <div className="mb-8 text-gray-600">
              or login with{' '}
              <Link href={`/login${option === 'email' ? '' : '?option=email'}`}>
                <a className=" text-indigo-800 underline ">{option === 'email' ? 'phone-number' : 'email'}</a>
              </Link>
            </div>
            {option === 'email' ? (
              <XSingleInput
                label="EMAIL"
                register={register}
                name="email"
                placeholder="Enter your email"
                type="email"
              />
            ) : (
              <XSingleInput
                label="PHONE-NUMBER"
                register={register}
                name="phone"
                placeholder="Enter your phone number"
                type="tel"
              />
            )}
            <XSingleInput
              label="PASSWORD"
              register={register}
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            <XSingleButton label="Login" onClick={handleSubmit(onSubmit)} />
            <div className="mt-4 text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup">
                <a className="text-indigo-800 underline">Sign up</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LoginPage;
