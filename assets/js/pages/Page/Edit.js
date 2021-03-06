import React, {useEffect, useState} from 'react';
import Editor from "../../components/Editor/Editor";
import BackgroundFinder from "../../components/BackgroundFinder";
import {useParams} from "react-router-dom";
import {ADD, useNotificationContext} from "../../contexts/NotificationContext";
import {getFromApi} from "../Events/EventFunctions";

export function Edit() {
    let params = useParams();
    const [inputs, setInputs] = useState({slug: ''});
    const [editorData, setEditorData] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [selectedBackground, setSelectedBackground] = useState();
    const {dispatch} = useNotificationContext();

    useEffect(() => {
        if (loadingPage) {
            fetch('/api/pages/' + params.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(async data => {
                    setLoadingPage(false);
                    setInputs(data);
                    setEditorData(JSON.parse(data.content));
                    if(data.background) {
                        setSelectedBackground(await getFromApi(data.background));
                    }
                })
                .catch(err => console.log(err));

        }
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value});
    };

    function validateForm() {
        let wrong = false;
        // check if title is empty
        if (!inputs.title || inputs.title.length === 0) {
            let titleElement = document.querySelector('#title');
            titleElement.classList.add('border-red-900');
            titleElement.classList.add('focus:ring-red-500');
            titleElement.append(errorMessage('Titel is verplicht'));
            titleElement.focus();
            wrong = true;
        }
        // check if slug is empty
        if (!inputs.slug || inputs.slug.length === 0) {
            let slugElement = document.querySelector('#slug');
            slugElement.classList.add('border-red-900');
            slugElement.classList.add('focus:ring-red-500');
            slugElement.append(errorMessage('Slug is verplicht'));
            slugElement.focus();
            wrong = true;
        }
        return wrong;
    }

    const errorMessage = (msg) => {
        let el = document.createElement('p');
        el.innerText = msg;
        el.classList.add('mt-2');
        el.classList.add('text-sm');
        el.classList.add('text-red-600');
        return el;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (validateForm()) {
            setLoading(false);
            return;
        }


        let data = JSON.stringify(editorData);
        fetch('/api/pages/' + inputs.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...inputs,
                content: data,
                background: selectedBackground ? '\/api\/backgrounds\/' + selectedBackground.id : null
            }),
        })
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                dispatch({type: ADD,
                    payload: {
                        title: 'Pagina is bijgewerkt',
                        description: 'De pagina is succesvol bijgewerkt',
                        type: 'success'
                    }
                })
            })
            .catch(err => {
                setLoading(false);
                alert(err);
            });

    };

    const handleEditorChange = (content) => {
        setLoading(true);
        content.then(value => {
            setEditorData(value);
            setLoading(false);
        });
    };

    const generateSlug = () => {
        let slug = inputs.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setInputs({...inputs, slug: slug});
    };
    if (loadingPage) {
        return <p>Loading...</p>
    }

    return (
        <form className="space-y-8 divide-y divide-gray-200 max-w-8xl">
            <div className="md:flex">
                <div className="space-y-8 divide-y divide-gray-200 w-full md:w-4/6">
                    <div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Pagina bewerken</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Dit is de pagina zoals hij op je website zal verschijnen.
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-8">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Titel
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Een wonderbaarlijke nieuwe dag!"
                                        onChange={handleInputChange}
                                        value={inputs.title}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-8">
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                                    Slug {inputs.title && <button onClick={generateSlug} type="button"
                                                                  className="text-yellow-500">(genereer)</button>}
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                <span
                    className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  www.deberber.nl/
                </span>
                                    <input
                                        type="text"
                                        name="slug"
                                        id="slug"
                                        autoComplete="slug"
                                        placeholder="een-wonderbaarlijke-nieuwe-dag"
                                        className="flex-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                        onChange={handleInputChange}
                                        value={inputs.slug}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-8">
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                                    Samenvatting
                                </label>
                                <div className="mt-1">
                <textarea
                    id="excerpt"
                    name="excerpt"
                    rows={3}
                    className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    onChange={handleInputChange}
                    value={inputs.excerpt}
                />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Dit is hoe de blog tekst bij de kaartjes komt
                                    te
                                    staan.</p>
                            </div>

                            {editorData && <Editor onChange={handleEditorChange} defaultValue={editorData}/>}
                        </div>
                    </div>
                </div>
                <div className="sm:px-8 pt-3 w-full md:w-2/6">
                    <div className="bg-white overflow-hidden shadow rounded-lg w-full h-full">
                        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Instellingen</h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="sm:col-span-6">
                                <BackgroundFinder selectedBackground={selectedBackground}
                                                  setSelectedBackground={setSelectedBackground}/>
                            </div>
                        </div>
                        {/*<div className="bg-gray-50 shadow sm:rounded-lg m-4">*/}
                        {/*    <div className="px-4 py-5 sm:p-6">*/}
                        {/*        <h3 className="text-lg leading-6 font-medium text-gray-900">Verdwijder pagina</h3>*/}
                        {/*        <div className="mt-2 max-w-xl text-sm text-gray-500">*/}
                        {/*            <p>Als je de pagina verwijderd, verlies je alle data die er in staat!</p>*/}
                        {/*        </div>*/}
                        {/*        <div className="mt-5">*/}
                        {/*            <button*/}
                        {/*                type="button"*/}
                        {/*                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"*/}
                        {/*            >*/}
                        {/*                Verwijder pagina*/}
                        {/*            </button>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        type="submit"
                        onClick={handleSubmit}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        Bewaar
                    </button>
                </div>
            </div>
        </form>
    )
}
