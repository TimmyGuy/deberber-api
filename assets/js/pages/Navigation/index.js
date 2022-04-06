import React from 'react';
import CheckBox from "../../ui/Input/CheckBox";
import Select from "../../ui/Input/Select";

const webPages = [
    {
        slug: "whatever",
        title: "Whatever",
        type: "page"
    },
    {
        slug: "whatever2",
        title: "Whatever2",
        type: "blog"
    }
]

const menus = [
    {
        value: "intro",
        label: "Intro"
    },
    {
        value: "main",
        label: "Main"
    },
    {
        value: "footer",
        label: "Footer"
    }
]

export default function Navigation() {

    return (
        <div className="flex-grow w-full max-w-8xl mx-auto xl:px-8 lg:flex">
            {/* Left sidebar & main wrapper */}
            <div className="flex-1 min-w-0 bg-white xl:flex">
                <div
                    className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
                    <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                        {/* Start left column area */}
                        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Pagina toevoegen</h3>
                            </div>
                            <div className="px-4 py-5 sm:p-6">
                                <Select
                                    label="Menu"
                                    name="menu"
                                    options={menus}
                                    value="main"
                                />
                                <div className="py-4">
                                    {webPages.map(page => (
                                        <CheckBox label={page.title} name={page.slug} subText={"(" + page.type + ")"} key={page.slug}/>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                >
                                    Toevoegen
                                </button>
                            </div>
                        </div>
                        {/* End left column area */}
                    </div>
                </div>

                <div className="bg-white lg:min-w-0 lg:flex-1">
                    <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                        {/* Start main area*/}
                        <div className="relative h-full" style={{minHeight: '36rem'}}>
                            <div className="absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg"/>
                        </div>
                        {/* End main area */}
                    </div>
                </div>
            </div>
        </div>
    )
}