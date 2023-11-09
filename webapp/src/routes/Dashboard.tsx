import React, {useEffect, useState} from "react";
import "../styles/dashboard.css";
import {Progression, progressionsAPI} from "../api/progressionsAPI";
import {Pagination} from "../api/api";

const Progressions = () => {
    const MAX_DESCRIPTION_LENGTH = 100;
    const [page, setPage] = useState(1);

    const [progressions, setProgressions] =
        React.useState<Pagination<Progression>>();
    useEffect(() => {
        progressionsAPI.getAll(page).then(setProgressions);
    }, [page])

    return (
        <section className={"dashboard-container h-full"}>
            {progressions?.data && (
                <ul className={"flex flex-col h-full"}>
                    {progressions.data.map((progression, index) => (
                        <li
                            key={progression.id}
                            className={
                                "p-0 w-full h-full " +
                                "hover:bg-background transition-colors " +
                                (index === 0 ? "rounded-t-md" : "")
                            }
                        >
                            <a
                                href={"/progressions/" + progression.id}
                                className={"block h-full p-8"}
                            >
                                <h2 className={"text-2xl"}>{progression.name}</h2>
                                <div
                                    className={"max-h-12 overflow-hidden"}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            progression.description.length > MAX_DESCRIPTION_LENGTH ?
                                                progression.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..." :
                                                progression.description
                                    }}
                                />
                            </a>
                        </li>
                    ))}

                    <li>
                        <ul className={"flex-shrink flex justify-center rounded-b-md py-4 gap-4"}>
                            {Array.from(new Array(
                                Math.ceil(progressions.meta.total / progressions.meta.per_page))
                            ).map((_, index) => (
                                <li key={index} className={"block p-0 aspect-square"}>
                                    <button
                                        disabled={index + 1 === page}
                                        onClick={() => setPage(index + 1)}
                                        className={
                                            "w-full h-full rounded-md p-4 bg-background " +
                                            "disabled:bg-zinc-700 disabled:hover:bg-zinc-700 " +
                                            "flex justify-center items-center " +
                                            "hover:bg-zinc-800 transition-colors"
                                        }>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            )}
            {progressions?.meta.total === 0 && (
                <span className={
                    "font-light text-dark-text text-center h-full " +
                    "flex flex-col justify-center items-center"
                }>
                    <h2 className={"text-2xl"}>You have no progressions</h2>
                    <h3 className={"text-xl"}>Click on the "create" button to add one</h3>
                </span>
            )}
        </section>
    );
}

const Dashboard = () => {
    return (
        <div className={"py-8 px-4 md:px-16 gap-8 mb-8"}>
            <section className={"flex gap-8 mb-8"}>
                <a className={"btn"} href={"/progressions/create"}>Create</a>
            </section>
            <div className={"grid gap-8 md:grid-cols-[1fr_0.3fr]"}>
                <Progressions />
                <section
                    className={
                        "dashboard-container p-16 " +
                        "flex flex-col items-center gap-16"
                    }
                >
                    <span className={"text-center"}>
                        <h2 className={"text-6xl mb-4"}>0 goals</h2>
                        <p className={"text-lg font-light"}>completed today</p>
                    </span>
                    <span className={"text-center"}>
                        <h2 className={"text-6xl mb-4"}>0 tasks</h2>
                        <p className={"text-lg font-light"}>completed today</p>
                    </span>
                    <span className={"text-center"}>
                        <h2 className={"text-6xl mb-4"}>0 posts</h2>
                        <p className={"text-lg font-light"}>posted today</p>
                    </span>
                    <span className={"text-center"}>
                        <h2 className={"text-6xl mb-4"}>0 notes</h2>
                        <p className={"text-lg font-light"}>written today</p>
                    </span>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;