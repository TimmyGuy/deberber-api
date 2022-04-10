import React, {useEffect, useState} from 'react';
import {TableWithCTA} from "../../components/TableWithCTA";
import {Link} from "react-router-dom";

// const blogs = [
//     { id: 1, title: 'Mijn eerste blogpost!', slug: 'mijn-eerste-blogpost', date: '2022-03-04 11:21', published: 1 },
//     // More blogs...
// ]

export function Collection() {
    const [blogs, setBlogs] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!loaded) {
            fetch('/api/blogs', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBlogs(data);
                    setLoaded(true);
                });
            setLoaded(true);
        }
    })

    const togglePublished = (blog) => {
        fetch('/api/blogs/' + blog.id + '/toggle')
            .then(res => res.json())
            .then(data => {
                setLoaded(false);
            });
    }

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Blog posts</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Een lijst met alle blogposts.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                        to="/blog/new"
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Voeg een blogpost toe
                    </Link>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            {<TableWithCTA items={blogs} toggle={togglePublished} type='blog' />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}