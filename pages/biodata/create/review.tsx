import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import Layout from '../../../components/Layout';
import { XDoubleInput, XSingleInput, XSingleSelect } from '../../../components/XInputFields';
import { updateContactInformation } from '../../../Store';
import { contactInformation } from '../../../data/Values/questions';
import { useRouter } from 'next/router';

const Page2 = () => {
  const { actions, state } = useStateMachine({ updateContactInformation });

  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: state.contactInformation,
  });

  const onNext = (data) => {
    console.log(state);
  };
  const onPrevious = (data) => {
    router.push('/biodata/create/step9');
  };

  return (
    <>
      <Layout>
        <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:max-w-3xl mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div>Review Your input</div>
            <pre>{JSON.stringify(state, null, 2)}</pre>

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleSubmit(onPrevious)}
                className="border-2 py-2 px-3 text-lg font-semibold rounded-md text-gray-800 bg-gray-50"
              >
                {'<< previous '}
              </button>
              <button
                onClick={handleSubmit(onNext)}
                className="border-2 py-2 px-3 text-lg font-semibold rounded-md text-gray-800 bg-gray-50"
              >
                {'Submit'}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Page2;
