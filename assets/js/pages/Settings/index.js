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
    const [blocks, setBlocks] = useState({});
    const [dataCollected, setDataCollected] = useState(false);

    useEffect(() => {
        if (!dataCollected) {
            fetch('/api/settings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    setDataCollected(true);
                    for (let key in res) {
                        if (res[key].name === "SITE_DESCRIPTION") {
                            setDescription(res[key].value);
                        } else if (res[key].name === "SITE_TITLE") {
                            setTitle(res[key].value);
                        } else {
                            setBlocks(prevState => ({
                                ...prevState,
                                [res[key].name]: res[key].value
                            }));
                        }
                    }
                })
                .catch(err => console.log(err));
        }
    }, [blocks])

    const handleSubmit1 = (e) => {
        e.preventDefault();
        updateSetting('BLOCK1_TITLE', blocks.BLOCK1_TITLE);
        updateSetting('BLOCK1_DESCRIPTION', blocks.BLOCK1_DESCRIPTION);
        updateSetting('BLOCK1_URL', blocks.BLOCK1_URL);
    };
    const handleSubmit2 = (e) => {
        e.preventDefault();
        updateSetting('BLOCK2_TITLE', blocks.BLOCK2_TITLE);
        updateSetting('BLOCK2_DESCRIPTION', blocks.BLOCK2_DESCRIPTION);
        updateSetting('BLOCK2_URL', blocks.BLOCK2_URL);
    };
    const handleSubmit3 = (e) => {
        e.preventDefault();
        updateSetting('BLOCK3_TITLE', blocks.BLOCK3_TITLE);
    };
    const handleSubmit4 = (e) => {
        e.preventDefault();
        updateSetting('BLOCK4_TITLE', blocks.BLOCK4_TITLE);
        updateSetting('BLOCK4_DESCRIPTION', blocks.BLOCK4_DESCRIPTION);
    };

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
                <li className="bg-white overflow-hidden shadow rounded-lg px-6 py-4 max-w-4xl">
                    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Blok 1</h3>
                    </div>
                    <form className="px-4 py-5 sm:p-6">
                        <div className="space-y-8 divide-y divide-gray-200">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <TextInput
                                        label="Titel"
                                        name="BLOCK1_TITLE"
                                        required={true}
                                        placeholder="De Berber, een vakantie punt"
                                        value={blocks.BLOCK1_TITLE}
                                        onChange={(e) => {
                                            const {name, value} = e.target;
                                            setBlocks({...blocks, [name]: value})
                                        }}
                                    />
                                </div>
                                <div className="sm:col-span-4">
                                    <TextAreaInput
                                        label="Beschrijving"
                                        name="BLOCK1_DESCRIPTION"
                                        required={true}
                                        errorMessage="Beschrijving is een verplicht veld"
                                        placeholder="De berber is een bedrijf dat zich richt op het leveren van een geweldige tijd."
                                        value={blocks.BLOCK1_DESCRIPTION}
                                        onChange={(e) => {
                                            const {name, value} = e.target;
                                            setBlocks({...blocks, [name]: value})
                                        }}
                                    />
                                </div>
                                <div className="sm:col-span-4">
                                    <TextInput
                                        label="Url"
                                        name="BLOCK1_URL"
                                        required={true}
                                        errorMessage="url is een verplicht veld"
                                        placeholder="https://www.deberber.nl"
                                        value={blocks.BLOCK1_URL}
                                        onChange={(e) => {
                                            const {name, value} = e.target;
                                            setBlocks({...blocks, [name]: value})
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                onClick={handleSubmit1}
                            > Opslaan </button>
                        </div>
                    </form>
                </li>
                <li className="bg-white overflow-hidden shadow rounded-lg px-6 py-4 max-w-4xl">
                    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Blok 2</h3>
                    </div>
                    <form className="px-4 py-5 sm:p-6">
                        <div className="space-y-8 divide-y divide-gray-200">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <TextInput
                                        label="Titel"
                                        name="BLOCK2_TITLE"
                                        required={true}
                                        placeholder="De Berber, een vakantie punt"
                                        value={blocks.BLOCK2_TITLE}
                                        onChange={(e) => {
                                            const {name, value} = e.target;
                                            setBlocks({...blocks, [name]: value})
                                            console.log(title);
                                        }}
                                    />
                                </div>
                                <div className="sm:col-span-4">
                                    <TextAreaInput
                                        label="Beschrijving"
                                        name="BLOCK2_DESCRIPTION"
                                        required={true}
                                        errorMessage="Beschrijving is een verplicht veld"
                                        placeholder="De berber is een bedrijf dat zich richt op het leveren van een geweldige tijd."
                                        value={blocks.BLOCK2_DESCRIPTION}
                                        onChange={(e) => {
                                            const {name, value} = e.target;
                                            setBlocks({...blocks, [name]: value})
                                        }}
                                    />
                                </div>
                                <div className="sm:col-span-4">
                                    <TextInput
                                        label="Url"
                                        name="BLOCK2_URL"
                                        required={true}
                                        errorMessage="url is een verplicht veld"
                                        placeholder="https://www.deberber.nl"
                                        value={blocks.BLOCK2_URL}
                                        onChange={(e) => {
                                            const {name, value} = e.target;
                                            setBlocks({...blocks, [name]: value})
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                onClick={handleSubmit2}
                            > Opslaan </button>
                        </div>
                    </form>
                </li>
                <li className="bg-white overflow-hidden shadow rounded-lg px-6 py-4 max-w-4xl">
                    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Blok 3</h3>
                    </div>
                    <form className="px-4 py-5 sm:p-6">
                        <div className="space-y-8 divide-y divide-gray-200">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <TextInput
                                        label="Titel"
                                        name="BLOCK3_TITLE"
                                        required={true}
                                        placeholder="De Berber, een vakantie punt"
                                        value={blocks.BLOCK3_TITLE}
                                        onChange={(e) => {
                                            const {name, value} = e.target;
                                            setBlocks({...blocks, [name]: value})
                                            console.log(title);
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                onClick={handleSubmit3}
                            > Opslaan </button>
                        </div>
                    </form>
                </li>
                <li className="bg-white overflow-hidden shadow rounded-lg px-6 py-4 max-w-4xl">
                    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Blok 4</h3>
                    </div>
                    <form className="px-4 py-5 sm:p-6">
                        <div className="space-y-8 divide-y divide-gray-200">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <TextInput
                                        label="Titel"
                                        name="BLOCK4_TITLE"
                                        required={true}
                                        placeholder="De Berber, een vakantie punt"
                                        value={blocks.BLOCK4_TITLE}
                                        onChange={(e) => {
                                            const {name, value} = e.target;
                                            setBlocks({...blocks, [name]: value})
                                        }}
                                    />
                                </div>
                                <div className="sm:col-span-4">
                                    <TextAreaInput
                                        label="Beschrijving"
                                        name="BLOCK4_DESCRIPTION"
                                        required={true}
                                        errorMessage="Beschrijving is een verplicht veld"
                                        placeholder="De berber is een bedrijf dat zich richt op het leveren van een geweldige tijd."
                                        value={blocks.BLOCK4_DESCRIPTION}
                                        onChange={(e) => {
                                            const {name, value} = e.target;
                                            setBlocks({...blocks, [name]: value})
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                onClick={handleSubmit4}
                            > Opslaan </button>
                        </div>
                    </form>
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
                onCancel={() => {
                    setConfirmGeneral(false)
                }}
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
    })
}
