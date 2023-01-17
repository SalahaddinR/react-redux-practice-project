import React from "react";
import { Routes, Route } from "react-router";
import Catalog from "./products/Catalog";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Cart from "./products/Cart";

import 'styles/App.scss';

export default function App() {

    return (
        <main className="App">
            <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </main>
    )
}