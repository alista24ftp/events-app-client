import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Area } from "../../areas/models/area";
import { fetchAreas } from "../../areas/services";
import { EventFilter } from "../components/event-filter";
import { EventList } from "../components/event-list";
import { Event } from "../models/event";
import { EventSearchCondition } from "../models/event-search-condition";
import { fetchEvents } from "../services";

const initialSearchCond: EventSearchCondition = {
    offset: 0,
};

const EventsPage: FunctionComponent = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [searchCond, setSearchCond] = useState<EventSearchCondition>(initialSearchCond);
    const [areas, setAreas] = useState<Area[]>([]);
    const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
    const defaultLimit = 20;

    const isFirstLoad = useRef(true);

    const getEvents = useCallback(async (overwrite: boolean, searchCond: EventSearchCondition, existing: Event[]) => {
        const fetchedEvents = await fetchEvents(searchCond);
        const newEvents = overwrite ? fetchedEvents : [...existing, ...fetchedEvents]
        setEvents(newEvents);
        setSearchCond({...searchCond, offset: newEvents.length});
        setShowLoadMore(fetchedEvents.length >= defaultLimit);
    }, []);

    const getAllAreas = useCallback(async () => {
        const newAreas = await fetchAreas();
        setAreas(newAreas);
    }, []);

    const updateSearchCond = (newSearchCond: EventSearchCondition) => {
        const updatedSearchCond: EventSearchCondition = {
            ...newSearchCond,
            offset: 0,
        };
        if (!updatedSearchCond.area) {
            delete updatedSearchCond.area;
        }
        if (!updatedSearchCond.start_date) {
            delete updatedSearchCond.start_date;
        }
        if (!updatedSearchCond.event_type) {
            delete updatedSearchCond.event_type;
        }
        if (!updatedSearchCond.severity) {
            delete updatedSearchCond.severity;
        }

        setSearchCond(updatedSearchCond);
        getEvents(true, updatedSearchCond, events);
    };
    
    useEffect(() => {
        if (isFirstLoad.current === true) {
            getEvents(true, initialSearchCond, []);
            getAllAreas();
            isFirstLoad.current = false;
        }
    }, [getEvents, getAllAreas]);

    const handleLoadMore = () => {
        const newSearchCond: EventSearchCondition = {
            ...searchCond,
            offset: events.length,
        };
        setSearchCond(newSearchCond);
        getEvents(false, newSearchCond, events);
    };

    return (
        <div className="events-page">
            <EventFilter 
                searchCond={searchCond} 
                updateSearchCond={updateSearchCond}
                areas={areas} 
            />
            <EventList events={events} />
            {showLoadMore ? (
                <button className="load-more-btn" onClick={handleLoadMore}>
                    Load More
                </button>
            ) : null}
        </div>
    );
};

export { EventsPage };
