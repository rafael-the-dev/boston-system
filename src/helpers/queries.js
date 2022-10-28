
const getCategories = ({ options }) => {
    return fetch('http://localhost:3000/api/categories', options)
            .then(res => res.json())
            .then(data => [ { Descricao: "Todos", idGrupo: -1 }, ...data ])
};

const getProducts = ({ options }) => {
    return fetch('http://localhost:3000/api/products', options)
        .then(res => res.json())
};

export {
    getCategories,
    getProducts
};