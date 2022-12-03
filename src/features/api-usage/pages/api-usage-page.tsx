import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { ApiUsage } from "../models/api-usage";
import { fetchApiUsageInfo, fetchFullApiUsageInfo } from "../services";
import "./api-usage-page.scss";

const ApiUsagePage: FunctionComponent = () => {
    const [usageInfo, setUsageInfo] = useState<ApiUsage[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [isFull, setIsFull] = useState<boolean>(false);
    const defaultLimit = 20;
    const isFirstLoad = useRef(true);

    const getApiUsage = useCallback(async () => {
        const fetchedUsageInfo = await fetchApiUsageInfo();
        setUsageInfo(fetchedUsageInfo);
        setOffset(0);
        setLoadMore(false);
        setIsFull(false);
    }, []);

    const getFullApiUsage = useCallback(async (offset: number, existing: ApiUsage[]) => {
        const fetchedUsageInfo = await fetchFullApiUsageInfo(offset);
        const newUsageInfo = [...existing, ...fetchedUsageInfo];
        setUsageInfo(newUsageInfo);
        setOffset(newUsageInfo.length);
        setLoadMore(fetchedUsageInfo.length >= defaultLimit);
        setIsFull(true);
    }, []);

    useEffect(() => {
        if (isFirstLoad.current) {
            getApiUsage();
            isFirstLoad.current = false;
        }
    }, [getApiUsage]);

    const handleGetApiUsage = () => {
        getApiUsage();
    };

    const handleGetFullApiUsage = () => {
        getFullApiUsage(0, []);
    };

    const handleLoadMore = () => {
        getFullApiUsage(offset, usageInfo);
    };

    return (
        <div className="api-usage-page">
            <div className="api-usage-options">
                <button 
                    className="api-usage-options__btn api-usage-options__btn--stat"
                    onClick={handleGetApiUsage}
                >
                    Get Stats
                </button>
                <button 
                    className="api-usage-options__btn api-usage-options__btn--stat"
                    onClick={handleGetFullApiUsage}
                >
                    Get Full Usage
                </button>
            </div>
            {!isFull ? (
                <div className="api-usage-info api-usage-info--stat">
                    <div className="api-usage-info__header">Method</div>
                    <div className="api-usage-info__header">Path</div>
                    <div className="api-usage-info__header">Request Count</div>
                    {usageInfo.map(info => (
                        <div className="api-usage-info__item" key={`${info.method} ${info.path}`}>
                            <div className="api-usage-info__attr">
                                {info.method}
                            </div>
                            <div className="api-usage-info__attr">
                                {info.path}
                            </div>
                            <div className="api-usage-info__attr">
                                {info.req_count ?? 0}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="api-usage-info api-usage-info--full">
                    <div className="api-usage-info__header">ID</div>
                    <div className="api-usage-info__header">Method</div>
                    <div className="api-usage-info__header">Path</div>
                    <div className="api-usage-info__header">User-Agent</div>
                    <div className="api-usage-info__header">Origin</div>
                    <div className="api-usage-info__header">Time</div>
                    {usageInfo.map(info => (
                        <div className="api-usage-info__item" key={info.id!}>
                            <div className="api-usage-info__attr">
                                {info.id!}
                            </div>
                            <div className="api-usage-info__attr">
                                {info.method}
                            </div>
                            <div className="api-usage-info__attr">
                                {info.path}
                            </div>
                            <div className="api-usage-info__attr">
                                {info.user_agent ?? "<unknown>"}
                            </div>
                            <div className="api-usage-info__attr">
                                {info.origin ?? "<unknown>"}
                            </div>
                            <div className="api-usage-info__attr">
                                {moment(info.createdAt!, moment.defaultFormat).format("YYYY-MM-DD hh:mmA")}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {loadMore ? (
                <button className="load-more-btn" onClick={handleLoadMore}>
                    Load More
                </button>
            ) : null}
        </div>
    );
};

export { ApiUsagePage };
