import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./pages/Layout/AppLayout";
import NotFound from "./pages/otherPages/Notfound";

export default function App() {
    return (
        <>
            <Router>
                {/* <ScrollToTop /> */}
                <Routes>
                    {/* Dashboard Layout */}
                    <Route element={<AppLayout />}>
                        <Route index path="/" element={<Dashboard />} />
                    </Route>

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
