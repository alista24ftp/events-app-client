import axios from "axios";
import { API_SERVER_HOST } from "../../../config/api";
import { Area } from "../models/area";

const fetchAreas = async (): Promise<Area[]> => {
    try {
        const res = await axios.get(`${API_SERVER_HOST}/api/v1/areas`);
        if (res.status !== 200) {
            return [];
        }

        return res.data as Area[];
    } catch (e) {
        return [];
    }
};

export { fetchAreas };
