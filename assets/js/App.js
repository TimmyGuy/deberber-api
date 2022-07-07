import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebar from "./ui/Layout/Sidebar";
import './App.css';
import {BlogPage, BlogPageEdit, BlogPageNew} from "./pages/Blog";
import Settings from "./pages/Settings";
import Navigation from "./pages/Navigation";
import Backgrounds from "./pages/Backgrounds";
import useToken from "./hooks/useToken";
import Login from "./pages/Login";
import {Page, PageEdit, PageNew} from "./pages/Page";
import Images from "./pages/Images";
import {EditEvent, Events, NewEvent} from "./pages/Events";
import {Booking, Bookings} from "./pages/Bookings";

function App() {
    const [token, setToken] = useToken();


    if (!token) {
        return (
            <Login setToken={setToken}/>
        )
    }

    return (
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/" element={<p>Dashboard</p>}/>
                    <Route path="/navigation" element={<Navigation/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="blog" element={<BlogPage/>}/>
                    <Route path="blog/:id" element={<BlogPageEdit/>}/>
                    <Route path="blog/new" element={<BlogPageNew/>}/>
                    <Route path="page" element={<Page/>}/>
                    <Route path="page/:id" element={<PageEdit/>}/>
                    <Route path="page/new" element={<PageNew/>}/>
                    <Route path="/images" element={<Images/>}/>
                    <Route path="/backgrounds" element={<Backgrounds/>}/>
                    <Route path="/events" element={<Events/>}/>
                    <Route path="/events/new" element={<NewEvent/>}/>
                    <Route path="/events/:id" element={<EditEvent/>}/>
                    <Route path="/bookings" element={<Bookings/>}/>
                    <Route path="/booking/:id" element={<Booking/>}/>
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
}

export default App;
