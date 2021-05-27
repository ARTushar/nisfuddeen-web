import React, { FC, useState } from 'react';
import Layout from '../components/Layout';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

const MultiSelect: FC<{ options: { value: string; label: string }[] }> = ({ options }) => {
  // const [selected, setSelected] = useState<string[]>([]);

  const { control, handleSubmit, register } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="iceCreamType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
              isMulti
              styles={{
                control: (styles) => ({ ...styles, borderRadius: '12px', padding: '6px' }),
              }}
            />
          )}
        />{' '}
        <br />
        <input type="text" name="tt" {...register('tt')} className="form-input border-2" />
        <input type="submit" />
      </form>
    </>
  );
};

const test = (props) => {
  const { register, handleSubmit } = useForm();

  const onsubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <MultiSelect
        options={['hello', 'one', 'two', 'three'].map((e) => ({ value: e, label: e }))}
      />
    </Layout>
  );
};

export default test;
