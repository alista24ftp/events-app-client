import { FunctionComponent } from "react";
import moment from "moment";
import { Event } from "../models/event";
import { displayEventType } from "../models/event-type";
import "./event-list-item.scss";

interface Props {
    event: Event
};

const EventListItem: FunctionComponent<Props> = (props) => {
    const { event } = props;

    return (
        <div className="events-list__item">
            <div className="event-info">
                {event.id}
            </div>
            <div className="event-info">
                {event.headline}
            </div>
            <div className="event-info">
                {event.status}
            </div>
            <div className="event-info">
                {event.severity}
            </div>
            <div className="event-info">
                {displayEventType(event.event_type)}
            </div>
            <div className="event-info">
                {event.description ?? ""}
            </div>
            <div className="event-info">
                {moment(event.created, moment.defaultFormatUtc).format("YYYY-MM-DD hh:mmA")}
            </div>
            <div className="event-info">
                {(event.areas ?? []).map(a => a.name).join(", ")}
            </div>
        </div>
    );
};

export { EventListItem };
