import { BrowserRouter } from "react-router";
import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { Toaster } from 'react-hot-toast';

export default function App() {
    return (
        <AppProvider>
            <AuthProvider>
                <BrowserRouter>
                    <AppRoute />
                    <Toaster position="bottom-center" />
                </BrowserRouter>
            </AuthProvider>
        </AppProvider>
    );
}
