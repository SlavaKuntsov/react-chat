import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Global from "./pages/Global";
import NotFound from "./pages/NotFound";

export default function App(props) {
    return (
        <Layout>
            <Routes>
                {["/", '/*'].map((path, id) => (
                    <Route path={path} element={<Global />} key={id} />
                ))}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </Layout>
    );
}
