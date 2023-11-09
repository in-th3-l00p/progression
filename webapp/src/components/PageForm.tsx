import React from "react";

interface PageFormProps {
    title?: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    error?: string;
    children?: React.ReactNode;
}

const PageForm: React.FC<PageFormProps> = ({
       title,
       onSubmit,
       error,
       children
}) => {
    return (
        <form
            onSubmit={onSubmit}
            className={
                "flex flex-col items-center " +
                "py-16 px-4 gap-16 mx-auto md:mx-16"
            }
            style={{
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "600px",
            }}
        >
            {title && (
                <h1 className={"font-bold text-4xl text-center"}>{title}</h1>
            )}
            {error && <p className={"text-center text-xl text-danger"}>{error}</p>}
            {children}
        </form>
    );
}

export default PageForm;