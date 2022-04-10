import React, {useEffect, useState} from 'react';
import ImageUploadOverlay from "../../ui/Overlay/ImageUploadOverlay";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Backgrounds() {
    const [files, setFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState();
    const [loading, setLoading] = useState(true);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        if(loading) {
            fetch('http://127.0.0.1:8000/api/backgrounds',
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setLoading(false);
                    setFiles(data);
                })
        }
    }, [files, loading]);

    return (
        <>
            <div className="flex-1 flex items-stretch overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                    <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex">
                            <h1 className="flex-1 text-2xl font-bold text-gray-900">Achtergronden</h1>
                        </div>

                        {/* Gallery */}
                        <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                            <h2 id="gallery-heading" className="sr-only">
                                Recently viewed
                            </h2>
                            <ul
                                role="list"
                                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                            >
                                <li className="relative">
                                    <button
                                        type="button"
                                        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                        onClick={() => setShowOverlay(true)}
                                    >
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                                            />
                                        </svg>
                                        <span className="mt-2 block text-sm font-medium text-gray-900">Voeg een afbeelding toe</span>
                                    </button>
                                </li>
                                {!loading && files.map((file) => (
                                    <li key={file.title} className="relative">
                                        <div
                                            className={classNames(
                                                file.current
                                                    ? 'ring-2 ring-offset-2 ring-yellow-500'
                                                    : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-yellow-500',
                                                'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                                            )}
                                        >
                                            <img
                                                src={file.contentUrl}
                                                alt=""
                                                className={classNames(
                                                    file.current ? '' : 'group-hover:opacity-75',
                                                    'object-cover pointer-events-none'
                                                )}
                                            />
                                            <button type="button" className="absolute inset-0 focus:outline-none" onClick={() => {
                                                setCurrentFile(file);
                                            }}>
                                                <span className="sr-only">View details for {file.title}</span>
                                            </button>
                                        </div>
                                        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                            {file.title}
                                        </p>
                                        <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.fileType}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </main>
                {/* Details sidebar */}
                {currentFile && <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
                    <div className="pb-16 space-y-6">
                        <div>
                            <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                                <img src={currentFile.contentUrl} alt="" className="object-cover"/>
                            </div>
                            <div className="mt-4 flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        <span className="sr-only">Details for </span>
                                        {currentFile.title}
                                    </h2>
                                    <p className="text-sm font-medium text-gray-500">{currentFile.fileType}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                className="flex-1 bg-yellow-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Download
                            </button>
                            <button
                                type="button"
                                className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </aside>}
            </div>
            {showOverlay && <ImageUploadOverlay title="Upload een achtergrond" description="Upload een achtergrond" setLoading={setLoading} setShowOverlay={setShowOverlay} url="http://127.0.0.1:8000/api/backgrounds"/>}
        </>
    )
}