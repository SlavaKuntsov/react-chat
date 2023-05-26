import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App(props) {
    return (
        <Layout>
            <Routes>
                {["/", '*'].map((path, id) => (
                    <Route path={path} element={<Auth />} key={id} />
                ))}
                <Route path="/home" element={<Home />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </Layout>
    );
}
