import React from 'react';

export default function CondensedTable({headers, values, actions}) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    {headers.map((header, idx) => (
                                        <th
                                            key={idx}
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            {header.name}
                                        </th>
                                    ))}
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Acties
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {values.map((value, idx) => (
                                    <tr key={idx}>
                                        {headers.map((header, idx) => (
                                            <td
                                                key={idx}
                                                className="px-2 py-3.5"
                                            >
                                                {value[header.field]}
                                            </td>
                                        ))}
                                        <td className="px-2 py-3.5">
                                            {showEdit(values[idx])}
                                            {showDelete(values[idx])}
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

    function showEdit(activity) {
        if (actions.edit) {
            return (
                <a href={actions.edit.url + activity.id} className="text-yellow-600 hover:text-yellow-900">
                    Bewerken
                </a>
            )
        }
    }

    function showDelete(activity) {
        if (actions.delete.url) {
            return (
                <a href={actions.delete.url + activity.id} className="text-red-600 hover:text-red-900">
                    Verwijder
                </a>
            )
        }
        if (actions.delete.onClick) {
            return (
                <button onClick={() => actions.delete.onClick(activity)} className="text-red-600 hover:text-red-900">
                    Verwijder
                </button>
            )
        }
    }
}

