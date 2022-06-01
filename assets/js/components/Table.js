import React from 'react';
import Toggle from "./Toggle";
import {Link} from "react-router-dom";
import {ExternalLinkIcon, TrashIcon} from "@heroicons/react/outline";

export function Table({items, onDelete, headings, type}) {
    return <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
        <tr>
            {headings.map((heading, idx) => (
                <th key={idx} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {heading.name}
                </th>
                ))}
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Acties</span>
            </th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
        {items.length > 0 ? items.map((value, idx) => (
            <tr key={idx}>
                {headings.map((header, idx) => (
                    <td
                        key={idx}
                        className="px-2 py-3.5"
                    >
                        {value[header.field]}
                    </td>
                ))}
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link to={'/'+type+'/' + value.id} className="text-yellow-600 hover:text-yellow-900">
                        Bewerk<span className="sr-only">, {value.title}</span>
                    </Link>
                    <button onClick={() => onDelete(value)}><TrashIcon className="h-4 w-4 ml-1 text-red-400 hover:text-red-700" /></button>
                </td>
            </tr>
        )) : <SkeletonLoader list={headings} />}
        </tbody>
    </table>;
}

function SkeletonLoader({list}) {
    return (
        <tr>
            {list.map((t, idx) => (
                <td key={idx} className="animate-pulse whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="h-2 bg-slate-200 rounded"/>
                </td>
            ))}
            <td className="animate-pulse relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div className="h-2 bg-slate-200 rounded"/>
            </td>
        </tr>
    );
}