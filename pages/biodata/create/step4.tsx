import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import Layout from '../../../components/Layout';
import { XDoubleInput, XSingleInput, XSingleSelect } from '../../../components/XInputFields';
import { updateFamilyInformation } from '../../../Store';
import { familyInformation } from '../../../data/Values/questions';
import { useRouter } from 'next/router';

const Page2 = () => {
  const { actions, state } = useStateMachine({ updateFamilyInformation });

  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: state.familyInformation,
  });

  const onNext = (data) => {
    actions.updateFamilyInformation(data);
    router.push('/biodata/create/step5');
    console.log(state);
  };
  const onPrevious = (data) => {
    actions.updateFamilyInformation(data);
    router.push('/biodata/create/step3');
  };

  return (
    <>
      <Layout>
        <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:max-w-3xl mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-8 text-gray-800">
              Create Your Biodata
            </div>

            <div className="text-lg my-4 font-semibold text-gray-800">Family Information</div>

            <XSingleSelect
              label={familyInformation.fatherAlive.label['en']}
              name="fatherAlive"
              register={register}
              validator={{ required: true }}
              options={familyInformation.fatherAlive.options}
            />
            <XSingleInput
              type="text"
              label={familyInformation.fatherOccupation.label['en']}
              name="fatherOccupation"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleSelect
              label={familyInformation.motherAlive.label['en']}
              name="motherAlive"
              register={register}
              validator={{ required: true }}
              options={familyInformation.motherAlive.options}
            />

            <XSingleInput
              type="text"
              label={familyInformation.motherOccupation.label['en']}
              name="motherOccupation"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="number"
              label={familyInformation.totalSisters.label['en']}
              name="totalSisters"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="number"
              label={familyInformation.totalBrothers.label['en']}
              name="totalBrothers"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={familyInformation.brothersStatus.label['en']}
              name="brothersStatus"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={familyInformation.sistersStatus.label['en']}
              name="sistersStatus"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={familyInformation.financialStatus.label['en']}
              name="financialStatus"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={familyInformation.socialStatus.label['en']}
              name="socialStatus"
              register={register}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={familyInformation.unclesStatus.label['en']}
              name="unclesStatus"
              register={register}
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
