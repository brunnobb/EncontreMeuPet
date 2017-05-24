
export const redirectConsulta = (router, filter) => {
    const path = `/sc/consulta/${filter}`;
    router.history.push(path);
};

export const redirectDetalhes = (router, filter) => {
    const path = `/sc/aprovar/${filter}`;
    router.history.push(path);
};


export const redirectLogin = (router) => {
    const path = '/login';
    router.history.push(path);
};

export const redirectConfig = (router) => {
    const path = '/home/config/';
    router.history.push(path);
};


export const redirectHome = (router) => {
    const path = '/home/home';
    router.history.push(path);
};


export const redirectContato = (router) => {
    const path = '/contato';
    router.history.push(path);
};
