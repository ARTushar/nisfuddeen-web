import { ComponentProps, FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface XSingleBaseProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
}

interface XSingleInputProps extends XSingleBaseProps {
  placeholder?: string;
  type?: string;
}

type Option = {
  value: string;
  label: string;
};

interface XSigleSelectProps extends XSingleBaseProps {
  options: Option[];
}

interface XSingleButtonProps {
  label: string;
  icon?: (props: ComponentProps<'svg'>) => JSX.Element;
  onClick: () => void;
}

export const XSingleInput: FC<XSingleInputProps> = (props) => {
  return (
    <div className="relative">
      <label htmlFor={props.name} className="absolute px-3 text-xs font-semibold pt-3 leading-3">
        {props.label}
      </label>
      <input
        {...props.register(props.name)}
        type={props.type ? props.type : 'text'}
        className="mb-4 shadow-my1 focus:shadow-my2 border-gray-200 rounded-lg focus:outline-none  w-full px-3 pb-2 pt-6"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export const XSingleSelect: FC<XSigleSelectProps> = (props) => {
  return (
    <div className="relative">
      <label htmlFor={props.label} className="absolute px-3 text-xs font-semibold pt-3 leading-3">
        {props.label}
      </label>
      <select
        {...props.register(props.name)}
        className="bg-white mb-4 shadow-my1 focus:shadow-my2 border-gray-200 rounded-lg focus:outline-none  w-full px-3 pb-2 pt-6"
      >
        {props.options.map((e) => (
          <option value={e.value} key={e.value}>
            {e.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const XSingleButton: FC<XSingleButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="flex w-full justify-center items-center p-3 rounded-lg text-white font-semibold"
      style={{
        backgroundImage: `linear-gradient(to right, #ad5389, #3c1053)`,
      }}
    >
      {props.icon && <props.icon className="w-5 h-5 mr-1" />}
      {props.label}
    </button>
  );
};
