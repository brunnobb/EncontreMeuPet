

export const saveLocalStorageLogin = (user, pass) => new Promise((resolve) => {
    localStorage.setItem('loggedUser', (user || ''));
    localStorage.setItem('loggedUserPass', (pass || ''));
    resolve();
});

export const saveLocalStorageLogout = () => new Promise((resolve) => {
    localStorage.setItem('loggedUser', '');
    localStorage.setItem('loggedUserPass', '');
    resolve();
});
