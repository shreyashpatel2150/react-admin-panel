import { BrowserRouter } from "react-router";
import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoute />
            </BrowserRouter>
        </AuthProvider>
    );
}
