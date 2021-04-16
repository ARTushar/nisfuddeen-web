import { Listbox, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import { GlobeAltIcon } from '@heroicons/react/outline';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const lang = [{ name: 'en' }, { name: 'bn' }];

const Example = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(
    lang.find((i) => i.name === router.locale)
  );
  const [_, setCookie] = useCookies(['NEXT_LOCALE']);

  useEffect(() => {
    console.log(selected.name);
    setCookie('NEXT_LOCALE', selected.name);
    router.push(router.pathname, router.pathname, { locale: selected.name });
  }, [selected]);

  return (
    <div className=" w-full max-w-[5rem] ">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button
                className={`flex justify-around bg-gray-50 w-full py-2 pl-3 pr-3 text-right rounded-md shadow-sm ring-1 ring-gray-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-gray-600 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm`}
              >
                <span className="flex items-center pr-2">
                  <GlobeAltIcon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="block truncate">{selected.name}</span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-50 rounded-md shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {lang.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={` text-gray-900 cursor-pointer select-none relative py-2 pl-10 pr-4`}
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`$block truncate`}>
                            {person.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Example;
