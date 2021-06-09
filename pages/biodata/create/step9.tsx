import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import Layout from '../../../components/Layout';
import { XDoubleInput, XSingleInput, XSingleSelect } from '../../../components/XInputFields';
import { updateMarriageInformation } from '../../../Store';
import {
  commonMarriageInformation,
  maleMarriageInformation,
  femaleMarriageInformation,
} from '../../../data/Values/questions';
import { useRouter } from 'next/router';
import useAuth from '../../../hooks/useAuth';

const Page2 = () => {
  const { actions, state } = useStateMachine({ updateMarriageInformation });

  const router = useRouter();
  const auth = useAuth();

  const { register, handleSubmit } = useForm({
    defaultValues: state.marriageInformation,
  });

  const onNext = (data) => {
    actions.updateMarriageInformation(data);
    router.push('/biodata/create/review');
    console.log(state);
  };
  const onPrevious = (data) => {
    actions.updateMarriageInformation(data);
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

            <div className="text-lg my-4 font-semibold text-gray-800">Marriage Information</div>

            <XSingleSelect
              label={commonMarriageInformation.guardianAgreed.label['en']}
              name="guardianAgreed"
              options={commonMarriageInformation.guardianAgreed.options}
              validator={{ required: true }}
              register={register}
            />
            <XSingleInput
              type="text"
              label={commonMarriageInformation.reasonOfMarriage.label['en']}
              name="reasonOfMarriage"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={commonMarriageInformation.ideaAboutMarriage.label['en']}
              name="ideaAboutMarriage"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />

            {auth?.user?.gender === 'male' ? (
              <>
                <XSingleSelect
                  label={maleMarriageInformation.willManageWifePardah.label['en']}
                  name="willManageWifePardah"
                  options={maleMarriageInformation.willManageWifePardah.options}
                  validator={{ required: true }}
                  register={register}
                />
                <XSingleSelect
                  label={maleMarriageInformation.willAllowWifeStudy.label['en']}
                  name="willAllowWifeStudy"
                  options={maleMarriageInformation.willAllowWifeStudy.options}
                  validator={{ required: true }}
                  register={register}
                />
                <XSingleInput
                  type="text"
                  label={maleMarriageInformation.afterMarriageStay.label['en']}
                  name="afterMarriageStay"
                  register={register}
                  validator={{ required: true }}
                  placeholder="write here"
                />
                <XSingleSelect
                  label={maleMarriageInformation.willAllowWifeStudy.label['en']}
                  name="willAllowWifeStudy"
                  options={maleMarriageInformation.willAllowWifeStudy.options}
                  validator={{ required: true }}
                  register={register}
                />
                <XDoubleInput>
                  <XSingleInput
                    type="number"
                    label={maleMarriageInformation.maleMohoranaRangeMin.label['en']}
                    name="maleMohoranaRangeMin"
                    register={register}
                    validator={{ required: true }}
                    double={true}
                    placeholder="0"
                  />
                  <XSingleInput
                    type="number"
                    label={maleMarriageInformation.maleMohoranaRangeMax.label['en']}
                    name="maleMohoranaRangeMax"
                    register={register}
                    validator={{ required: true }}
                    double={true}
                    placeholder="0"
                  />
                </XDoubleInput>
                <XSingleSelect
                  label={maleMarriageInformation.maleMohoranaPaidTime.label['en']}
                  name="maleMohoranaPaidTime"
                  options={maleMarriageInformation.maleMohoranaPaidTime.options}
                  validator={{ required: true }}
                  register={register}
                />
              </>
            ) : (
              <>
                <XSingleSelect
                  label={femaleMarriageInformation.jobAfterMarriage.label['en']}
                  name="jobAfterMarriage"
                  options={femaleMarriageInformation.jobAfterMarriage.options}
                  validator={{ required: true }}
                  register={register}
                />
                <XSingleSelect
                  label={femaleMarriageInformation.carryStudyAfterMarriage.label['en']}
                  name="carryStudyAfterMarriage"
                  options={femaleMarriageInformation.carryStudyAfterMarriage.options}
                  validator={{ required: true }}
                  register={register}
                />
                <XDoubleInput>
                  <XSingleInput
                    type="number"
                    label={femaleMarriageInformation.femaleMohoranaExpectationMax.label['en']}
                    name="femaleMohoranaExpectationMax"
                    register={register}
                    validator={{ required: true }}
                    double={true}
                    placeholder="0"
                  />
                  <XSingleInput
                    type="number"
                    label={femaleMarriageInformation.femaleMohoranaExpectationMax.label['en']}
                    name="femaleMohoranaExpectationMax"
                    register={register}
                    validator={{ required: true }}
                    double={true}
                    placeholder="0"
                  />
                </XDoubleInput>
                <XSingleSelect
                  label={femaleMarriageInformation.femaleMohoranaExpectedPaidTime.label['en']}
                  name="femaleMohoranaExpectedPaidTime"
                  options={femaleMarriageInformation.femaleMohoranaExpectedPaidTime.options}
                  validator={{ required: true }}
                  register={register}
                />
              </>
            )}

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
