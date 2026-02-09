const API_BASE = "/api"; 

const authHelper = {
    saveAuth: (data) => {
        localStorage.setItem("token", data.accessToken); 
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
    },
    getHeaders: () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "" 
        };
    },
    logout: () => {
        localStorage.clear();
        window.location.href = "login.html";
    }
};