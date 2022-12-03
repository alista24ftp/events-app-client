const SeverityEnum = {
    UNKNOWN: "UNKNOWN",
    MINOR: "MINOR",
    MODERATE: "MODERATE",
    MAJOR: "MAJOR",
} as const;

export const severities = Object.keys(SeverityEnum);

export type Severity = keyof typeof SeverityEnum;

export const toSeverity = (str: string): Severity | undefined => {
    return Object.keys(SeverityEnum).includes(str) ? (Object(SeverityEnum))[str] : undefined;
};
