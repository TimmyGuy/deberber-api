import React, {useEffect, useState} from 'react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {Combobox} from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function BackgroundFinder({selectedBackground, setSelectedBackground}) {
    const [backgrounds, setBackgrounds] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (backgrounds.length === 0) {
            fetch('/api/backgrounds', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => setBackgrounds(data))
        }
    }, [backgrounds])

    const filteredBackgrounds =
        query === ''
            ? backgrounds
            : backgrounds.filter((background) => {
                return background.title.toLowerCase().includes(query.toLowerCase())
            })

    if (backgrounds.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Combobox as="div" value={selectedBackground} onChange={setSelectedBackground}>
                <Combobox.Label className="block text-sm font-medium text-gray-700">Achtergrond</Combobox.Label>
                <div className="relative mt-1">
                    <Combobox.Input
                        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 sm:text-sm"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(background) => background?.title || "Geen"}
                    />
                    <Combobox.Button
                        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </Combobox.Button>

                    {filteredBackgrounds.length > 0 && (
                        <Combobox.Options
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <Combobox.Option
                                value={null}
                                className={({active}) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                        active ? 'bg-yellow-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({active, selected}) => (
                                    <>
                                        <div className="flex items-center">
                                            <span
                                                className={classNames('ml-3 truncate', selected && 'font-semibold')}>Geen</span>
                                        </div>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active ? 'text-white' : 'text-yellow-600'
                                                )}
                                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                            {filteredBackgrounds.map((background) => (
                                <Combobox.Option
                                    key={background.id}
                                    value={background}
                                    className={({active}) =>
                                        classNames(
                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                            active ? 'bg-yellow-600 text-white' : 'text-gray-900'
                                        )
                                    }
                                >
                                    {({active, selected}) => (
                                        <>
                                            <div className="flex items-center">
                                                <img src={background.contentUrl} alt=""
                                                     className="h-6 w-6 flex-shrink-0 rounded-full"/>
                                                <span
                                                    className={classNames('ml-3 truncate', selected && 'font-semibold')}>{background.title}</span>
                                            </div>

                                            {selected && (
                                                <span
                                                    className={classNames(
                                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                                        active ? 'text-white' : 'text-yellow-600'
                                                    )}
                                                >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>
            <div>
                {selectedBackground &&
                    <img src={selectedBackground?.contentUrl} alt={selectedBackground?.title} className="mt-2"/>}
            </div>
        </>
    )
}
