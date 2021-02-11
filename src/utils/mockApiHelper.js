import userData from '../api/user'

export const getAuthToken = (email, password) => {
    const currentUser = userData.find(item => item.email === email && item.password === password);
    return currentUser?.authToken;
}

export const logout = () => {
    localStorage.removeItem('authToken');
}