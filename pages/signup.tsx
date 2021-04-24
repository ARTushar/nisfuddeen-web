import React, { useMemo } from 'react';
import Layout from '../components/Layout';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { XSingleButton, XSingleInput, XSingleSelect } from '../components/XInputFields';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const SignUpPage = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Layout>
        <div className="flex flex-col justify-center h-full top-0 w-full md:w-[420px] mb-8 md:mb-0">
          <div className="md:p-8 bg-white  rounded-xl md:shadow-my">
            <div className="font-extrabold text-3xl antialiased mb-1.5">SignUp</div>
            <div className=" text-[#717171] mb-1.5">Find you partner now</div>
            <div className="mb-4">data</div>

            <XSingleInput label="DISTRICT" register={register} name="data1" placeholder="Dhaka" />
            <XSingleInput label="test" register={register} name="data2" placeholder="My test" />
            <XSingleSelect label="GENDER" register={register} name="gender" options={options} />
            <XSingleButton label="Signup" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SignUpPage;
