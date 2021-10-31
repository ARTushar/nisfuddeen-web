import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import Layout from '../../../components/Layout';
import { XDoubleInput, XSingleInput, XSingleSelect } from '../../../components/XInputFields';
import { updateExtraInformation } from '../../../Store';
import { extraInformation } from '../../../data/Values/questions';
import { useRouter } from 'next/router';

const Page2 = () => {
  const { actions, state } = useStateMachine({ updateExtraInformation });

  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: state.extraInformation,
  });

  const onNext = (data) => {
    actions.updateExtraInformation(data);
    router.push('/biodata/create/step6');
    console.log(state);
  };
  const onPrevious = (data) => {
    actions.updateExtraInformation(data);
    router.push('/biodata/create/step4');
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
              type="text"
              label={extraInformation.aboutMe.label['en']}
              name="aboutMe"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={extraInformation.aboutOccupation.label['en']}
              name="aboutOccupation"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleSelect
              label={extraInformation.guardianKnowsAboutSubmission.label['en']}
              name="guardianKnowsAboutSubmission"
              register={register}
              validator={{ required: true }}
              options={extraInformation.guardianKnowsAboutSubmission.options}
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
