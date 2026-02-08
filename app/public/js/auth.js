const API_BASE = "http://localhost:5000/api"; // Убедись, что на бэке в .env PORT=5000

const authHelper = {
    saveAuth: (data) => {
        localStorage.setItem("token", data.accessToken); // Бэк присылает accessToken
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
    },
    getHeaders: () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "" // Добавили Bearer
        };
    },
    logout: () => {
        localStorage.clear();
        window.location.href = "login.html";
    }
};