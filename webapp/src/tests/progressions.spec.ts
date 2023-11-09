import { progressionsAPI } from "../api/progressionsAPI";
import {loggedIn} from "../setupTests";

describe("api integration on progressions cruds", () => {
    it("gets the index", async () => {
        if (loggedIn) {
            const data = await progressionsAPI.getAll();
            expect(data.meta.current_page).toBe(1);
            expect(typeof data.meta.current_page).toBe("number");
            expect(typeof data.meta.total).toBe("number");
            expect(typeof data.meta.per_page).toBe("number");
            if (data.data.length > 0) {
                expect(typeof data.data[0].id).toBe("number");
                expect(typeof data.data[0].name).toBe("string");
                expect(typeof data.data[0].description).toBe("string");
                expect(typeof data.data[0].targetMeasurement).toBe("string");
                expect(typeof data.data[0].target).toBe("number");
                expect(data.data[0].createdAt.getTime()).not.toBe(NaN);
            }
        }
    });
})