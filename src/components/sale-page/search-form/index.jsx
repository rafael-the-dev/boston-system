
import { CategoriesCombobox } from "src/components/products-page"
import Input from "src/components/default-input";


const Container = ({ categories }) => {

    return (
        <form className="px-4 py-6 md:px-6">
            <div className="flex flex-wrap justify-between">
                <Input 
                    className="input w12"
                    label="Pesquisar por nome ou codigo de barra"
                />
                <CategoriesCombobox 
                    className="input w12"
                    categories={categories}
                />
            </div>
        </form>
    );
};

export default Container;