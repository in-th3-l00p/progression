import React, {useState} from "react";
import style from "../styles/header.module.css";
import AuthContext from "../contexts/AuthContext";

const Header = () => {
    const { user } = React.useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className={
            "relative flex flex-wrap items-center justify-between " +
            "px-8 md:px-16 py-4 border-b-2 border-b-text bg-lighter-background"
        }>
            <a href="/dashboard" className={"flex items-center gap-4"}>
                <img
                    src="/logo500.png"
                    alt="logo"
                    className={"w-8 h-8 hover:rotate-12 transition-transform"}
                />
                <h2 className={"text-3xl"}>Progression</h2>
            </a>
            <div className={"relative"}>
                <button
                    className={
                        "top-0 left-0 bg-background z-30 p-4 rounded-full default-shadow " +
                        "hover:bg-zinc-700 hover:shadow-none transition-colors"
                    }
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <img
                        src={"/icons/profile.svg"}
                        alt={"Profile"}
                        style={{ filter: "invert(100%)" }}
                        className={"w-8 h-8"}
                    />
                </button>
                <ul className={
                    "absolute z-20 top-full -translate-x-1/2 " +
                    "flex flex-col justify-around items-center gap-4 " +
                    "list-style-none bg-background p-4 rounded-lg " +
                    "default-shadow transition-transform transform" +
                    (showDropdown ? " opacity-100 scale-100" : "opacity-0 scale-95 hidden")
                }>
                    {user ? (
                        <>
                            <li className={style.dropdownListItem}>
                                <a href="/logout" className={style.dropdownLink}>
                                    <img
                                        src="/icons/logout.svg"
                                        alt="logout"
                                        className={style.dropdownIcon}
                                    />
                                    Logout
                                </a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={style.dropdownListItem}>
                                <a href="/login" className={style.dropdownLink}>
                                    <img
                                        src="/icons/login.svg"
                                        alt="logout"
                                        className={style.dropdownIcon}
                                    />
                                    Login
                                </a>
                            </li>
                            <li className={style.dropdownListItem}>
                                <a href="/register" className={style.dropdownLink}>
                                    <img
                                        src="/icons/register.svg"
                                        alt="logout"
                                        className={style.dropdownIcon}
                                    />
                                    Register
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {showDropdown && (
                <button
                    className={
                        "top-0 left-0 z-10 absolute w-screen h-screen " +
                        "cursor-default bg-background " +
                        style.dropdownHider
                    }
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </header>
    );
}

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <span className={"fixed top-0 left-0 w-screen h-screen opacity-20 -z-20 blur-xl"}>
                <div
                    className={
                        "absolute top-10 left-28 " +
                        "w-48 h-48 rounded-full bg-green"
                    }
                />
                <div
                    className={
                        "absolute top-20 left-64 " +
                        "w-48 h-48 rounded-full bg-dark-green"
                    }
                />
                <div
                    className={
                        "absolute bottom-32 left-32 " +
                        "w-32 h-64 rounded-full bg-accent"
                    }
                />
                <div
                    className={
                        "absolute bottom-32 left-48 " +
                        "w-32 h-48 rounded-full bg-accent"
                    }
                />
                <div
                    className={
                        "absolute bottom-64 left-48 " +
                        "w-64 h-48 rounded-full bg-dark-green blur-xl"
                    }
                />
            </span>
        </div>
    );
}

export default Layout;