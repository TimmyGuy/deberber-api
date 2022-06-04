import React from 'react';

import {
    CheckIcon, ClockIcon, ThumbDownIcon,
    ThumbUpIcon,
} from '@heroicons/react/solid'

const eventTypes = {
    open: {icon: ClockIcon, bgColorClass: 'bg-gray-400'},
    pending: {icon: ThumbUpIcon, bgColorClass: 'bg-blue-500'},
    confirmed: {icon: CheckIcon, bgColorClass: 'bg-green-500'},
    failed: {icon: ThumbDownIcon, bgColorClass: 'bg-red-500'},
}

const steps = [
    'open', 'pending', 'confirmed'
]

const reservation = {
    id: 1,
    user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 555-5555',
    },
    event: {
        name: 'Groningse Grachten',
    },
    startDate: '2020-09-20',
    endDate: '2020-09-22',
    status: 'pending',
    adults: 2,
    children: 1,
    price: 80.50,
    tents: 1,
    message: 'Het lijkt ons super leuk om een weekende met je te maken!',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function View() {
    return (
        <main className="py-10">
            {/* Page header */}
            <div
                className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                <div className="flex items-center space-x-5">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{reservation.user.name}</h1>
                        <p className="text-sm font-medium text-gray-500">
                            Wil reserververen voor{' '}
                            <a href="#" className="text-gray-900">
                                {reservation.event.name}
                            </a>{' '}
                            op {reservation.startDate} tot {reservation.endDate}
                        </p>
                    </div>
                </div>
                <div
                    className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-500"
                    >
                        Weigeren
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-500"
                    >
                        Accepteren
                    </button>
                </div>
            </div>

            <div
                className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                    {/* Description list*/}
                    <section aria-labelledby="applicant-information-title">
                        <div className="bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h2 id="applicant-information-title"
                                    className="text-lg leading-6 font-medium text-gray-900">
                                    Reservering informatie
                                </h2>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Persoonlijke gegevens en
                                    reserveringsdetails.</p>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Reservering voor</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{reservation.event.name}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{reservation.user.email}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Datum</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{reservation.startDate} tot {reservation.endDate}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Telefoonnummer</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{reservation.user.phone}</dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Bericht</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {reservation.message}
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <table className="min-w-full divide-y divide-gray-300">
                                                <thead className="bg-gray-50">
                                                <tr className="divide-x divide-gray-200">
                                                    <th scope="col"
                                                        className="py-1.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Type
                                                    </th>
                                                    <th scope="col"
                                                        className="px-4 py-1.5 text-left text-sm font-semibold text-gray-900">
                                                        Aantal
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                <tr className="divide-x divide-gray-200">
                                                    <td className="whitespace-nowrap py-2 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                        Volwassenen
                                                    </td>
                                                    <td className="whitespace-nowrap p-2 text-sm text-gray-500">{reservation.adults}</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-200">
                                                    <td className="whitespace-nowrap py-2 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                        Kinderen
                                                    </td>
                                                    <td className="whitespace-nowrap p-2 text-sm text-gray-500">{reservation.children}</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-200">
                                                    <td className="whitespace-nowrap py-2 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                        Tenten
                                                    </td>
                                                    <td className="whitespace-nowrap p-2 text-sm text-gray-500">{reservation.tents}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            {/*<div>*/}
                            {/*    <a*/}
                            {/*        href="#"*/}
                            {/*        className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"*/}
                            {/*    >*/}
                            {/*        Read full application*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                        </div>
                    </section>
                </div>

                <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                            Timeline
                        </h2>

                        {/* Activity Feed */}
                        <div className="mt-6 flow-root">
                            <TimelineOverview status={reservation.status}/>
                        </div>
                        {reservation.status !== 'confirmed' && <div className="mt-6 flex flex-col justify-stretch">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Accepteren
                            </button>
                        </div>}
                    </div>
                </section>
            </div>
        </main>
    )

    function TimelineOverview({status}) {
        const index = steps.indexOf(status);
        const timeline = [
            {
                id: 1,
                type: getType(0, index),
                content: 'Actie uitgevoerd',
                target: 'Aanvraag geaccepteerd',
            },
            {
                id: 2,
                type: getType(1, index),
                content: 'Mail verzonden',
                target: 'Wachten op betaling',
            },
            {
                id: 3,
                type: getType(2, index),
                content: 'Actie uitgevoerd',
                target: 'Betaald',
            }
        ]

        return (
            <ul role="list" className="-mb-8">
                {timeline.map(item => (
                    <li key={item.id}>
                        <div className="relative pb-8">
                            <div className="relative flex space-x-3">
                                <div>
                              <span
                                  className={classNames(
                                      item.type.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                  )}
                              >
                                <item.type.icon className="w-5 h-5 text-white" aria-hidden="true"/>
                              </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {item.content}{' '}
                                            <a className="font-medium text-gray-900">
                                                {item.target}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )

        function getType(index, currentIndex) {
            if (currentIndex === steps.indexOf('failed')) {
                return eventTypes.failed;
            }
            if (index < currentIndex || currentIndex === steps.indexOf('confirmed')) {
                return eventTypes.confirmed;
            }
            if (index === currentIndex) {
                return eventTypes.pending;
            }

            return eventTypes.open;
        }
    }
}