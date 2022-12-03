import axios from "axios";
import { API_SERVER_HOST } from "../../../config/api";
import { ApiUsage } from "../models/api-usage";

const fetchApiUsageInfo = async (): Promise<ApiUsage[]> => {
    try {
        const res = await axios.get(`${API_SERVER_HOST}/api/v1/api-usage`);
        if (res.status !== 200) {
            return [];
        }

        return res.data as ApiUsage[];
    } catch (e) {
        return [];
    }
};

const fetchFullApiUsageInfo = async (offset: number): Promise<ApiUsage[]> => {
    try {
        const res = await axios.get(`${API_SERVER_HOST}/api/v1/api-usage?display=full&offset=${offset}`);
        if (res.status !== 200) {
            return [];
        }

        return res.data as ApiUsage[];
    } catch (e) {
        return [];
    }
};

export { fetchApiUsageInfo, fetchFullApiUsageInfo };
