import './UserAverageSession.css';
import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getAPIUserAverageSession } from '../../services/ApiCalls';


/**
 * A function that displays the average session duration of a user in a line chart
 * @function
 * @param {Object} props - The properties passed to the function
 * @property {Array} props.dataSource - The data source of the user's sessions 
 */
function UserAverageSession (props) {

    /**
     * Destructuring the useParams hook to retrieve the user id
     */
    const params = useParams();
    const userId = params.id;

    /**
     * Parsing the user id from string to integer
     * @type {number}
     */
    let userIdNumber = parseInt(userId);

    /**
     * Retrieving the data source from the props
     * @type {Array}
     */
    const getData = props.dataSource;

    /**
     * The userData state that stores the user's session data
     * @type {Array}
     */
    const [userData, setUserData] = useState([]);
    //const [userSessionDuration, setUserSessionDuration] = useState();

    /**
     * The useEffect hook that sets the userData state to the data from the data source
     * userData is a state that receives its data via setUserData, provided that the received data is not "undefined"
     * In the case of non-undefined data, the data from the props is sent to the state, otherwise, the string "false" is sent
     */
    useEffect(()=>{
        const dataToUse = () => {
        if(getData !== undefined) {
            getAPIUserAverageSession(userIdNumber)
            .then((data) => setUserData(data));
            //const element = getData.find((data) => data.userId === userIdNumber);
            //setUserData(element);
            if(getData /*if mockedData, change getData to element*/ === undefined) {
            setUserData("false")
            }
        }
        };
        dataToUse();
    },[userIdNumber, getData]);

    /**
     * A function that  displays a tooltip when a data point is active in the chart
     * @function
     * @param {Object} payload - The payload of the active data point 
     * @param {boolean} active - The state of the data point
     * @returns {JSX} The average session tooltip, showing data.value on hover
     */
    function tooltipAverageSession ({payload, active}) {
        if (active) {
            return (
                <div className='average-session-tooltip'>
                    <div>{`${payload[0].value}`} min</div>
                </div>
            )
        }
        return null
    };


    /**
     * An array that holds the week day abbreviations along with two additional data points, one at the beginning and one at the end.
     * @type {Array}
     */
    const dayAbbreviations = ['','L', 'M', 'M', 'J', 'V', 'S', 'D', ''];

    /**
     * An array that holds the structured user sessions data
     * @type {Array}
     */
    let sessions = [];

    /**
     * Adding the user's sessions data to the added sessions, added to allow the graph to start and end at the extremities of its formatting, giving a continuity effect.
     */
    if(userData?.sessions){
        sessions=[...userData.sessions];
        sessions.unshift(structuredClone(sessions[0]));
        sessions[0].day = 0;
        sessions.push(structuredClone(sessions[sessions.length-1]));
        sessions[sessions.length-1].day = 8;
    };
    

    /**
     * This component is used to display the average session duration for the user.
     * If the userData is not equal to false, the component will render a line chart using the sessions data.
     * The chart will show the session duration on the Y-axis and the days on the X-axis.
     * The tooltip will display the average session duration.
     * If userData is equal to false, the component will redirect the user to the Error404 page.
     * @component
     * @param {string} userData - The data of the user.
     * @param {Array} sessions - An array of objects that contains the session data.
     * @param {Function} tooltipAverageSession - A function that returns the content for the tooltip.
     * @param {Object} dayAbbreviations - An object that contains the abbreviations for the days.
     */
    if(userData !== "false"){
    return (
        <div className='user-average-session'>
            <p className='user-as-title'>Durée moyenne des <br/> sessions</p>
            <ResponsiveContainer width="100%" aspect={2} className="line-chart-bloc">
                <LineChart width={100} height={100} data={sessions}>
                    <Tooltip
                    content={tooltipAverageSession}
                     />
                    <XAxis
                    className='x-axis' 
                    dataKey="day"
                    padding={{ left: -17, right: -17 }}
                    stroke="transparent"
                    axisLine={false} 
                    tick={{ fill: 'rgba(255, 255, 255, 0.5)' }}
                    tickSize="15"
                    tickFormatter={(day) => dayAbbreviations[day]}
                     />
                     <YAxis 
                     hide={true} 
                      />
                    <Line 
                    className='chart-line'
                    type="monotone" 
                    dataKey="sessionLength" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{  
                        stroke: 'rgba(255, 255, 255, 0.5)',
                        strokeWidth: 7,
                        r: 3
                    }}
                    stroke={`url(#line-gradient)`}
                     />
                    <defs>
                        <linearGradient id="line-gradient" x1="0" y1="0" x2="3" y2="0">
                            <stop offset="10%" stopColor="rgba(255, 255, 255, 0.50)" />
                            <stop offset="30%" stopColor="rgba(255, 255, 255, 1.00)" />
                        </linearGradient>
                    </defs>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )}else{
        return(
        <div>
            <Navigate replace to="/Error404" />
        </div>
        )
    }


}

export default UserAverageSession
