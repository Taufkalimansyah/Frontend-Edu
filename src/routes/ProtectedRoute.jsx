import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    children,
    role
}) {

    const token = localStorage.getItem(
        "eduonline_token"
    );

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {

        switch (user.role) {
            case "admin":
                return (
                    <Navigate
                        to="/admin/dashboard"
                        replace
                    />
                );

            case "mahasiswa":
                return (
                    <Navigate
                        to="/mahasiswa/dashboard"
                        replace
                    />
                );

            case "dosen":
                return (
                    <Navigate
                        to="/dosen/dashboard"
                        replace
                    />
                );

            default:
                return (
                    <Navigate
                        to="/login"
                        replace
                    />
                );
        }
    }

    return children;
}