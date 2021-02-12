import userData from "../api/user";

export const getAuthToken = (email, password) => {
  const currentUser = userData.find(
    (item) => item.email === email && item.password === password
  );
  if (currentUser?.authToken) {
    localStorage.setItem("authToken", currentUser.authToken);
    localStorage.setItem("currentUserId", currentUser.id);
    return currentUser.authToken;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUserId");
  localStorage.removeItem("currentUserInformation");
};

export const getCurrentUserInformation = () => {
  return JSON.parse(localStorage.getItem("currentUserInformation"));
};

export const saveUserInformation = (userInformation) => {
  return localStorage.setItem(
    "currentUserInformation",
    JSON.stringify({
      ...userInformation,
      userId: localStorage.getItem("currentUserId"),
    })
  );
};
