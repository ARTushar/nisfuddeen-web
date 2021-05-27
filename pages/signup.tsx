import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { XDoubleInput, XSingleButton, XSingleInput, XSingleSelect } from '../components/XInputFields';

const genderOptions = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
];
const accountTypeOptions = [
  { value: 'candidate', label: 'candidate' },
  { value: 'guardian', label: 'guardian' },
];

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Layout>
        <div className="flex mx-auto mt-8 md:mt-20 flex-col justify-center md:w-[480px] mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-8 ">SignUp</div>
            <XSingleInput label="FULL NAME" register={register} name="name" placeholder="Enter your full name" />
            <XDoubleInput>
              <XSingleSelect label="GENDER" options={genderOptions} name="gender" register={register} double={true} />
              <XSingleSelect
                label="ACCOUNT TYPE"
                options={accountTypeOptions}
                name="type"
                register={register}
                double={true}
              />
            </XDoubleInput>

            <XSingleInput
              label="PHONE NUMBER"
              register={register}
              name="phone"
              placeholder="Enter your phone number"
              type="tel"
            />
            <XSingleInput label="EMAIL" register={register} name="email" placeholder="Enter your email" type="email" />
            <XSingleInput
              label="PASSWORD"
              register={register}
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            <XSingleInput
              label="PASSWORD AGAIN"
              register={register}
              name="rePassword"
              placeholder="Enter your password again"
              type="password"
            />
            <XSingleButton label="SignUp" onClick={handleSubmit(onSubmit)} />
            <div className="mt-4 text-gray-600">
              Already have an account?{' '}
              <Link href="/login">
                <a className="text-indigo-800 underline">Login</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LoginPage;
