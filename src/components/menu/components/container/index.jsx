import { Typography} from "@mui/material";

import Link from "src/components/link";

const Container = () => {
    return (
        <aside className="bg-blue-700 h-screen">
            <div>
                <Link 
                    className="text-lg sm:text-xl md:text-2xl text-white uppercase"
                    href="/">
                    Logo
                </Link>
            </div>
        </aside>
    );
};

export default Container;