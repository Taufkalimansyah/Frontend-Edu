import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

import { login } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError("");

    try {
      const res = await login(email, password);

      const { token, user } = res.data;

      localStorage.setItem("eduonline_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
          navigate("/admin/dashboard");
      }
      else if (user.role === "mahasiswa") {
          navigate("/mahasiswa/dashboard");
      }
      else if (user.role === "dosen") {
          navigate("/dosen/dashboard");
}
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login gagal."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </AuthLayout>
  );
}