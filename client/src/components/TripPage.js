import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { BASE_URL } from '../config';
// import '../styles/trippage.css';
import UserCard from './cards/UserCard';


// React Component
const TripPage = props => {

    const token = window.localStorage.getItem("auth_token");
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timezone: 'UTC',
        hour12: 'false',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    };

    // River State
    const [trip, setTrip] = useState({});
    const [river, setRiver] = useState({});
    const [tripLeader, setTripLeader] = useState({});
    const [access, setAccess] = useState([{}, {}]);
    const [putin, setPutin] = useState([35.082900, -84.491800,]);
    const [takeout, setTakeout] = useState([35.082900, -84.491800,]);
    const [center, setCenter] = useState([35.082900, -84.491800,]);
    const [zoom, setZoom] = useState(11);

    // Current User State
    const [user, setUser] = useState({});
    const [userBoats, setUserBoats] = useState([]);
    const [userVehicles, setUserVehicles] = useState([]);

    // Time State
    const [year, setYear] = useState('2020');
    const [month, setMonth] = useState('01');
    const [day, setDay] = useState('01');
    const [hour, setHour] = useState('01');
    const [tripDate, setTripDate] = useState(new Date);
    const [tripTime, setTripTime] = useState([])

    // Listen
    const updateYear = e => setYear(e.target.value);
    const updateMonth = e => setMonth(e.target.value);
    const updateDay = e => setDay(e.target.value);
    const updateHour = e => setHour(e.target.value);


    // Function
    const LeaderTimeControl = () => {
        if (user.id === tripLeader.id) {

            return (
                <div className="trippage-body__time-inputs-c">
                    <span>Year</span>
                    <select
                        className="trip-time__select"
                        id="trip-time__year"
                        value={year}
                        onChange={updateYear}>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                    <span>Month</span>
                    <select
                        className="trip-time__select"
                        id="trip-time__month"
                        value={month}
                        onChange={updateMonth}>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <span>Day</span>
                    <select
                        className="trip-time__select"
                        id="trip-time__day"
                        value={day}
                        onChange={updateDay}>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                    <span>Hour</span>
                    <select
                        className="trip-time__select"
                        id="trip-time__hour"
                        value={hour}
                        onChange={updateHour}>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </select>
                    <div
                        id="trippage-body__trip-time-edit"
                        onClick={setTime}>
                        <span>Set Time</span>
                    </div>
                </div>
            )
        } else {
            return null
        }
    };

    const setTime = async () => {
        const time = `${year}-${month}-${day}T${hour}:00:00`
        console.log(time);
        const res = await fetch(`${BASE_URL}/api/trips/${trip.id}/update`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(time)
        })
        if (!res.ok) {
            // -- TODO - Handling
            console.log("setTime res failure");
        } else {
            const json = await res.json();
            window.location.reload();
        }
    };


    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`${BASE_URL}/api/users/token`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) {
                // -- TODO -- Handling
                console.log("getUser res failure");
            } else {
                const json = await res.json();
                setUser(json.user);
                setUserBoats(json.boats);
                setUserVehicles(json.vehicles);
            }
        };
        getUser();

        // Fetch Trip Obj
        const getTrip = async () => {
            const res = await fetch(`${BASE_URL}/api/trips/${props.match.params.id}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) {
                // -- TODO Handling
                console.log("getTrip res failure");
            } else {
                const json = await res.json();
                const piLat = json.access[0].latitude;
                const piLon = json.access[0].longitude;
                const toLat = json.access[1].latitude;
                const toLon = json.access[1].longitude;
                setTrip(json.trip);
                setRiver(json.river);
                setTripLeader(json.trip_leader);
                setAccess(json.access);
                setCenter([piLat, toLon]);
                setPutin([piLat, piLon]);
                setTakeout([toLat, toLon]);

                const tripTime = new Date(json.trip.scheduled_time);
                setTripDate(
                    tripTime.toLocaleString('en-US', options).split(/[\,,\s]/)
                );
                setTripTime(
                    tripTime.toLocaleTimeString('en-US').split(/[:,\s]/)
                )

            }
        }
        getTrip();
    },[]);


// ---- Component Render ---- //

    // Render
    return (
        <div className="trippage-root--container">
            <div className="trippage">
                <div className="trippage__topbox">
                    <div className="trippage__infobox">
                        <div className="trippage--name-c">
                            <div className="trippage__tripname">
                                <span>{river.name}</span>
                            </div>
                        </div>
                        <div className="trippage__infotext--container">
                            <div className="trippage--region-c">
                                <div className="trippage__region">
                                    <span>Region: </span>
                                    <span>{river.region}</span>
                                </div>
                            </div>
                            <div className="trippage__access-c">
                                <div className="trippage__access">
                                    <span>Put in:</span>
                                    <span>{access[0].name}</span>
                                    <span>Take out:</span>
                                    <span>{access[1].name}</span>
                                </div>
                            </div>
                            <div className="trippage__details-c">
                                <div className="trippage__details">
                                    <div className="trippage__date">
                                        <span>Date: </span>
                                        <div className="trippage__date-value">
                                            <span>{tripDate[0]}</span>
                                            <span>{tripDate[2]}</span>
                                            <span>{tripDate[3]}</span>
                                            <span>{tripDate[4]}</span>
                                        </div>
                                    </div>
                                    <div className="trippage__time">
                                        <span>Time:</span>
                                        <span>{tripTime[0]}:{tripTime[1]}{tripTime[3]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="trippage__icon--container">
                        </div>
                    </div>
                    <div className="trippage__map-container">
                        <Map
                            center={center}
                            zoom={zoom}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={putin}>
                                {/* <Popup>{access[0].name}</Popup> */}
                            </Marker>
                            <Marker position={takeout}>
                                {/* <Popup>{access[1].name}</Popup> */}
                            </Marker>
                        </Map>
                    </div>
                </div>
                <div className="trippage-body">
                    <div className="trippage-bottombox">
                        <div className="trippage-bottombox__cards-c">
                            <div className="trippage-card trippage-boater--container">
                                <div className="trippage-card__header">
                                    <span>Boaters:</span>
                                    <div className="trippage-user--container">
                                        { user === tripLeader
                                            ? <UserCard user={user}/>
                                            : <UserCard user={tripLeader}/>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="trippage-card trippage-trips--container">
                                <div className="trippage-card__header">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* <div className="trippage-body__trip-c">
                        <div className="trippage-body__trip">
                            <div className="trippage-body__infobox">
                                <div className="trippage-body__infobox--trip-leader">
                                    <span>Trip Leader:</span>
                                    <span>{tripLeader.username}</span>
                                </div>
                                <div className="trippage-body__infobox--trip-time-c">
                                    <div className="trippage-body__infobox--trip-time">
                                        <span>Trip Time:</span>
                                        <span>{trip.scheduled_time}</span>
                                    </div>
                                    <LeaderTimeControl/>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
};
export default TripPage;
