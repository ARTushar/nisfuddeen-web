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
import { updatePersonalInformation } from '../../../Store';
import {
  commonPersonalInformation,
  maleMarriageInformation,
  femalePersonalInformation,
  malePersonalInformation,
} from '../../../data/Values/questions';
import { useRouter } from 'next/router';
import useAuth from '../../../hooks/useAuth';
// import { useAuth } from '../../../hooks/AuthProvider';

const Page2 = () => {
  const { actions, state } = useStateMachine({ updatePersonalInformation });
  const router = useRouter();
  const auth = useAuth();

  const { register, handleSubmit, control } = useForm({
    defaultValues: state.personalInformation,
  });

  const onNext = (data) => {
    actions.updatePersonalInformation(data);
    router.push('/biodata/create/step9');
    console.log(state);
  };
  const onPrevious = (data) => {
    actions.updatePersonalInformation(data);
    router.push('/biodata/create/step7');
  };

  return (
    <>
      <Layout>
        <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:max-w-3xl mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-8 text-gray-800">
              Create/Update Your Biodata
            </div>

            <div className="text-lg my-4 font-semibold text-gray-800">Personal Information</div>

            <XSingleSelect
              label={commonPersonalInformation.prayerTimes.label['en']}
              register={register}
              validator={{ required: true }}
              name="prayerTimes"
              options={commonPersonalInformation.prayerTimes.options}
            />
            <XSingleInput
              type="number"
              label={commonPersonalInformation.durationOfRegularPrayer.label['en']}
              name="durationOfRegularPrayer"
              register={register}
              validator={{ required: true }}
              placeholder="regular prayer duration"
            />
            <XSingleSelect
              label={commonPersonalInformation.mahramMaintain.label['en']}
              options={commonPersonalInformation.mahramMaintain.options}
              name="mahramMaintain"
              validator={{ required: true }}
              register={register}
            />
            <XSingleSelect
              label={commonPersonalInformation.majhab.label['en']}
              options={commonPersonalInformation.majhab.options}
              name="majhab"
              validator={{ required: true }}
              register={register}
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.politicalPhilosophy.label['en']}
              name="politicalPhilosophy"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleSelect
              label={commonPersonalInformation.watchDramaMovie.label['en']}
              options={commonPersonalInformation.watchDramaMovie.options}
              name="watchDramaMovie"
              validator={{ required: true }}
              register={register}
            />
            <XSingleSelect
              label={commonPersonalInformation.readSahihQuran.label['en']}
              options={commonPersonalInformation.readSahihQuran.options}
              name="readSahihQuran"
              validator={{ required: true }}
              register={register}
            />
            <XSingleSelect
              label={commonPersonalInformation.listenMusic.label['en']}
              options={commonPersonalInformation.listenMusic.options}
              name="listenMusic"
              validator={{ required: true }}
              register={register}
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.anyDisease.label['en']}
              name="anyDisease"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.deenMehnat.label['en']}
              name="deenMehnat"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.pirFollower.label['en']}
              name="pirFollower"
              register={register}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.mazarBelief.label['en']}
              name="mazarBelief"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.favoriteIslamicBooks.label['en']}
              name="favoriteIslamicBooks"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.favoriteScholars.label['en']}
              name="favoriteScholars"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.specialQualities.label['en']}
              name="specialQualities"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.badHabits.label['en']}
              name="badHabits"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleSelect
              label={commonPersonalInformation.personalityType.label['en']}
              options={commonPersonalInformation.personalityType.options}
              name="personalityType"
              validator={{ required: true }}
              register={register}
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.hobbies.label['en']}
              name="hobbies"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleInput
              type="text"
              label={commonPersonalInformation.futurePlan.label['en']}
              name="futurePlan"
              register={register}
              validator={{ required: true }}
              placeholder="write here"
            />
            <XSingleSelect
              label={commonPersonalInformation.guardian.label['en']}
              options={commonPersonalInformation.guardian.options}
              name="guardian"
              validator={{ required: true }}
              register={register}
            />

            {auth?.user?.gender === 'male' ? (
              <>
                <XSingleMultiSelect
                  label={malePersonalInformation.outfit.label['en']}
                  name="outfit"
                  options={malePersonalInformation.outfit.options}
                  validator={{ required: true }}
                  register={register}
                  control={control}
                />
                <XSingleSelect
                  label={malePersonalInformation.beardStyle.label['en']}
                  name="beardStyle"
                  options={malePersonalInformation.beardStyle.options}
                  validator={{ required: true }}
                  register={register}
                />

                <XSingleSelect
                  label={malePersonalInformation.pantPajamaAboveKnee.label['en']}
                  name="pantPajamaAboveKnee"
                  options={malePersonalInformation.pantPajamaAboveKnee.options}
                  register={register}
                />

                <XSingleSelect
                  label={malePersonalInformation.malePrayerTimesInJamah.label['en']}
                  name="malePrayerTimesInJamah"
                  options={malePersonalInformation.malePrayerTimesInJamah.options}
                  validator={{ required: true }}
                  register={register}
                />
              </>
            ) : (
              <>
                <XSingleMultiSelect
                  label={femalePersonalInformation.outfit.label['en']}
                  name="outfit"
                  options={femalePersonalInformation.outfit.options}
                  validator={{ required: true }}
                  register={register}
                  control={control}
                />
                <XSingleSelect
                  label={femalePersonalInformation.femalePrayerTimesInAwwal.label['en']}
                  name="femalePrayerTimesInAwwal"
                  options={femalePersonalInformation.femalePrayerTimesInAwwal.options}
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
