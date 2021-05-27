import React, { FC } from 'react';

interface BiodataCardProps {
  gender: 'male' | 'female';
  id: string;
  status: 'married' | 'unmarried';
  birthyear: string | number;
  occupation: string;
}

const CardSection = (key: string, value: string | number) => {
  return (
    <div>
      <div className="text-base font-semibold text-gray-800">{key}</div>
      <div className="text-sm text-gray-700 mb-2">{value}</div>
    </div>
  );
};

const BiodataCard: FC<BiodataCardProps> = (props) => {
  return (
    <div className="inline-block w-full sm:max-w-xs border-gray-500 p-4 border-2 rounded-lg">
      {/* {CardSection('Gender', props.gender)} */}
      {CardSection('Marital Status', props.status)}
      {CardSection('Occupation', props.occupation)}
      {CardSection('Birth year', props.birthyear)}
    </div>
  );
};

export default BiodataCard;
