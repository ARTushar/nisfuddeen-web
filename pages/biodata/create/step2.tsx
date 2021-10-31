import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import Layout from '../../../components/Layout';
import { XDoubleInput, XSingleInput, XSingleSelect } from '../../../components/XInputFields';
import { updateAddressInfo } from '../../../Store';
import { addressInformation } from '../../../data/Values/questions';
import { useRouter } from 'next/router';

const Page2 = () => {
  const { actions, state } = useStateMachine({ updateAddressInfo });
  const [address, setAddress] = useState(0);
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: state.addresses,
  });

  useEffect(() => {
    if (state.addresses?.address && typeof state.addresses.address === 'number') {
      setAddress(state.addresses.address);
    }
  }, [state.addresses?.address]);

  const onNext = (data) => {
    actions.updateAddressInfo({ ...data, address });
    router.push('/biodata/create/step3');
  };
  const onPrevious = (data) => {
    actions.updateAddressInfo({ ...data, address });
    router.push('/biodata/create');
  };

  return (
    <>
      <Layout>
        <div className="flex mx-auto mt-8 md:mt-10 flex-col justify-center md:max-w-3xl mb-8 md:mb-0">
          <div className="md:p-8 rounded-lg">
            <div className="font-extrabold text-2xl antialiased mb-8 text-gray-800">
              Create Your Biodata
            </div>

            <div className="text-lg my-4 font-semibold text-gray-800">Address Information</div>

            {[...Array(address + 1)].map((_, i) => {
              return (
                <div key={i}>
                  <div key={`add${i}`} className="text-sm mb-2 mt-8">
                    Address {i + 1}
                  </div>

                  <XDoubleInput>
                    <XSingleSelect
                      label={addressInformation.type.label['en']}
                      name={`type${i}`}
                      register={register}
                      validator={{ required: true }}
                      options={addressInformation.type.options}
                      double={true}
                    />
                    <XSingleInput
                      label={addressInformation.country.label['en']}
                      type="text"
                      name={`country${i}`}
                      validator={{ required: true }}
                      register={register}
                      placeholder="country"
                      double={true}
                    />
                  </XDoubleInput>
                  <XDoubleInput>
                    <XSingleInput
                      type="text"
                      label={addressInformation.division.label['en']}
                      validator={{ required: true }}
                      name={`division${i}`}
                      register={register}
                      placeholder="division"
                      double={true}
                    />
                    <XSingleInput
                      type="text"
                      label={addressInformation.district.label['en']}
                      validator={{ required: true }}
                      name={`district${i}`}
                      register={register}
                      placeholder="district"
                      double={true}
                    />
                  </XDoubleInput>
                  <XSingleInput
                    type="text"
                    label={addressInformation.postOffice.label['en']}
                    name={`postOffice${i}`}
                    register={register}
                    placeholder="post office"
                  />
                </div>
              );
            })}

            <div>
              <button
                hidden={address === 0}
                className="p-2 border-2 rounded-md my-2 mr-2"
                onClick={() => {
                  setAddress((e) => (e > 0 ? e - 1 : 0));
                }}
              >
                Delete Last
              </button>

              <button
                hidden={address >= 3}
                className="p-2 border-2 rounded-md"
                onClick={() => {
                  setAddress((e) => (e >= 3 ? e : e + 1));
                }}
              >
                Add more Address
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
