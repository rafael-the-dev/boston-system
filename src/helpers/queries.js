const getCategories = () => {
    return fetch('http://localhost:3000/api/categories')
            .then(res => res.json())
            .then(data => [ { Descricao: "Todos", idGrupo: -1 }, ...data ])
};

const getProducts = () => {
    return fetch('http://localhost:3000/api/products')
        .then(res => res.json())
};

export {
    getCategories,
    getProducts
};