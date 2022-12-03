import { FunctionComponent, useState } from "react";
import { resetDB, seedDB } from "../services";
import "./index.scss";

const DbPopulationPage: FunctionComponent = () => {
    const [dbActionMsg, setDbActionMsg] = useState<string>("");

    const handleResetDB = async () => {
        setDbActionMsg("Resetting DB...");
        const msg = await resetDB();
        setDbActionMsg(msg);
    };

    const handleSeedDB = async () => {
        setDbActionMsg("Seeding DB...");
        const msg = await seedDB();
        setDbActionMsg(msg);
    };

    return (
        <div className="db-population-page">
            <button 
                className="db-action-btn db-action-btn--reset"
                onClick={handleResetDB}
            >
                Reset DB
            </button>
            <button 
                className="db-action-btn db-action-btn--seed"
                onClick={handleSeedDB}
            >
                Seed DB
            </button>
            <div className="db-action-msg">
                {dbActionMsg}
            </div>
        </div>
    );
};

export { DbPopulationPage };
