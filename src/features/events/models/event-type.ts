const EventTypeEnum = {
    CONSTRUCTION: "CONSTRUCTION",
    SPECIAL_EVENT: "SPECIAL_EVENT",
    INCIDENT: "INCIDENT",
    WEATHER_CONDITION: "WEATHER_CONDITION",
    ROAD_CONDITION: "ROAD_CONDITION",
} as const;

export type EventType = keyof typeof EventTypeEnum;

export const eventTypes = Object.keys(EventTypeEnum);

export const toEventType = (str: string): EventType | undefined => {
    return Object.keys(EventTypeEnum).includes(str) ? (Object(EventTypeEnum))[str] : undefined;
};

export const displayEventType = (eventType: EventType): string => {
    return String(eventType).replaceAll("_", " ");
};
