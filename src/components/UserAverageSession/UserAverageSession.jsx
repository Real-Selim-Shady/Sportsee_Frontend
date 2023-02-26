import "./UserAverageSession.css";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";


/**
 * @description Function rendering user average sessions on a line chart
 */
function UserAverageSession (props) {

    /**
     * @description Retrieving the data source from the props
     * dataSource provides data used for the chart, idChecker provides id check
     * @type {Array}
     */
    const getData = props.dataSource;
    const getIdChecker = props.idChecker;


    /**
     * The userData state that stores the user's session data
     * @type {Array}
     */
    const [userData, setUserData] = useState();

    /**
     * The useEffect hook that sets the userData state to the data from the data source
     * userData is a state that receives its data via setUserData
     */
    useEffect(()=>{
        const dataToUse = () => {
          if(getData !== undefined) {
              setUserData(getData);
          }
        };
        dataToUse();
      },[getData]);

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
            );
        }
        return null;
    }


    /**
     * An array that holds the week day abbreviations along with two additional data points, one at the beginning and one at the end.
     * @type {Array}
     */
    const dayAbbreviations = ["","L", "M", "M", "J", "V", "S", "D", ""];

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
    }
    

    /**
     * This component is used to display the average session duration for the user.
     * If the state idChecker has stored the string 'false', the user is redirected to the error page
     * The chart will show the session duration on the Y-axis and the days on the X-axis.
     * The tooltip will display the session duration.
     * @component
     * @param {string} userData - The data of the user.
     * @param {Array} sessions - An array of objects that contains the session data.
     * @param {Function} tooltipAverageSession - A function that returns the content for the tooltip.
     * @param {Object} dayAbbreviations - An object that contains the abbreviations for the days.
     */
    if(getIdChecker !== 0){
    return (
        <div className='user-average-session'>
            <p className='user-as-title'>Durée moyenne des <br/> sessions</p>
            <ResponsiveContainer width='100%' aspect={2} className='line-chart-bloc'>
                <LineChart width={100} height={100} data={sessions}>
                    <Tooltip
                    content={tooltipAverageSession}
                     />
                    <XAxis
                    className='x-axis' 
                    dataKey='day'
                    padding={{ left: -17, right: -17 }}
                    stroke='transparent'
                    axisLine={false} 
                    tick={{ fill: "rgba(255, 255, 255, 0.5)" }}
                    tickSize='15'
                    tickFormatter={(day) => dayAbbreviations[day]}
                     />
                     <YAxis 
                     hide={true} 
                      />
                    <Line 
                    className='chart-line'
                    type='monotone' 
                    dataKey='sessionLength' 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{  
                        stroke: "rgba(255, 255, 255, 0.5)",
                        strokeWidth: 7,
                        r: 3
                    }}
                    stroke={"url(#line-gradient)"}
                     />
                    <defs>
                        <linearGradient id='line-gradient' x1='0' y1='0' x2='3' y2='0'>
                            <stop offset='10%' stopColor='rgba(255, 255, 255, 0.50)' />
                            <stop offset='30%' stopColor='rgba(255, 255, 255, 1.00)' />
                        </linearGradient>
                    </defs>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );}else{
        return(
        <div>
            <Navigate replace to='/user/404/Error' />
        </div>
        );
    }

}


UserAverageSession.propTypes = {
    dataSource: PropTypes.shape({
      sessions: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.number.isRequired,
          sessionLength: PropTypes.number.isRequired,
        })
      ),
    }),
    idChecker: PropTypes.number,
  };

export default UserAverageSession;
