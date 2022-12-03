import _ from "lodash";

export interface Area {
    url: string,
    id: string,
    name: string,
};

export const toArea = (data: any): Area | undefined => {
    const url = _.get(data, "url");
    const id = _.get(data, "id");
    const name = _.get(data, "name");

    if (_.isNil(url) || !_.isString(url)) return undefined;
    if (_.isNil(id) || !_.isString(id)) return undefined;
    if (_.isNil(name) || !_.isString(name)) return undefined;

    return {
        url: url.trim(),
        id: id.trim(),
        name: name.trim(),
    };
};
