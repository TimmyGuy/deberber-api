import React from 'react';

export default function ActivityField({createActivity}) {
    const [activity, setActivity] = React.useState({});
    const onChange = (e) => {
        setActivity({...activity, [e.target.name]: e.target.value});
    }
    const onSubmit = (e) => {
        e.preventDefault();
        // Make all fields empty
        if (activity.name && activity.description && activity.price) {
            createActivity(activity);
            setActivity({});
        }
    }

    return (
        <div className="relative">
            <div
                className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500">
                <label htmlFor="name" className="sr-only">
                    Naam activiteit
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
                    placeholder="Naam activiteit"
                    value={activity.title}
                    onChange={onChange}
                />
                <label htmlFor="description" className="sr-only">
                    Omschrijving
                </label>
                <textarea
                    rows={2}
                    name="description"
                    id="description"
                    className="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Schrijf een omschrijving..."
                    value={activity.description}
                    onChange={onChange}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div aria-hidden="true">
                    <div className="py-2">
                        <div className="h-9"/>
                    </div>
                    <div className="h-px"/>
                    <div className="py-2">
                        <div className="py-px">
                            <div className="h-9"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 inset-x-px">
                {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
                    <div className="flex">
                        <div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">€</span>
                        </div>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                            value={activity.price}
                            defaultValue={''}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex-shrink-0">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            onClick={onSubmit}>
                            Aanmaken
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
