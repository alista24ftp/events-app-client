import { EventType } from "./event-type";
import { Severity } from "./severity";

export interface EventSearchCondition {
    area?: string,
    start_date?: string,
    event_type?: EventType,
    severity?: Severity,
    offset: number,
};
