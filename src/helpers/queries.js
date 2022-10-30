
const fetchHelper = ({ options, url }) => {
    return fetch(url, options)
        .then(res => {
            if(res.status === 200) return res.json();

            throw new Error();
        })
};

const getCategories = ({ options }) => {
    return fetch(`${process.env.SERVER}/api/categories`, options)
            .then(res => res.json())
            .then(data => [ { Descricao: "Todos", idGrupo: -1 }, ...data ])
};

const getProducts = ({ options }) => {
    return fetch(`${process.env.SERVER}/api/products`, options)
        .then(res => res.json())
};

export {
    fetchHelper,
    getCategories,
    getProducts
};