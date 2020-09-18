import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import RiverCard from './cards/RiverCard';
import '../styles/rivers.css';


// React Component
const Rivers = props => {

    // State
    const token = window.localStorage.getItem("auth_token");
    const [rivers, setRivers] = useState([]);
    const [pageViewRivers, setPageViewRivers] = useState([]);


    const RiverTab = props => {
        const count = pageViewRivers.length;
        const [currentTab, setCurrentTab] = useState(0);

        return (
            <div className="river-tab-root--container">
                <div className="river-tab">
                    <div className="river-tab__body">
                        { rivers.map((river) => <RiverCard
                                                    key={river[0].id}
                                                    river={river}/>
                        )}
                    </div>
                    <div className="river-tab__tabs"></div>
                </div>
            </div>
        )
    }



    useEffect(() => {
        const getRivers = async () => {
            const res = await fetch(`${BASE_URL}/api/rivers/`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) {
                // -- TODO -- Handling
                console.log("getRivers res failure")
            } else {
                const json = await res.json();
                setRivers(json.rivers);
            }
        }
        getRivers();
        const setRiversLimited = () => {
            const riversTabbed = [];
            const riversIndex = rivers.length;
            let i = Math.floor(riversIndex/20), k = 0;
            while (i > 0) {
                let items = rivers.slice(k, k+20);
                riversTabbed.push(items);
                i--;
                k+=20;
            };
            let items = rivers.slice(k, rivers.length+1);
            riversTabbed.push(items);
            setPageViewRivers(riversTabbed);
        };
        setRiversLimited();
    }, [rivers])

// ---- Component Render ---- //

    // Render
    return (
        <div className="rivers-root--container">
            <div className="rivers">
                <div className="rivers__search-bar--container">
                    <div className="rivers__search-bar">
                        <input
                            className="rivers__search-bar--input"
                            type="text"
                            placeholder="Search Rivers"/>
                        <div className="rivers__search-bar--button">
                            <img src="https://img.icons8.com/cotton/64/000000/search--v2.png"/>
                        </div>
                    </div>
                </div>
                <div className="rivers__cards-container">
                    <div className="rivers__cards">
                        { rivers.map((river) => <RiverCard
                                                    key={river[0].id}
                                                    river={river}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Rivers;
