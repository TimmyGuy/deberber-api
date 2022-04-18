import React from 'react';
import {ExclamationCircleIcon} from "@heroicons/react/solid";
import {useState} from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TextAreaInput({name, label, value, onChange, placeholder, required, errorMessage}) {
    const [showError, setShowError] = useState(false);

    // function change(e) {
    //     if(required && e.target.value === '') {
    //         setShowError(true);
    //     } else {
    //         setShowError(false);
    //     }
    //     onChange(e.target.value);
    // }

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                    name={name}
                    id={name}
                    className={classNames("block w-full pr-10 sm:text-sm rounded-md", showError ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "focus:ring-yellow-500 focus:border-yellow-500 border-gray-300")}
                    placeholder={placeholder}
                    defaultValue={value}
                    aria-invalid="true"
                    aria-describedby={name + "-error"}
                    onChange={onChange}
                    required={required}
                    rows={3}
                />
                {showError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>}
            </div>
            {showError && <p className="mt-2 text-sm text-red-600" id={name + "-error"}>
                {errorMessage}
            </p>}
        </div>
    )
}