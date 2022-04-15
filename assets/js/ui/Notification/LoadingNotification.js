/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment} from 'react'
import {Transition} from '@headlessui/react'
import {ClockIcon} from '@heroicons/react/outline'

export default function LoadingNotification({notification}) {

    return (
        <>
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
                show={true}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <ClockIcon className="h-6 w-6 text-yellow-400" aria-hidden="true"/>
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                <p className="mt-1 text-sm text-gray-500">{notification.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    )
}
