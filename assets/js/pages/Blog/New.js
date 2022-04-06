import React, {useState} from 'react';
import Editor from "../../components/Editor/Editor";

export function New() {
    const [inputs, setInputs] = useState({});
    const [editorData, setEditorData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    // TODO: Fix this shit (for some reason it wont store inputs)
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...inputs,
                content: {editorData},
            }),
        })
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                if (res.success) {
                    window.location.href = '/blog/' + res.id;
                } else {
                    alert(res.message);
                }
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

    return (
        <form className="space-y-8 divide-y divide-gray-200 max-w-8xl">
            <div className="md:flex">
                <div className="space-y-8 divide-y divide-gray-200 w-full md:w-4/6">
                    <div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Blog maken</h3>
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
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-8">
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                                    Slug
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                <span
                    className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  www.deberber.nl/blog/
                </span>
                                    <input
                                        type="text"
                                        name="slug"
                                        id="slug"
                                        autoComplete="slug"
                                        placeholder="een-wonderbaarlijke-nieuwe-dag"
                                        className="flex-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                        onChange={handleInputChange}
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
                    defaultValue={''}
                    onChange={handleInputChange}
                />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Dit is hoe de blog tekst bij de kaartjes komt
                                    te
                                    staan.</p>
                            </div>

                            <Editor onChange={handleEditorChange}/>
                        </div>
                    </div>


                </div>
                <div className="sm:px-8 pt-3 w-full md:w-2/6">
                    <div className="bg-white overflow-hidden shadow rounded-lg w-full">
                        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Instellingen</h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="thumbnail-photo" className="block text-sm font-medium text-gray-700">
                                    Thumbnail
                                </label>
                                <div
                                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file"
                                                       className="sr-only"/>
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                Achtergrond selectie
                            </div>
                        </div>
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
