import axios from "axios";
import { API_SERVER_HOST } from "../../../config/api";

const resetDB = async (): Promise<string> => {
    try {
        const res = await axios.delete(`${API_SERVER_HOST}/api/v1/db-population`);
        if (res.status !== 204) {
            return "Resetting DB failed";
        }

        return "Operation successful!";
    } catch (e) {
        return "Resetting DB failed";
    }
};

const seedDB = async (): Promise<string> => {
    try {
        const res = await axios.post(`${API_SERVER_HOST}/api/v1/db-population`);
        if (res.status !== 204) {
            return "Seeding DB failed";
        }

        return "Operation successful!";
    } catch (e) {
        return "Seeding DB failed";
    }
};

export { resetDB, seedDB };