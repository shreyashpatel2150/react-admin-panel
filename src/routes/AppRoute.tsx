import { Route, Routes } from "react-router";
import Login from "../pages/Auth/Login";
import AuthGuard from "./AuthGuard";
import AppLayout from "../pages/Layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/otherPages/Notfound";
import { User } from "../pages/users/User";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={
                <AuthGuard><AppLayout /></AuthGuard>
            }>
                <Route path="/" index element={<Dashboard />} />
                <Route path="/user" element={<User />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoute