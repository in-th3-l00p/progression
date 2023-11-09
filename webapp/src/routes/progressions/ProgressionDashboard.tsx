import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Progression, progressionsAPI} from "../../api/progressionsAPI";

import "./../../styles/dashboard.css";

const ProgressionDashboard = () => {
    const { id } = useParams();
    const [progression, setProgression] = useState<Progression>();

    useEffect(() => {
        progressionsAPI.get(parseInt(id!))
            .then(setProgression)
            .catch(err => window.location.href = "/dashboard");
    }, []);

    if (!progression)
        return <></>
    return (
        <>
            <section className={"px-4 pt-24 pb-8 md:pt-64 md:pb-16 relative border-b-2"}>
                <h1 className={"text-3xl font-bold text-center"}>{progression.name}</h1>
                <img
                    src="/demo/gym.jpg"
                    alt="banner"
                    className={"absolute top-0 left-0 -z-10 w-full h-full object-cover object-center"}
                    style={{ filter: "brightness(40%)" }}
                />
            </section>
            <div className={"py-8 px-4 md:px-16 gap-8 mb-8"}>
                <section className={"dashboard-container p-8"}>
                    <h2 className={"text-2xl mb-2"}>
                        Target:<br/>
                    </h2>
                    <p className={"break-inside-avoid mb-8"}>
                            {progression.target} / {progression.targetMeasurement}
                    </p>
                    <h2 className={"text-2xl mb-2"}>Description</h2>
                    <div
                        dangerouslySetInnerHTML={{ __html: progression.description }}
                    />
                </section>
            </div>
        </>
    );
}

export default ProgressionDashboard;