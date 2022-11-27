
const fetchHelper = ({ options, url }) => {
    return fetch(url, options)
        .then(res => {
            if(res.status === 200) return res.json();

            throw new Error();
        })
};

const getAuthorizationHeader = () => ({
    headers: {
        Authorization: JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user.token
    }
});

const getCategories = ({ options }) => {
    return fetch(`${process.env.SERVER}/api/categories`, options)
            .then(res => res.json())
            .then(data => [ { Descricao: "All", idGrupo: -1 }, ...data ])
};

const getProducts = ({ options }) => {
    return fetch(`${process.env.SERVER}/api/products`, options)
        .then(res => res.json())
};

const getUsers = ({ options }) => {
    return fetch(`${process.env.SERVER}/api/users`, options)
        .then(res => res.json())
}

export {
    fetchHelper,
    getAuthorizationHeader,
    getCategories,
    getProducts,
    getUsers
};