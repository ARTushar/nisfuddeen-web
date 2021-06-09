import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import Layout from '../../../components/Layout';
import {
  XDoubleInput,
  XSingleInput,
  XSingleSelect,
  XSingleMultiSelect,
} from '../../../components/XInputFields';
import { updatePartnerQualities } from '../../../Store';
import { partnerQualities } from '../../../data/Values/questions';
import { useRouter } from 'next/router';

const Page2 = () => {
  const { actions, state } = useStateMachine({ updatePartnerQualities });

  const router = useRouter();

  const { register, handleSubmit, control } = useForm({
    defaultValues: state.partnerQualities,
  });

  const onNext = (data) => {
    actions.updatePartnerQualities(data);
    router.push('/biodata/create/step7');
    console.log(state);
  };
  const onPrevious = (data) => {
    actions.updatePartnerQualities(data);
    router.push('/biodata/create/step5');
  };

  return (
    <>
      <Layout>
        <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:max-w-3xl mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-8 text-gray-800">
              Create/Update Your Biodata
            </div>

            <div className="text-lg my-4 font-semibold text-gray-800">partnerQualities</div>

            <XDoubleInput>
              <XSingleInput
                type="number"
                label={partnerQualities.ageMin.label['en']}
                name="ageMin"
                register={register}
                validator={{ required: true }}
                placeholder="write here"
                double={true}
              />
              <XSingleInput
                type="number"
                label={partnerQualities.ageMax.label['en']}
                name="ageMax"
                register={register}
                validator={{ required: true }}
                placeholder="write here"
                double={true}
              />
            </XDoubleInput>

            <XSingleSelect
              label={partnerQualities.facialComplexion.label['en']}
              name="facialComplexion"
              register={register}
              validator={{ required: true }}
              options={partnerQualities.facialComplexion.options}
            />

            <XDoubleInput>
              <XSingleInput
                type="number"
                label={partnerQualities.heightMin.label['en']}
                name="heightMin"
                register={register}
                validator={{ required: true }}
                placeholder="write here"
                double={true}
              />
              <XSingleInput
                type="number"
                label={partnerQualities.heightMax.label['en']}
                name="heightMax"
                register={register}
                validator={{ required: true }}
                placeholder="write here"
                double={true}
              />
            </XDoubleInput>

            <XSingleSelect
              label={partnerQualities.minimumEducationDegree.label['en']}
              name="minimumEducationDegree"
              register={register}
              validator={{ required: true }}
              options={partnerQualities.minimumEducationDegree.options}
            />

            <XSingleInput
              type="text"
              label={partnerQualities.country.label['en']}
              name="country"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />

            <XSingleInput
              type="text"
              label={partnerQualities.district.label['en']}
              name="district"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleSelect
              label={partnerQualities.maritalStatus.label['en']}
              name="maritalStatus"
              register={register}
              validator={{ required: true }}
              options={partnerQualities.maritalStatus.options}
            />
            <XSingleInput
              type="text"
              label={partnerQualities.occupation.label['en']}
              name="occupation"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleMultiSelect
              label={partnerQualities.financialStatus.label['en']}
              name="financialStatus"
              register={register}
              validator={{ required: true }}
              control={control}
              options={partnerQualities.financialStatus.options}
            />
            <XSingleInput
              type="text"
              label={partnerQualities.desiredQualities.label['en']}
              name="desiredQualities"
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
