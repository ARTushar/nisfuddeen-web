import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { useAlert } from 'react-alert';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { updateBasicInfo } from '../../../Store';

import {
  XDoubleInput,
  XSingleButton,
  XSingleInput,
  XSingleMultiSelect,
  XSingleSelect,
  // Option
} from '../../../components/XInputFields';
import {
  MixAnswer,
  Majhab,
  NegativeAnswer,
  PositiveAnswer,
  PersonalityType,
  Guardian,
  BoyOutfit,
  GirlOutfit,
  BeardStyle,
  AfterMarriageStudyReply,
  MohoranaTimeReply,
  MarriageReply,
  MaritalStatus,
  FacialColor,
  BloodGroup,
  AddressType,
} from '../../../lib/dataAccessLayer/utils/aliases';

const prayerTimeOptions = [0, 1, 2, 3, 4, 5].map((e) => {
  return { value: e.toString(), label: e.toString() };
});

const genOptions = (options: { [key: string]: string }) => {
  return Object.keys(options).map((e) => ({ value: e, label: e }));
};

const MaritalStatusOptions = genOptions(MaritalStatus);
const FacialColorOptions = genOptions(FacialColor);
const BloodGroupOptions = genOptions(BloodGroup);
const AddressTypeOptions = genOptions(AddressType);

const MixAnswerOptions = genOptions(MixAnswer);
const NegativeAnswerOptions = Object.keys(NegativeAnswer).map((e) => ({ value: e, label: e }));
const PositiveAnswerOptions = Object.keys(PositiveAnswer).map((e) => ({ value: e, label: e }));
const MajhabOptions = Object.keys(Majhab).map((e) => ({ value: e, label: e }));
const PersonalityTypeOptions = Object.keys(PersonalityType).map((e) => ({ value: e, label: e }));
const GuardianOptions = Object.keys(Guardian).map((e) => ({ value: e, label: e }));
const BoyOutFitOptions = Object.keys(BoyOutfit).map((e) => ({ value: e, label: e }));
const GirlOutFitOptions = Object.keys(GirlOutfit).map((e) => ({ value: e, label: e }));
const BeardStyleOptions = Object.keys(BeardStyle).map((e) => ({ value: e, label: e }));
const MohranaTimeOptions = Object.keys(MohoranaTimeReply).map((e) => ({ value: e, label: e }));
const MarriageReplyOptions = Object.keys(MarriageReply).map((e) => ({ value: e, label: e }));
const AfterMarriageStudyOptions = Object.keys(AfterMarriageStudyReply).map((e) => ({
  value: e,
  label: e,
}));

const BooleanOptions = [
  { value: 'yes', label: 'yes' },
  { value: 'no', label: 'no' },
];

