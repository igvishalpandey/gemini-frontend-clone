import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { toggleDarkMode } from "../../store/Slices/ThemeSlice";

const ThemeToggler = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);

    const handleToggle = () => dispatch(toggleDarkMode());

    useEffect(() => {
        if (darkMode)
            document.documentElement.classList.add("dark");
        else
            document.documentElement.classList.remove("dark");
    }, [darkMode]);

    return (
        <div
            onClick={handleToggle}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleToggle();
            }}
            className="select-none rounded-full w-10 h-10 flex justify-center items-center font-semibold border-0 bg-zinc-100 hover:cursor-pointer dark:bg-zinc-700  hover:bg-zinc-300 dark:hover:bg-zinc-600"
        >

            {darkMode ? (
                "🌙"
            ) : (
                "☀️"
            )}
        </div>
    );
};

export default ThemeToggler;