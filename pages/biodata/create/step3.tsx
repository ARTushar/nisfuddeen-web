import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import Layout from '../../../components/Layout';
import { XDoubleInput, XSingleInput, XSingleSelect } from '../../../components/XInputFields';
import { updateEducationQualifications } from '../../../Store';
import { educationQualifications } from '../../../data/Values/questions';
import { useRouter } from 'next/router';

const Page2 = () => {
  const { actions, state } = useStateMachine({ updateEducationQualifications });
  const [education, setEducation] = useState(0);
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: state.educationQualifications,
  });

  useEffect(() => {
    if (
      state.educationQualifications?.education &&
      typeof state.educationQualifications?.education === 'number'
    ) {
      setEducation(state.educationQualifications?.education);
    }
  }, [state.educationQualifications?.education]);

  const onNext = (data) => {
    actions.updateEducationQualifications({ ...data, education });
    router.push('/biodata/create/step4');
    console.log(state);
  };
  const onPrevious = (data) => {
    actions.updateEducationQualifications({ ...data, education });
    router.push('/biodata/create/step2');
  };

  return (
    <>
      <Layout>
        <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:max-w-3xl mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-8 text-gray-800">
              Create Your Biodata
            </div>

            <div className="text-lg my-4 font-semibold text-gray-800">
              Educational Qualification
            </div>

            {[...Array(education + 1)].map((_, i) => {
              return (
                <div key={i}>
                  <div key={`add${i}`} className="text-sm mb-2 mt-8">
                    Qualification {i + 1}
                  </div>

                  <XDoubleInput>
                    <XSingleSelect
                      label={educationQualifications.degreeName.label['en']}
                      name={`degreeName${i}`}
                      validator={{ required: true }}
                      register={register}
                      options={educationQualifications.degreeName.options}
                      double={true}
                    />
                    <XSingleInput
                      label={educationQualifications.department.label['en']}
                      type="text"
                      name={`department${i}`}
                      validator={{ required: true }}
                      register={register}
                      placeholder="department"
                      double={true}
                    />
                  </XDoubleInput>
                  <XSingleInput
                    type="text"
                    label={educationQualifications.instituteName.label['en']}
                    name={`instituteName${i}`}
                    register={register}
                    placeholder="institute name"
                  />
                  <XDoubleInput>
                    <XSingleInput
                      type="number"
                      label={educationQualifications.passYear.label['en']}
                      validator={{ required: true }}
                      name={`passYear${i}`}
                      register={register}
                      placeholder="passYear"
                      double={true}
                    />
                    <XSingleInput
                      type="text"
                      label={educationQualifications.result.label['en']}
                      validator={{ required: true }}
                      name={`result${i}`}
                      register={register}
                      placeholder="result"
                      double={true}
                    />
                  </XDoubleInput>
                </div>
              );
            })}

            <div>
              <button
                hidden={education === 0}
                className="p-2 border-2 rounded-md my-2 mr-2"
                onClick={() => {
                  setEducation((e) => (e > 0 ? e - 1 : 0));
                }}
              >
                Delete Last
              </button>

              <button
                hidden={education >= 5}
                className="p-2 border-2 rounded-md"
                onClick={() => {
                  setEducation((e) => (e >= 5 ? e : e + 1));
                }}
              >
                Add more Qualification
              </button>
            </div>

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
