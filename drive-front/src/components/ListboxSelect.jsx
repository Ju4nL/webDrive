import React from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ListboxSelect = ({ label, options, selected, setSelected, renderOption, width = 'full' }) => {
  return (
    <div className={`relative   w-${width}`}>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            {label && <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>}
            <div className="relative ">
              <Listbox.Button className="relative w-full cursor-default rounded-[15px] bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-1 focus:ring-green-600 sm:text-sm dark:bg-gray-900">
                <span className="flex items-center">
                  {renderOption(selected)} 
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-[15px] bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-900">
                {options.map((option, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-green-600' : 'text-gray-900 dark:text-white',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {renderOption(option)} 
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-green-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default ListboxSelect;