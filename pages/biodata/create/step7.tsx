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
    actions.updateContactInformation(data);
    router.push('/biodata/create/step8');
    console.log(state);
  };
  const onPrevious = (data) => {
    actions.updateContactInformation(data);
    router.push('/biodata/create/step6');
  };

  return (
    <>
      <Layout>
        <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:max-w-3xl mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-8 text-gray-800">
              Create/Update Your Biodata
            </div>

            <div className="text-lg my-4 font-semibold text-gray-800">Extra Information</div>

            <XSingleInput
              type="tel"
              label={contactInformation.fatherMobile.label['en']}
              name="fatherMobile"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="tel"
              label={contactInformation.motherMobile.label['en']}
              name="motherMobile"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="tel"
              label={contactInformation.guardianMobile.label['en']}
              name="guardianMobile"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />

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
                {'Next >>'}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Page2;
