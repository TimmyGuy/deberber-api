import React, {useEffect, useState} from 'react';
import CheckBox from "../../ui/Input/CheckBox";
import Select from "../../ui/Input/Select";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/solid";

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [navItems, setNavItems] = useState([]);
    const [menu, setMenu] = useState(menus[1].value);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        if (loading) {
            setLoading(false);
            fetch('/api/pages', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    let webpages = res.map(page => {
                        return {
                            slug: '/' + page.slug,
                            title: page.title,
                            type: 'page'
                        }
                    })
                    setPages(oldPages => oldPages.concat(webpages));
                })
            fetch('/api/blogs', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    let webpages = res.map(page => {
                        return {
                            slug: '/blog/' + page.slug,
                            title: page.title,
                            type: 'blog'
                        }
                    })
                    setPages(oldPages => oldPages.concat(webpages));
                })
            getNavItems();
        }
    })

    const getNavItems = () => {
        fetch('/api/navigations', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                setNavItems(res);
            })
    }

    function handleSubmit(e) {
        e.preventDefault();
        selectedItems.forEach(item => {
            let data = {
                href: item.slug,
                navbar: menu,
                name: item.title,
            }
            fetch('/api/navigations', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                })
        })
        getNavItems();
    }

    return (
        <div className="flex-grow w-full max-w-8xl mx-auto xl:px-8 lg:flex">
            {/* Left sidebar & main wrapper */}
            <div className="flex-1 min-w-0 bg-white xl:flex">
                <div
                    className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-80 xl:border-r xl:border-gray-200 bg-white">
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
                                    onChange={(e) => setMenu(e.target.value)}
                                />
                                <div className="py-4">
                                    {pages.map(page => {
                                        if (!navItems.find(item => (item.href === page.slug) && (item.navbar === menu))) {
                                            return (
                                                <CheckBox label={page.title} name={page.slug}
                                                          subText={"(" + page.type + ")"} key={page.slug}
                                                          onChange={(e) => {
                                                              if (e.target.checked) {
                                                                  setSelectedItems(oldItems => oldItems.concat(page));
                                                              } else {
                                                                  setSelectedItems(oldItems => oldItems.filter(item => item.slug !== page.slug));
                                                              }
                                                          }}/>
                                            )
                                        }
                                    })}
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    onClick={handleSubmit}
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
                        <div className="bg-gray-50">
                            <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                                <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                                    <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Pagina's
                                        in menu "{menus.find(m => m.value === menu).label}"</h2>
                                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                                        <ul>
                                            {navItems.map((item) => {
                                                if (item.navbar === menu) {
                                                    return (
                                                        <li key={item.id}><Disclosure as="div" className="pt-6">
                                                            {({open}) => (
                                                                <>
                                                                    <dt className="text-lg">
                                                                        <Disclosure.Button
                                                                            className="text-left w-full flex justify-between items-start text-gray-400">
                                                                <span
                                                                    className="font-medium text-gray-900">{item.name}</span>
                                                                            <span
                                                                                className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform transition-transform duration-200')}
                              aria-hidden="true"
                          />
                        </span>
                                                                        </Disclosure.Button>
                                                                    </dt>
                                                                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                                        <p className="text-base text-gray-500">{item.href}</p>
                                                                    </Disclosure.Panel>
                                                                </>
                                                            )}
                                                        </Disclosure></li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        {/* End main area */}
                    </div>
                </div>
            </div>
        </div>
    )
}