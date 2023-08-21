export const handleLogOut = (navigate) => {
  localStorage.clear();
  setTimeout(() => navigate("/"), 1000);
};
