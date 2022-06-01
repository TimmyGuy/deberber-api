import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Table} from "../../components/Table";

const headings = [
    {
        name: '#',
        field: 'id'
    },
    {
        name: 'Titel',
        field: 'name'
    },
    {
        name: 'Begin datum',
        field: 'startDate'
    },
    {
        name: 'Eind datum',
        field: 'endDate'
    },
]

export function Collection() {
    const [events, setEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!loaded) {
            fetch('/api/events', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setEvents(data);
                    setLoaded(true);
                });
            setLoaded(true);
        }
    })

    const deleteItem = (item) => {
        if(confirm("Weet je zeker dat je dit item wilt verwijderen?")) {
            fetch('/api/events/' + item.id, {
                method: "DELETE"
            }).then(r => {
                if(r.status === 404) {
                    alert("Er is iets fout gegaan!");
                } else {
                    setLoaded(false);
                }
            })
        }
    }

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Evenementen lijst</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Een lijst met alle evenementen.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                        to="/events/new"
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Voeg een evenement toe
                    </Link>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            {<Table items={events} onDelete={deleteItem} headings={headings} type="events" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}