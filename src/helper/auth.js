import jwt_decode from "jwt-decode";

export const checkJWT = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    const current_time = new Date().getTime() / 1000;
    if (current_time > decoded.exp) {
      logout();
    }
    return true;
  } else {
    logout();
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  window.location.href = "/";
};
