import { FunctionComponent } from "react";
import { Event } from "../models/event";
import { EventListItem } from "./event-list-item";
import "./event-list.scss";

interface Props {
    events: Event[]
};

const EventList: FunctionComponent<Props> = (props) => {
    const { events } = props;

    return (
        <div className="events-list">
            <div className="events-list__header">Event ID</div>
            <div className="events-list__header">Headline</div>
            <div className="events-list__header">Status</div>
            <div className="events-list__header">Severity</div>
            <div className="events-list__header">Event Type</div>
            <div className="events-list__header">Description</div>
            <div className="events-list__header">Start Date</div>
            <div className="events-list__header">Affected Areas</div>
            {events.map(event => (
                <EventListItem key={event.id} event={event} />
            ))}
        </div>
    );
};

export { EventList };
