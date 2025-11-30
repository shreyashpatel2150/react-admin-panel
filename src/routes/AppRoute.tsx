import { Route, Routes } from "react-router";
import Login from "../pages/Auth/Login";
import AuthGuard from "./AuthGuard";
import AppLayout from "../pages/Layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/otherPages/Notfound";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={
                <AuthGuard><AppLayout /></AuthGuard>
            }>
                <Route path="/" index element={<Dashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoute