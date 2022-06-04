import React, {useEffect, useState} from 'react';
import CondensedTable from "../../components/CondensedTable";
import ActivityField from "../../components/ActivityField";
import {headers, createActivity, updateEvent, getFromApi} from "./EventFunctions";
import {useParams} from "react-router-dom";
import {ADD, useNotificationContext} from "../../contexts/NotificationContext";


export function Edit() {
    let params = useParams();
    const {dispatch} = useNotificationContext();
    const [values, setValues] = useState({events: []});
    const [loading, setLoading] = useState(true);

    const deleteAction = (deletableAction) => {
        setValues({...values, events: values.events.filter(event => event !== deletableAction)});
    }
    const addAction = (event) => {
        setValues({...values, events: [...values.events, event]});
    }
    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }
    const actions = {
        delete: {
            onClick: deleteAction
        }
    }
    const onSubmit = (e) => {
        let event = {};
        e.preventDefault();
        // Submit to server
        if (values.name && values.description && values.price) {
            let activities = [];
            values.events.forEach(activity => {
                if(activity.id) {
                    activities.push('\/api\/activities\/' + activity.id);
                }
            })

            event = updateEvent({
                id: values.id,
                name: values.name,
                description: values.description,
                price: parseInt(values.price),
                startDate: values.startDate,
                endDate: values.endDate,
                tents: parseInt(values.tents)
            });
            event.then(event => {
                values.events.forEach(activity => {
                    if(!activity.id) {
                        createActivity(activity, event);
                    }
                })
            })
                .then(() => dispatch({type: ADD,
                    payload: {
                        title: 'Evenement is bijgewerkt',
                        description: 'Je evenement is succesvol bijgewerkt.',
                        type: 'success'
                    }
                }));
        }
    }

    useEffect(() => {
        if (loading) {
            fetch('/api/events/' + params.id)
                .then(res => {
                    if(res.ok) {
                        res.json()
                            .then(data => {
                                setValues({
                                    id: data.id,
                                    name: data.name,
                                    description: data.description,
                                    price: data.price,
                                    startDate: data.startDate.substring(0, data.startDate.indexOf('+')),
                                    endDate: data.endDate.substring(0, data.endDate.indexOf('+')),
                                    events: [],
                                    tents: data.tents
                                });
                                data.activities.forEach(event => {
                                    getFromApi(event)
                                        .then(activity => {
                                            setValues(values => ({...values, events: [...values.events, activity]}));
                                        })
                                })
                            })
                            .then(() => setLoading(false));
                    }
                })
        }
    })

    return (
        <form className="space-y-8 divide-y divide-gray-200 max-w-8xl" onSubmit={onSubmit}>
            <div className="md:flex">
                <div className="space-y-8 divide-y divide-gray-200 w-full md:w-4/6">
                    <div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Evenement bijwerken</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Update een evenement aan waar mensen zich kunnen aanmelden.
                            </p>
                        </div>

                        {!loading && <>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-8">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Naam evenement
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Nieuw evenement"
                                            onChange={onChange}
                                            value={values.name}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-8">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Korte omschrijving
                                    </label>
                                    <div className="mt-1">
                                    <textarea
                                        rows={4}
                                        name="description"
                                        id="description"
                                        className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Een korte uitleg over wat er tijdens dit evenement gaat gebeuren."
                                        onChange={onChange}
                                        value={values.description}
                                    />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                        Begin datum
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="datetime-local"
                                            name="startDate"
                                            id="startDate"
                                            className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Een wonderbaarlijke nieuwe dag!"
                                            onChange={onChange}
                                            value={values.startDate}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                        Eind datum
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="datetime-local"
                                            name="endDate"
                                            id="endDate"
                                            className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Een wonderbaarlijke nieuwe dag!"
                                            onChange={onChange}
                                            value={values.endDate}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-8">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Prijs
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">€</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="0.00"
                                            aria-describedby="price-currency"
                                            onChange={onChange}
                                            value={values.price}
                                        />
                                        <div
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm" id="price-currency">
                                            EUR
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-8">
                                    <label htmlFor="tents" className="block text-sm font-medium text-gray-700">
                                        Tenten
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type="number"
                                            name="tents"
                                            id="tents"
                                            className="focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="1"
                                            aria-describedby="tents"
                                            onChange={onChange}
                                            value={values.tents}
                                        />
                                    </div>
                                </div>
                            </div>
                            {values.events.length !== 0 &&
                                <CondensedTable values={values.events} headers={headers} actions={actions}/>}
                        </>}
                    </div>
                    <ActivityField createActivity={addAction}/>
                    <button
                        type="submit"
                        onClick={onSubmit}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        Bewaar
                    </button>
                </div>
            </div>
        </form>
    )
}