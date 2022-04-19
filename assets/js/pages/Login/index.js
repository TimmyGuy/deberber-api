import React from 'react';
import {LockClosedIcon} from '@heroicons/react/solid'

async function loginUser(credentials) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
}

export default function Login({setToken}) {
    const [inputs, setInputs] = React.useState({});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await loginUser(inputs);
        if (user.token) {
            setToken({token: user.token});
        } else {
            alert(user.error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://deberber.nl/logo.png"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in op</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            De Berber admin
                        </p>
                    </div>
                    <form className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true"/>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/*<div className="flex items-center justify-between">*/}
                        {/*    <div className="flex items-center">*/}
                        {/*        <input*/}
                        {/*            id="remember-me"*/}
                        {/*            name="remember-me"*/}
                        {/*            type="checkbox"*/}
                        {/*            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"*/}
                        {/*        />*/}
                        {/*        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">*/}
                        {/*            Remember me*/}
                        {/*        </label>*/}
                        {/*    </div>*/}

                        {/*    <div className="text-sm">*/}
                        {/*        <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">*/}
                        {/*            Forgot your password?*/}
                        {/*        </a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                onClick={handleSubmit}
                            >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400" aria-hidden="true"/>
                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}