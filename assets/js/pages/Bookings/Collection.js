import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {getFromApi} from "../Events/EventFunctions";

const reservations = [
    {
        id: 1,
        user: {
            name: 'John Doe',
            email: 'john.doe@gmail.com'
        },
        price: 80.50,
        startDate: '2019-01-01',
        endDate: '2019-01-02',
        status: 'pending'
    }
];

export function Collection() {
    const [reservations, setReservations] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if(loading) {
            getFromApi('/api/reservations')
                .then(data => {
                    setReservations(data);
                    setLoading(false);
                })
        }
    })

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Reserveringen</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Alle reserveringen
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        RID
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        E-mail
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Naam
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Prijs
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Datum
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Status
                                    </th>
                                    <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {reservations.map((reservation) => (
                                    <tr key={reservation.id}>
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                            {reservation.id}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                            {reservation.user.email}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{reservation.user.fullName}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">€ {reservation.price}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{reservation.startDate.split('T')[0]} tot {reservation.endDate.split('T')[0]}</td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500"><StatusBadge status={reservation.status} /></td>
                                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <Link to={"/booking/" + reservation.id} className="text-indigo-600 hover:text-indigo-900">
                                                Bekijk<span className="sr-only">, {reservation.id}</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function StatusBadge({status}) {
        let classList;
        switch (status) {
            case 'pending':
                classList = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
                break;
            case 'failed':
                classList = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
                break;
            case 'paid':
                classList = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
                break;
            default:
                classList = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800';
        }
        return (
            <span className={classList}>{status}</span>
        )
    }
}