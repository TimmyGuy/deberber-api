import React, {useEffect} from 'react';
import Divider from "../../ui/Divider";
import TextInput from "../../ui/Input/TextInput";
import TextAreaInput from "../../ui/Input/TextAreaInput";
import {useState} from "react";
import ConfirmModal from "../../components/ConfirmModal";

export default function Settings() {
    const [confirmGeneral, setConfirmGeneral] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dataCollected, setDataCollected] = useState(false);

    useEffect(() => {
        if(!dataCollected) {
            fetch('/api/settings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    res.forEach(setting => {
                        if(setting.name === 'SITE_TITLE') {
                            setTitle(setting.value);
                        } else if(setting.name === 'SITE_DESCRIPTION') {
                            setDescription(setting.value);
                        }
                    });
                    setDataCollected(true);
                })
                .catch(err => console.log(err));
        }
    })

    return (
        <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Instellingen</h2>
            <div className="my-4">
                <div className="sm:col-span-6">
                    <label htmlFor="photo" className="block text-sm font-medium text-blue-gray-900">
                        Logo
                    </label>
                    <div className="mt-1 flex items-center">
                        <img
                            className="inline-block h-12 w-12 rounded-full"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                            alt=""
                        />
                        <div className="ml-4 flex">
                            <div
                                className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
                                <label
                                    htmlFor="logo-img"
                                    className="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
                                >
                                    <span>Verander</span>
                                    <span className="sr-only"> logo</span>
                                </label>
                                <input
                                    id="logo-img"
                                    name="logo-img"
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-6 mt-2">
                    <label htmlFor="photo" className="block text-sm font-medium text-blue-gray-900">
                        Favicon
                    </label>
                    <div className="mt-1 flex items-center">
                        <img
                            className="inline-block h-12 w-12 rounded-full"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                            alt=""
                        />
                        <div className="ml-4 flex">
                            <div
                                className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
                                <label
                                    htmlFor="favicon-img"
                                    className="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
                                >
                                    <span>Verander</span>
                                    <span className="sr-only"> favicon</span>
                                </label>
                                <input
                                    id="favicon-img"
                                    name="favicon-img"
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Divider text="Site informatie"/>
            <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <TextInput
                                label="Site titel"
                                name="title"
                                required={true}
                                errorMessage="Titel is een verplicht veld"
                                placeholder="De Berber"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                        </div>
                        <div className="sm:col-span-4">
                            <TextAreaInput
                                label="Site beschrijving"
                                name="description"
                                required={true}
                                errorMessage="Beschrijving is een verplicht veld"
                                placeholder="De berber is een bedrijf dat zich richt op het leveren van een geweldige tijd."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        onClick={() => setConfirmGeneral(true)}
                    >
                        Opslaan
                    </button>
                </div>

            </form>
            <Divider text="Homepagina"/>
            <ul className="space-y-3">
                <li className="bg-white shadow overflow-hidden rounded-md px-6 py-4">
                    Whatever code is necc for the homepage <br/>
                    -> Titel card <br/>
                    -> Description card <br/>
                    -> Url card
                </li>
            </ul>

            {confirmGeneral && <ConfirmModal
                title="Basisgegevens veranderen"
                message="Weet je zeker dat je deze gegevens wilt veranderen? Deze gegevens zijn belangrijk voor de SEO van de website, en aanpassingen kunnen een negatieve invloed hebben op de website."
                onConfirm={() => {
                    setConfirmGeneral(false)
                    updateSetting('SITE_TITLE', title)
                    updateSetting('SITE_DESCRIPTION', description)
                }}
                onCancel={() => {setConfirmGeneral(false)}}
            />}
        </div>
    );
}

function updateSetting(name, value) {
    fetch(`/api/settings/${name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name, value
        })
    }).then(r => {
        if (r.status === 200) {
            alert('Gegevens zijn succesvol opgeslagen')
        }
    })
}