import React, {useState} from "react";
import "../../styles/forms.css";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import PageForm from "../../components/PageForm";
import {progressionsAPI, ProgressionTargetMeasurement} from "../../api/progressionsAPI";
import {ValidationError} from "../../api/api";

const ProgressionCreate = () => {
    const Spacer = () => {
        return (
            <span
                className={"block w-full bg-text"}
                style={{ height: "1px" }}
            />
        );
    }

    const [unit, setUnit] = useState<string>("days");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<ValidationError>();

    return (
        <PageForm
            title={"Create a progression"}
            onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const target = data.get("target");
                if (typeof target !== "string")
                    return;
                progressionsAPI.create(
                    data.get("name")! as string,
                    description,
                    data.get("unit")! as ProgressionTargetMeasurement,
                    parseInt(target)
                )
                    .then(() => window.location.href = "/dashboard")
                    .catch(setError);
            }}
            error={error?.message}
        >
            <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    type="text"
                    className="form-input"
                    name={"name"} id={"name"}
                />
            </div>
            <Spacer />
            <div className={"flex flex-col items-center gap-8"}>
                <label htmlFor="description" className={"form-label"}>Description:</label>
                <ReactQuill
                    theme="snow"
                    className={"h-64 mb-16"}
                    value={description}
                    onChange={setDescription}
                />
            </div>
            <Spacer />
            <div className="form-group">
                <label htmlFor="unit" className="form-label">Target measured in:</label>
                <select
                    className="form-input"
                    name={"unit"} id={"unit"}
                    onChange={(e) => setUnit(e.target.value)}
                >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="target" className="form-label">Goals / {unit}:</label>
                <input
                    type="number"
                    className="form-input"
                    name={"target"} id={"target"}
                />
            </div>
            <button
                type={"submit"}
                className={"btn text-2xl"}
            >
                Create
            </button>
        </PageForm>
    );
}

export default ProgressionCreate;