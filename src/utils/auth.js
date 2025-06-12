export const getToken = () => localStorage.getItem("adminToken");

// export const isAuthenticated = () => !!getToken();

export const isAdminAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
}

export const isUserAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
}