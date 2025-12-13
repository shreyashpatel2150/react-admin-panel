import { BrowserRouter } from "react-router";
import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

export default function App() {
    return (
        <AppProvider>
            <AuthProvider>
                <BrowserRouter>
                    <AppRoute />
                </BrowserRouter>
            </AuthProvider>
        </AppProvider>
    );
}
