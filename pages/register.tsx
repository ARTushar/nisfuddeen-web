import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  XDoubleInput,
  XSingleButton,
  XSingleInput,
  XSingleSelect,
} from '../components/XInputFields';
import { registerUser } from '../api';

const genderOptions = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
];
const accountTypeOptions = [
  { value: 'bridegroom', label: 'bridegroom' },
  { value: 'guardian', label: 'guardian' },
];

const Register = () => {
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: auth.user?.name,
    },
  });

  // useEffect(() => {
  //   // console.log(auth);
  //   if (!auth.auth) router.push('/auth/signin');
  // }, [auth.auth]);

  const onSubmit = async (data) => {
    const res = await registerUser(data);
    if (res.status === 200) {
      router.replace('/biodata/create');
    }
  };

  if (!auth.auth) return <Layout>Not signed in</Layout>;
  if (auth.user.completeAccount)
    return (
      <Layout>
        <div>Account Already Completed</div>
        <Link href="biodata/create">
          <a className="underline">Submit biodata</a>
        </Link>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:w-[480px] mb-8 md:mb-0">
        <div className="md:p-8 rounded-lg">
          <div className="font-extrabold text-2xl antialiased mb-8 ">Complete your profile</div>
          <XSingleInput
            label="FULL NAME"
            register={register}
            validator={{ required: true }}
            name="name"
            placeholder="Enter your full name"
          />
          <XDoubleInput>
            <XSingleSelect
              label="GENDER"
              options={genderOptions}
              name="gender"
              register={register}
              double={true}
            />
            <XSingleSelect
              label="ACCOUNT TYPE"
              options={accountTypeOptions}
              name="accountType"
              register={register}
              double={true}
            />
          </XDoubleInput>

          <XSingleInput
            label="PHONE NUMBER"
            validator={{ required: true }}
            register={register}
            name="mobileNumber"
            placeholder="Enter your phone number"
            type="tel"
          />
          <XSingleButton label="Register" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
