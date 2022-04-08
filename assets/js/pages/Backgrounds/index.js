import React from 'react';
import {
    PencilIcon,

} from '@heroicons/react/solid'
const files = [
    {
        name: 'Ontdek alles',
        size: '??',
        source:
            'https://api.deberber.nl/assets/img/ontdek-alles.svg',
        current: true,
    },
    {
        name: 'Boom schommel',
        size: '??',
        source:
            'https://api.deberber.nl/assets/img/boom-schommel.svg',
        current: false,
    },
    {
        name: 'Gedachten',
        size: '??',
        source:
            'https://api.deberber.nl/assets/img/gedachten.svg',
        current: false,
    },
    // More files...
]
const currentFile = {
    name: 'Ontdek alles',
    size: '??',
    source:
        'https://api.deberber.nl/assets/img/ontdek-alles.svg',
    information: {
        Created: 'June 8, 2020',
        'Last modified': 'June 8, 2020',
    },
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Backgrounds() {
    return (
        <>
            <div className="flex-1 flex items-stretch overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                    <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex">
                            <h1 className="flex-1 text-2xl font-bold text-gray-900">Achtergronden</h1>
                        </div>

                        {/* Gallery */}
                        <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                            <h2 id="gallery-heading" className="sr-only">
                                Recently viewed
                            </h2>
                            <ul
                                role="list"
                                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                            >
                                <li className="relative">
                                    <button
                                        type="button"
                                        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    >
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                                            />
                                        </svg>
                                        <span className="mt-2 block text-sm font-medium text-gray-900">Voeg een afbeelding toe</span>
                                    </button>
                                </li>
                                {files.map((file) => (
                                    <li key={file.name} className="relative">
                                        <div
                                            className={classNames(
                                                file.current
                                                    ? 'ring-2 ring-offset-2 ring-yellow-500'
                                                    : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-yellow-500',
                                                'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                                            )}
                                        >
                                            <img
                                                src={file.source}
                                                alt=""
                                                className={classNames(
                                                    file.current ? '' : 'group-hover:opacity-75',
                                                    'object-cover pointer-events-none'
                                                )}
                                            />
                                            <button type="button" className="absolute inset-0 focus:outline-none">
                                                <span className="sr-only">View details for {file.name}</span>
                                            </button>
                                        </div>
                                        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                            {file.name}
                                        </p>
                                        <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </main>

                {/* Details sidebar */}
                <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
                    <div className="pb-16 space-y-6">
                        <div>
                            <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                                <img src={currentFile.source} alt="" className="object-cover"/>
                            </div>
                            <div className="mt-4 flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        <span className="sr-only">Details for </span>
                                        {currentFile.name}
                                    </h2>
                                    <p className="text-sm font-medium text-gray-500">{currentFile.size}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Information</h3>
                            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                                {Object.keys(currentFile.information).map((key) => (
                                    <div key={key} className="py-3 flex justify-between text-sm font-medium">
                                        <dt className="text-gray-500">{key}</dt>
                                        <dd className="text-gray-900">{currentFile.information[key]}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Description</h3>
                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-sm text-gray-500 italic">Add a description to this image.</p>
                                <button
                                    type="button"
                                    className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <PencilIcon className="h-5 w-5" aria-hidden="true"/>
                                    <span className="sr-only">Add description</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                className="flex-1 bg-yellow-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Download
                            </button>
                            <button
                                type="button"
                                className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}