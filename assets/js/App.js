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
                    <Route path="/" element={<p>Dashboardd</p>}/>
                    <Route path="/navigation" element={<Navigation/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="blog" element={<BlogPage/>}/>
                    <Route path="blog/:id" element={<BlogPageEdit/>}/>
                    <Route path="blog/new" element={<BlogPageNew/>}/>
                    <Route path="page" element={<Page/>}/>
                    <Route path="page/:id" element={<PageEdit/>}/>
                    <Route path="page/new" element={<PageNew/>}/>
                    <Route path="/backgrounds" element={<Backgrounds/>}/>
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
}

export default App;
