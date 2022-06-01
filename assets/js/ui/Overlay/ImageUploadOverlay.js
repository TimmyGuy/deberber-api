/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {PhotographIcon} from '@heroicons/react/outline'
import {useNotificationContext, ADD} from "../../contexts/NotificationContext";

export default function ImageUploadOverlay({title, setShowOverlay, url, setLoading}) {

    const {dispatch} = useNotificationContext();
    const cancelButtonRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('file', e.target[1].files[0]);
        data.append('title', e.target[0].value);

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data,
        })
            .then(res => res.json())
            .then(data => {
                dispatch({type: ADD, payload: {type: 'success', title: 'Upload gelukt', description: 'Afbeelding succesvol geüpload'}});
                setLoading(true)
                setShowOverlay(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef}
                    onClose={setShowOverlay}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div
                                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <PhotographIcon className="h-6 w-6 text-yellow-600" aria-hidden="true"/>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="text-sm text-gray-500">
                                            <form id="form" onSubmit={handleSubmit}>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="col-span-1">
                                                        <label htmlFor="title"
                                                               className="block text-sm font-medium text-gray-700">
                                                            Titel
                                                        </label>
                                                        <input
                                                            id="title"
                                                            className="mt-1 block w-full px-3 py-2 rounded-md text-base leading-6 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                            placeholder="Titel"
                                                            type="text"
                                                        />
                                                    </div>
                                                    <div className="col-span-1">
                                                        <label htmlFor="file"
                                                               className="block text-sm font-medium text-gray-700">
                                                            Bestand
                                                        </label>
                                                        <input
                                                            id="file"
                                                            className="mt-1 block w-full px-3 py-2 rounded-md text-base leading-6 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                            placeholder="Bestand"
                                                            type="file"
                                                            accept="image/*"
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    form="form"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Opslaan
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        setShowOverlay(false)
                                    }}
                                    ref={cancelButtonRef}
                                >
                                    Annuleren
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
