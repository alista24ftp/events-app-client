import _ from "lodash";

import { Area } from "../../areas/models/area";
import { EventSubtype } from "./event-subtype";
import { EventType } from "./event-type";
import { LineStringGeography, PointGeography } from "./geography";
import { Road } from "./road";
import { RecurringSchedule } from "./recurring-schedule";
import { Severity } from "./severity";

export interface Event {
    jurisdiction_url: string,
    url: string,
    id: string,
    headline: string,
    status: "ACTIVE" | "ARCHIVED",
    created: string, // DateTime string
    updated: string, // DateTime string
    description?: string,
    "+ivr_message"?: string,
    "+linear_reference_km"?: number,
    schedule: {
        recurring_schedules: RecurringSchedule[],
    } | {
        intervals: string[], // DateTime string array
    },
    event_type: EventType,
    event_subtypes?: EventSubtype[],
    severity: Severity,
    geography: PointGeography | LineStringGeography,
    roads?: Road[],
    areas?: Area[],
};
