import React from 'react';
export default function CheckBox({name, checked, onChange, subText, label}) {
    return (
        <div className="relative flex items-start">
            <div className="flex items-center h-5">
                <input
                    id={name}
                    aria-describedby={name + "-description"}
                    name={name}
                    type="checkbox"
                    className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                    checked={checked}
                    onChange={onChange}
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor={name} className="font-medium text-gray-700">
                    {label}
                </label>
                <span id={name + "-description"} className="text-gray-500">
            <span className="sr-only">{label}</span> {subText}
          </span>
            </div>
        </div>
    )
}