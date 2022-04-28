import React from 'react';
import Toggle from "./Toggle";
import {Link} from "react-router-dom";
import {ExternalLinkIcon, TrashIcon} from "@heroicons/react/outline";

export function TableWithCTA({items, toggle, type, onDelete}) {
    return <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
        <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Titel
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Slug
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Datum
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Gepubliceerd
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Bewerken</span>
            </th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
        {items.length > 0 ? items.map((item) => (
            <tr key={item.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {item.title}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <a href={"https://www.deberber.nl/"+(type === 'blog' ? 'blog/' : '')+item.slug} className="flex">
                        {item.slug}
                        <ExternalLinkIcon className="h-3 w-3 ml-1" />
                    </a>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.date}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <Toggle
                        checked={item.published}
                        onToggle={toggle}
                        item={item}
                    />
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link to={'/'+type+'/' + item.id} className="text-yellow-600 hover:text-yellow-900">
                        Bewerk<span className="sr-only">, {item.title}</span>
                    </Link>
                    <button onClick={() => onDelete(item)}><TrashIcon className="h-4 w-4 ml-1 text-red-400 hover:text-red-700" /></button>
                </td>
            </tr>
        )) : <SkeletonLoader />}
        </tbody>
    </table>;
}

function SkeletonLoader() {
    return (
        <tr>
            <td className="animate-pulse whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <div className="h-2 bg-slate-200 rounded"/>
            </td>
            <td className="animate-pulse whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="h-2 bg-slate-200 rounded"/>
            </td>
            <td className="animate-pulse whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="h-2 bg-slate-200 rounded"/>
            </td>
            <td className="animate-pulse whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="rounded-full bg-slate-200 h-5 w-10"/>
            </td>
            <td className="animate-pulse relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div className="h-2 bg-slate-200 rounded"/>
            </td>
        </tr>
    );
}