export const getToken = () => localStorage.getItem("adminToken");

export const isAuthenticated = () => !!getToken();
