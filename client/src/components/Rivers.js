import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import RiverCard from './cards/RiverCard';
import '../styles/rivers.css';


// React Component
const Rivers = props => {

    // State
    const token = window.localStorage.getItem("auth_token");
    const [rivers, setRivers] = useState([]);

    // Listen

    // Functions
    // const renderRiverCards = rivers => {
    //     // let i = rivers.length;
    //     // if (i <= 0) return;

    //     for (let i = rivers.length; i > 0; i--) {
    //         return (
    //             <RiverCard
    //                 river={rivers[i]}/>
    //         )
    //     }
    // }


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
    }, [])

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
                                                    river={river}
                                                    caput={props.caput}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Rivers;
