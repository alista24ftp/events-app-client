import _, { update } from "lodash";

export interface ApiUsage {
    id?: number,
    method: string,
    path: string,
    user_agent?: string,
    origin?: string,
    createdAt?: string,
    updatedAt?: string,
    req_count?: number,
};

export const toApiUsage = (data: any): ApiUsage | undefined => {
    const id = _.get(data, "id");
    const method = _.get(data, "method");
    const path = _.get(data, "path");
    const ua = _.get(data, "user_agent");
    const origin = _.get(data, "origin");
    const createdAt = _.get(data, "createdAt");
    const updatedAt = _.get(data, "updatedAt");
    const reqCount = _.get(data, "req_count");

    if (_.isNil(method) || !_.isString(method) || !_.isNil(path) || !_.isString(path)) return undefined;

    const apiUsage: ApiUsage = { method, path };
    if (!_.isNil(id) && !_.isNaN(Number(id)) && Number(id) > 0) {
        apiUsage.id = id;
    }
    if (!_.isNil(ua) && _.isString(ua)) {
        apiUsage.user_agent = ua;
    }
    if (!_.isNil(origin) && _.isString(origin)) {
        apiUsage.origin = origin;
    }
    if (!_.isNil(createdAt) && _.isString(createdAt)) {
        apiUsage.createdAt = createdAt;
    }
    if (!_.isNil(updatedAt) && _.isString(updatedAt)) {
        apiUsage.updatedAt = updatedAt;
    }
    if (!_.isNil(reqCount) && !_.isNaN(Number(reqCount))) {
        apiUsage.req_count = reqCount;
    }
    return apiUsage;
};
