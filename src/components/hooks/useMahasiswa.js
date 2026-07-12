import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";

export default function useMahasiswa() {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMahasiswa = useCallback(async (search = "") => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get("/users", {
                params: { role: "mahasiswa", q: search || undefined },
            });
            setMahasiswa(data);
        } catch (err) {
            setError(err.response?.data?.message || "Gagal memuat data mahasiswa");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMahasiswa();
    }, [fetchMahasiswa]);

    const createMahasiswa = async (payload) => {
        const { data } = await api.post("/users", { ...payload, role: "mahasiswa" });
        setMahasiswa((prev) => [data, ...prev]);
        return data;
    };

    const updateMahasiswa = async (id, payload) => {
        const { data } = await api.put(`/users/${id}`, payload);
        setMahasiswa((prev) => prev.map((m) => (m.id === id ? data : m)));
        return data;
    };

    const deleteMahasiswa = async (id) => {
        await api.delete(`/users/${id}`);
        setMahasiswa((prev) => prev.filter((m) => m.id !== id));
    };

    return {
        mahasiswa,
        loading,
        error,
        fetchMahasiswa,
        createMahasiswa,
        updateMahasiswa,
        deleteMahasiswa,
    };
}