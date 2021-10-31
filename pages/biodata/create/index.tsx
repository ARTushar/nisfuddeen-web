import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { useAlert } from 'react-alert';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { updateBasicInfo } from '../../../Store';
import { useRouter } from 'next/router';

import {
  XDoubleInput,
  XSingleButton,
  XSingleInput,
  XSingleMultiSelect,
  XSingleSelect,
  // Option
} from '../../../components/XInputFields';
import { basicInformation } from '../../../data/Values/questions';
import router from 'next/router';

const CreateBiodataPage = () => {
  const auth = useAuth();
  const alert = useAlert();
  const router = useRouter();

  const { actions, state } = useStateMachine({ updateBasicInfo });

  const { register, handleSubmit } = useForm({
    defaultValues: state?.basicInfo,
  });

  const onSubmit = (data) => {
    // alert.show('Oh look, an alert!');
    // console.log('data', data);
    // const bd = new Date(data.birthDay);

    // const addresses = [1, 2, 3, 4].reduce((p, c) => {
    //   if (
    //     data[`type${c}`] &&
    //     data[`country${c}`] &&
    //     data[`district${c}`] &&
    //     data[`division${c}`] &&
    //     data[`postOffice${c}`]
    //   ) {
    //     p.push({
    //       type: data[`type${c}`],
    //       country: data[`country${c}`],
    //       district: data[`district${c}`],
    //       division: data[`division${c}`],
    //       postOffice: data[`postOffice${c}`],
    //     });
    //   }
    //   return p;
    // }, []);

    // if (addresses.length === 0) {
    //   alert.show('Address missing');
    //   return;
    // }

    // const processedData = {
    const basicInformation = {
      maritalStatus: data.maritalStatus,
      // birthDay: {
      //   year: bd.getFullYear(),
      //   month: bd.getMonth(),
      //   day: bd.getDate(),
      // },
      birthDay: data.birthDay,
      facialColor: data.facialColor,
      height: data.height,
      weight: data.weight,
      bloodGroup: data.bloodGroup,
      occupation: data.occupation.toLowerCase(),
    };
    //   addresses,
    // };

    console.log('processedData', basicInformation);
    actions.updateBasicInfo(basicInformation);
    router.push('/biodata/create/step2');
  };

  return (
    <>
      <Layout auth={auth.auth}>
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
        <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:max-w-3xl mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-8 text-gray-800">
              Create Your Biodata
            </div>

            <div className="text-lg my-4 font-semibold text-gray-800">Basic Info</div>

            <XSingleSelect
              label={basicInformation.maritalStatus.label['en']}
              name="maritalStatus"
              register={register}
              validator={{ required: true }}
              options={basicInformation.maritalStatus.options}
            />

            <XSingleInput
              type="date"
              label="birthDay"
              name="birthDay"
              register={register}
              validator={{ required: true }}
              placeholder=""
            />

            <XSingleSelect
              label={basicInformation.facialColor.label['en']}
              name="facialColor"
              register={register}
              validator={{ required: true }}
              options={basicInformation.facialColor.options}
            />
            <XSingleInput
              type="number"
              label="height"
              name="height"
              register={register}
              validator={{ required: true }}
              placeholder=""
            />
            <XSingleInput
              type="number"
              label="weight(KG)"
              name="weight"
              register={register}
              validator={{ required: true }}
              placeholder=""
            />
            <XSingleSelect
              label={basicInformation.bloodGroup.label['en']}
              name="bloodGroup"
              register={register}
              validator={{ required: true }}
              options={basicInformation.bloodGroup.options}
            />
            <XSingleInput
              type="text"
              label="occupation"
              name="occupation"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit(onSubmit)}
                className="border-2 py-2 px-4 text-lg font-semibold rounded-md text-gray-800 bg-gray-50"
              >
                {'Next >>'}
              </button>
            </div>
            {/* <XSingleButton label="Create Biodata" onClick={handleSubmit(onSubmit)} /> */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateBiodataPage;
