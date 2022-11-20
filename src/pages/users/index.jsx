
import { fetchHelper } from "src/helpers/queries";

import Card from "src/components/users-page/user-card"

export const getStaticProps = async () => {
    let users = [];

    try {
        users = await fetchHelper({ options: {}, url: `${process.env.SERVER}/api/users` });
    } catch(e) {

    }
    
    return {
        props: {
            users
        },
        revalidate: 59
    }
};

const Container = ({ users }) => {

    return (
        <main>
            <div className="px-5">
                {
                    users.map(user => (
                        <Card { ...user } key={user.username} />
                    ))
                }
            </div>
        </main>
    );
};

export default Container;