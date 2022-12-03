import * as qs from "qs";
import axios from "axios";

import { API_SERVER_HOST } from "../../../config/api";
import { Event } from "../models/event";

const fetchEvents = async (queryObj: any): Promise<Event[]> => {
    try {
        const queryStr = qs.stringify(queryObj, { encode: false });
        const res = await axios.get(`${API_SERVER_HOST}/api/v1/events?${queryStr}`);
        if (res.status !== 200) {
            return [];
        }

        return res.data as Event[];
    } catch (e) {
        return [];
    }
};

export { fetchEvents };
