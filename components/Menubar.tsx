import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, MenuAlt2Icon } from '@heroicons/react/solid';
import {
  HomeIcon,
  LoginIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  NewspaperIcon,
} from '@heroicons/react/outline';

const items = [
  {
    title: 'Home',
    Icon: HomeIcon,
  },
  {
    title: 'Blog',
    Icon: NewspaperIcon,
  },
  {
    title: 'About',
    Icon: QuestionMarkCircleIcon,
  },
  {
    title: 'Profile',
    Icon: UserIcon,
  },
  {
    title: 'Login',
    Icon: LoginIcon,
  },
];

export default function Example() {
  return (
    <div className="sm:hidden">
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="inline-flex justify-center w-full py-2 text-sm font-medium text-black  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <MenuAlt2Icon
                  className="w-6 h-6 text-gray-800 hover:text-gray-700"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute left z-20  -0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-1 py-1 ">
                  {items.map((e) => (
                    <Menu.Item key={e.title}>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? ' text-gray-900 font-semibold'
                              : 'text-gray-700'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <e.Icon
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          ) : (
                            <e.Icon
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          )}
                          {e.title}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
