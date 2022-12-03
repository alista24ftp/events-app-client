import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import './App.css';
import { ApiUsagePage } from './features/api-usage/pages/api-usage-page';
import { DbPopulationPage } from './features/db-population/pages';
import { EventsPage } from './features/events/pages/events-page';

function App() {
  return (
    <div className="App">
        <Router>
            <div className="links">
                <Link className="app-link" to={"/"}>Events (User Stories 1,3,4-Choose Area and Severity)</Link>
                <Link className="app-link" to={"/db-population"}>DB Actions (User Story 2)</Link>
                <Link className="app-link" to={"/api-usage"}>API Usage (User Story 5)</Link>
            </div>
            <Routes>
                <Route path="/db-population" element={<DbPopulationPage />} />
                <Route path="/api-usage" element={<ApiUsagePage />} />
                <Route path="/" element={<EventsPage />} />
                <Route path="*" element={<EventsPage/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
