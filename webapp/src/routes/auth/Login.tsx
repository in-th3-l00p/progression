import React, {useState} from "react";
import "../../styles/forms.css";
import PageForm from "../../components/PageForm";
import {auth} from "../../api/auth";

const Login = () => {
    const [error, setError] = useState<string>();

    return (
        <PageForm
            title={"Login"}
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                auth.login(
                    formData.get("email") as string,
                    formData.get("password") as string
                )
                    .then(() => window.location.href = "/dashboard")
                    .catch(e => setError(e.message));
            }}
            error={error}
        >
            <div className="form-group">
                <label htmlFor="email" className="form-label">
                    Email:
                </label>
                <input
                    type="email" className="form-input"
                    name="email" id="email"
                    placeholder="test@example.com"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input
                    type="password" className="form-input"
                    id="password" name="password"
                    placeholder={"********"}
                />
            </div>
            <button type={"submit"} className={"btn text-2xl"}>
                Login
            </button>
        </PageForm>
    );
}

export default Login;