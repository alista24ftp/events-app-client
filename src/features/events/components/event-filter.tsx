import { ChangeEvent, FunctionComponent } from "react";
import DateTime from "react-datetime";
import moment from "moment";
import { Area } from "../../areas/models/area";
import { EventSearchCondition } from "../models/event-search-condition";
import { displayEventType, EventType, eventTypes, toEventType } from "../models/event-type";
import { severities, toSeverity } from "../models/severity";
import "react-datetime/css/react-datetime.css";
import "./event-filter.scss";
import _ from "lodash";

interface Props {
    searchCond: EventSearchCondition,
    updateSearchCond: (newSearchCond: EventSearchCondition) => void,
    areas: Area[],
};

const EventFilter: FunctionComponent<Props> = (props) => {
    const { searchCond, updateSearchCond, areas } = props;

    const handleSelectEventType = (e: ChangeEvent<HTMLSelectElement>) => {
        const eventType = toEventType(e.target.value);
        if (eventType) {
            updateSearchCond({...searchCond, event_type: eventType});
        } else {
            updateSearchCond({...searchCond, event_type: undefined});
        }
    }

    const handleSelectSeverity = (e: ChangeEvent<HTMLSelectElement>) => {
        const severity = toSeverity(e.target.value);
        if (severity) {
            updateSearchCond({...searchCond, severity: severity});
        } else {
            updateSearchCond({...searchCond, severity: undefined});
        }
    }

    const handleSelectArea = (e: ChangeEvent<HTMLSelectElement>) => {
        const area = e.target.value;
        if (area.trim() !== "") {
            updateSearchCond({...searchCond, area: area.trim()});
        } else {
            updateSearchCond({...searchCond, area: undefined});
        }
    }

    const handleSelectStartDate = (startDt: string | moment.Moment) => {
        if (!_.isString(startDt)) {
            // Is valid datetime
            const dtStr = startDt.format(moment.defaultFormatUtc);
            updateSearchCond({...searchCond, start_date: dtStr});
        } else {
            updateSearchCond({...searchCond, start_date: undefined});
        }
    }

    return (
        <div className="event-filter">
            <div className="event-filter__title">Event Filters</div>
            <div className="event-filter__item">
                <div className="event-filter__header">Event Type</div>
                <div className="event-filter__input">
                    <select 
                        className="event-filter__select event-filter__select--type"
                        onChange={handleSelectEventType}
                        value={searchCond.event_type ? searchCond.event_type : ""}
                    >
                        <option value="">Not Selected</option>
                        {eventTypes.map(et => (
                            <option key={et} value={et}>
                                {displayEventType(et as EventType)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="event-filter__item">
                <div className="event-filter__header">Severity</div>
                <div className="event-filter__input">
                    <select 
                        className="event-filter__select event-filter__select--severity"
                        onChange={handleSelectSeverity}
                        value={searchCond.severity ? searchCond.severity : ""}
                    >
                        <option value="">Not Selected</option>
                        {severities.map(s => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="event-filter__item">
                <div className="event-filter__header">Area</div>
                <div className="event-filter__input">
                    <select 
                        className="event-filter__select event-filter__select--area"
                        onChange={handleSelectArea}
                        value={searchCond.area ? searchCond.area : ""}
                    >
                        <option value="">Not Selected</option>
                        {areas.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="event-filter__item">
                <div className="event-filter__header">Start Date</div>
                <div className="event-filter__input">
                    <DateTime 
                        className="event-filter__select event-filter__select--start"
                        value={searchCond.start_date ? moment(searchCond.start_date, moment.defaultFormatUtc) : undefined}
                        onChange={handleSelectStartDate}
                    />
                </div>
            </div>
        </div>
    );
};

export { EventFilter };
