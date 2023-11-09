import api, {Pagination, ValidationError} from "./api";
import {AxiosError, AxiosResponse} from "axios";

export type ProgressionTargetMeasurement = "days" | "weeks" | "months";

export interface Progression {
    id: number;
    name: string;
    description: string;
    targetMeasurement: ProgressionTargetMeasurement;
    target: number;
    createdAt: Date;
}

export namespace progressionsAPI {
    export async function getAll(page: number = 0)
        : Promise<Pagination<Progression>>
    {
        const response: AxiosResponse<Pagination<Progression>> = await api.get(
            "/api/progressions",
            { params: { page } }
        );
        response.data.data = response.data.data.map(progressionFromAPI);
        return response.data;
    }

    export async function get(id: number) {
        return progressionFromAPI((await api.get("/api/progressions/" + id)).data["data"]) as Progression;
    }

    export async function create(
        name: string,
        description: string,
        targetMeasurement: ProgressionTargetMeasurement,
        target: number
    ) : Promise<Progression> {
        try {
            const response: AxiosResponse<Progression> = await api.post("/api/progressions", {
                name,
                description,
                target_measurement: targetMeasurement,
                target
            }, {
                withCredentials: true
            });

            return progressionFromAPI(response.data);
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 422)
                throw err.response?.data as ValidationError;
            throw {
                message: "Server error",
                errors: {}
            } as ValidationError;
        }
    }

    function progressionFromAPI(response: any): Progression {
        return {
            id: response.id,
            name: response.name,
            description: response.description,
            targetMeasurement: response.target_measurement,
            target: response.target,
            createdAt: new Date(response["created_at"])
        };
    }
}