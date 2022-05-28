import React, {useState} from 'react';
import CondensedTable from "../../components/CondensedTable";
import ActivityField from "../../components/ActivityField";

export function New() {
    const headers = [
        {field: 'name', name: 'Naam'},
        {field: 'description', name: 'Omschrijving'},
        {field: 'price', name: 'Prijs'}
    ]
    const [values, setValues] = useState({events: []});
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
    const onSubmit = (event) => {
        event.preventDefault();
        // Submit to server
        console.log(values);
    }

    return (
        <form className="space-y-8 divide-y divide-gray-200 max-w-8xl" onSubmit={onSubmit}>
            <div className="md:flex">
                <div className="space-y-8 divide-y divide-gray-200 w-full md:w-4/6">
                    <div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Evenement maken</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Maak een evenement aan waar mensen zich kunnen aanmelden.
                            </p>
                        </div>

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
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                    Begin datum
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Een wonderbaarlijke nieuwe dag!"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                    Eind datum
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Een wonderbaarlijke nieuwe dag!"
                                        onChange={onChange}
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
                                        type="text"
                                        name="price"
                                        id="price"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0.00"
                                        aria-describedby="price-currency"
                                        onChange={onChange}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm" id="price-currency">
                                            EUR
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CondensedTable values={values.events} headers={headers} actions={actions}/>
                    </div>
                    <ActivityField createActivity={addAction}/>
                </div>
            </div>
        </form>
    )
}