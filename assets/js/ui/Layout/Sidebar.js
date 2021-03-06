import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    BellIcon,
    PencilAltIcon,
    HomeIcon,
    MenuAlt2Icon,
    NewspaperIcon,
    XIcon,
    PhotographIcon,
    CubeTransparentIcon,
    CogIcon,
    BookmarkAltIcon,
    CalendarIcon, CreditCardIcon
} from '@heroicons/react/outline'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const mainNavigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    { name: 'Navigatie', href: '/navigation', icon: BookmarkAltIcon, current: false },
    { name: 'Instellingen', href: '/settings', icon: CogIcon, current: false }
]
const contentNavigation = [
    { name: 'Blog', href: '/blog', icon: PencilAltIcon, current: false },
    { name: 'Pagina\'s', href: '/page', icon: NewspaperIcon, current: false }
]
const mediaNavigation = [
    { name: 'Afbeeldingen', href: '/images', icon: PhotographIcon, current: false },
    { name: 'Achtergronden', href: '/backgrounds', icon: CubeTransparentIcon, current: false }
]
const bookingNavigation = [
    { name: 'Evenementen', href: '/events', icon: CalendarIcon, current: false},
    { name: 'Reserveringen', href: '/Bookings', icon: CreditCardIcon, current: false }
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function NavItem({item}) {
    let resolved = useResolvedPath(item.href);
    let match = useMatch({ path: resolved.pathname, end: item.href === '/' });
    return <Link
        to={item.href}
        className={classNames(
            match ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
        )}
    >
        <item.icon
            className={classNames(
                match ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                'mr-3 flex-shrink-0 h-6 w-6'
            )}
            aria-hidden="true"
        />
        {item.name}
    </Link>;
}

export default function Sidebar({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-shrink-0 px-4 flex items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://deberber.nl/logo.png"
                                        alt="De Berber"
                                    />
                                </div>
                                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                    <nav className="px-2">
                                        <div className="space-y-1">
                                            {mainNavigation.map((item) => (
                                                <NavItem key={item.name} item={item}/>
                                            ))}
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="projects-headline">
                                                Content
                                            </h3>
                                            {contentNavigation.map((item) => (
                                                <NavItem key={item.name} item={item}/>
                                            ))}
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="projects-headline">
                                                Media
                                            </h3>
                                            {mediaNavigation.map((item) => (
                                                <NavItem key={item.name} item={item}/>
                                            ))}
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="projects-headline">
                                                Booking
                                            </h3>
                                            {bookingNavigation.map((item) => (
                                                <NavItem key={item.name} item={item}/>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14">{/* Dummy element to force sidebar to shrink to fit close icon */}</div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
                        <div className="flex-shrink-0 px-4 flex items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://deberber.nl/logo.png"
                                alt="De Berber"
                            />
                        </div>
                        <div className="flex-grow mt-5 flex flex-col">
                            <nav className="flex-1 px-2 pb-4">
                                <div className="space-y-1">
                                    {mainNavigation.map((item) => <NavItem key={item.name} item={item}/>)}
                                </div>
                                <div className="mt-8">
                                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="projects-headline">
                                        Content
                                    </h3>
                                    {contentNavigation.map((item) => (
                                        <NavItem key={item.name} item={item}/>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="projects-headline">
                                        Media
                                    </h3>
                                    {mediaNavigation.map((item) => (
                                        <NavItem key={item.name} item={item}/>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider" id="projects-headline">
                                        Booking
                                    </h3>
                                    {bookingNavigation.map((item) => (
                                        <NavItem key={item.name} item={item}/>
                                    ))}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="md:pl-64">
                    <div className="mx-auto flex flex-col md:px-8">
                        <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
                            <button
                                type="button"
                                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 md:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            <div className="flex-1 flex justify-between px-4 md:px-0">
                                <div className="flex-1 flex">

                                </div>
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://deberber.nl/logo.png"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block py-2 px-4 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <main className="flex-1">
                            <div className="py-6">
                                <div className="px-4 sm:px-6 md:px-0">
                                    {children}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