const CreateBiodataPage = () => {
  const auth = useAuth();
  const alert = useAlert();

  const { actions, state } = useStateMachine({ updateBasicInfo });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { state?.basicInfo },
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
    console.log(state);
  };

  return (
    <>
      <Layout auth={!auth.auth}>
        {JSON.stringify(state)}
        <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:max-w-3xl mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-8 text-gray-800">
              Create Your Biodata
            </div>

            <div className="text-lg my-4 font-semibold text-gray-800">Basic Info</div>
            <XSingleSelect
              label="maritalStatus"
              name="maritalStatus"
              register={register}
              validator={{ required: true }}
              options={MaritalStatusOptions}
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
              label="facialColor"
              name="facialColor"
              register={register}
              validator={{ required: true }}
              options={FacialColorOptions}
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
              label="bloodGroup"
              name="bloodGroup"
              register={register}
              validator={{ required: true }}
              options={BloodGroupOptions}
            />
            <XSingleInput
              type="text"
              label="occupation"
              name="occupation"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />

            {/* <div className="text-lg my-4 font-semibold text-gray-800">Addresses</div>
            {[1, 2, 3, 4].map((e) => {
              return (
                <>
                  <div key={`add${e}`} className="text-sm mb-2">
                    {' '}
                    Address {e}{' '}
                  </div>
                  <XDoubleInput>
                    <XSingleSelect
                      label="Address type"
                      name={`type${e}`}
                      register={register}
                      options={AddressTypeOptions}
                      double={true}
                    />
                    <XSingleInput
                      type="text"
                      label="country"
                      name={`country${e}`}
                      register={register}
                      placeholder="country"
                      double={true}
                    />
                  </XDoubleInput>
                  <XDoubleInput>
                    <XSingleInput
                      type="text"
                      label="division"
                      name={`division${e}`}
                      register={register}
                      placeholder="division"
                      double={true}
                    />
                    <XSingleInput
                      type="text"
                      label="district"
                      name={`district${e}`}
                      register={register}
                      placeholder="district"
                      double={true}
                    />
                  </XDoubleInput>
                  <XSingleInput
                    type="text"
                    label="postOffice"
                    name={`postOffice${e}`}
                    register={register}
                    placeholder="postOffice"
                  />
                </>
              );
            })} */}

            {/* <div className="text-lg my-4 font-semibold text-gray-800">Personal Info</div>

            <XSingleSelect
              label="How many times you pray everyday?"
              register={register}
              validator={{ required: true }}
              name="prayerTimes"
              options={prayerTimeOptions}
            />
            <XSingleInput
              type="number"
              label="Regular prayer duration"
              name="durationOfRegularPrayer"
              register={register}
              validator={{ required: true }}
              placeholder="regular prayer duration"
            />
            <XSingleSelect
              label="Do you maintain mahram?"
              options={MixAnswerOptions}
              name="mahramMaintain"
              validator={{ required: true }}
              register={register}
            />
            <XSingleSelect
              label="majhab"
              options={MajhabOptions}
              name="majhab"
              validator={{ required: true }}
              register={register}
            />
            <XSingleInput
              type="text"
              label="Political philosophy"
              name="politicalPhilosophy"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleSelect
              label="Do you watch drama or movie?"
              options={NegativeAnswerOptions}
              name="watchDramaMovie"
              validator={{ required: true }}
              register={register}
            />
            <XSingleSelect
              label="Do you read sahih Quran?"
              options={PositiveAnswerOptions}
              name="readSahihQuran"
              validator={{ required: true }}
              register={register}
            />
            <XSingleSelect
              label="Do you listen to music?"
              options={NegativeAnswerOptions}
              name="listenMusic"
              validator={{ required: true }}
              register={register}
            />
            <XSingleInput
              type="text"
              label="anyDisease"
              name="anyDisease"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label="deenMehnat"
              name="deenMehnat"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label="pirFollower"
              name="pirFollower"
              register={register}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label="mazarBelief"
              name="mazarBelief"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label="favoriteIslamicBooks"
              name="favoriteIslamicBooks"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label="favoriteScholars"
              name="favoriteScholars"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label="specialQualities"
              name="specialQualities"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label="badHabits"
              name="badHabits"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleSelect
              label="What is you personality type?"
              options={PersonalityTypeOptions}
              name="personalityType"
              validator={{ required: true }}
              register={register}
            />
            <XSingleInput
              type="text"
              label="hobbies"
              name="hobbies"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label="futurePlan"
              name="futurePlan"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleSelect
              label="guardian"
              options={GuardianOptions}
              name="guardian"
              validator={{ required: true }}
              register={register}
            /> */}

            {/* {auth?.user?.gender === 'male' ? (
              <>
                <XSingleMultiSelect
                  label="outfit"
                  name="outfit"
                  options={BoyOutFitOptions}
                  validator={{ required: true }}
                  register={register}
                  control={control}
                />
                <XSingleSelect
                  label="beardStyle"
                  name="beardStyle"
                  options={BeardStyleOptions}
                  validator={{ required: true }}
                  register={register}
                />

                <XSingleSelect
                  label="pantPajamaAboveKnee"
                  name="pantPajamaAboveKnee"
                  options={BooleanOptions}
                  register={register}
                />

                <XSingleSelect
                  label="malePrayerTimesInJamah"
                  name="malePrayerTimesInJamah"
                  options={prayerTimeOptions}
                  validator={{ required: true }}
                  register={register}
                />
              </>
            ) : (
              <>
                <XSingleMultiSelect
                  label="outfit"
                  name="outfit"
                  options={GirlOutFitOptions}
                  validator={{ required: true }}
                  register={register}
                  control={control}
                />
                <XSingleSelect
                  label="femalePrayerTimesInAwwal"
                  name="femalePrayerTimesInAwwal"
                  options={prayerTimeOptions}
                  validator={{ required: true }}
                  register={register}
                />
              </>
            )} */}

            {/* <div className="text-lg my-4 font-semibold text-gray-800">Marriage Info</div>

            {auth?.user?.gender === 'male' ? (
              <>
                <XSingleSelect
                  label="willManageWifePardah"
                  name="willManageWifePardah"
                  options={BooleanOptions}
                  validator={{ required: true }}
                  register={register}
                />
                <XSingleSelect
                  label="willAllowWifeStudy"
                  name="willAllowWifeStudy"
                  options={AfterMarriageStudyOptions}
                  validator={{ required: true }}
                  register={register}
                />
                <XSingleInput
                  type="text"
                  label="afterMarriageStay"
                  name="afterMarriageStay"
                  register={register}
                  validator={{ required: true }}
                  placeholder="write here"
                />
                <XSingleSelect
                  label="willAllowWifeStudy"
                  name="willAllowWifeStudy"
                  options={BooleanOptions}
                  validator={{ required: true }}
                  register={register}
                />
                <XDoubleInput>
                  <XSingleInput
                    type="number"
                    label="mohrana min"
                    name="maleMohoranaRangeMin"
                    register={register}
                    validator={{ required: true }}
                    double={true}
                    placeholder="0"
                  />
                  <XSingleInput
                    type="number"
                    label="max"
                    name="maleMohoranaRangeMax"
                    register={register}
                    validator={{ required: true }}
                    double={true}
                    placeholder="0"
                  />
                </XDoubleInput>
                <XSingleSelect
                  label="maleMohoranaPaidTime"
                  name="maleMohoranaPaidTime"
                  options={MohranaTimeOptions}
                  validator={{ required: true }}
                  register={register}
                />
              </>
            ) : (
              <>
                <XSingleSelect
                  label="jobAfterMarriage"
                  name="jobAfterMarriage"
                  options={MarriageReplyOptions}
                  validator={{ required: true }}
                  register={register}
                />
                <XSingleSelect
                  label="carryStudyAfterMarriage"
                  name="carryStudyAfterMarriage"
                  options={MarriageReplyOptions}
                  validator={{ required: true }}
                  register={register}
                />
                <XDoubleInput>
                  <XSingleInput
                    type="number"
                    label="mohrana min"
                    name="femaleMohoranaExpectationMax"
                    register={register}
                    validator={{ required: true }}
                    double={true}
                    placeholder="0"
                  />
                  <XSingleInput
                    type="number"
                    label="max"
                    name="femaleMohoranaExpectationMax"
                    register={register}
                    validator={{ required: true }}
                    double={true}
                    placeholder="0"
                  />
                </XDoubleInput>
                <XSingleSelect
                  label="femaleMohoranaExpectedPaidTime"
                  name="femaleMohoranaExpectedPaidTime"
                  options={MohranaTimeOptions}
                  validator={{ required: true }}
                  register={register}
                />
              </>
            )} */}

            <XSingleButton label="Create Biodata" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateBiodataPage;
