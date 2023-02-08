import './UserScore.css';
import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";


function UserScore (props) {

    /**
     * Destructuring the useParams hook to retrieve the user id
     */
    const params = useParams();
    const userId = params.id;

    /**
     * Parsing the user id from string to integer
     * @type {number}
     */
    let userIdNumber = parseInt(userId)

    /**
     * Retrieving the data source from the props
     * @type {Array}
     */
    const getData = props.dataSource;
    // The params and user id variables are used to retrieve the user's id stocked in the HTML, which is then parsed as an integer in the userIdNumber variable
    // The getData function is used to retrieve the data props, which are received from a parent element in the App file

    /**
     * The userData state that stores the user's session data
     * @type {Array}
     */
    const [userData, setUserData] = useState([]);

    /**
     * The useEffect hook that sets the userData state to the data from the data source
     * userData is a state that receives its data via setUserData, provided that the received data is not "undefined"
     * In the case of non-undefined data, the data from the props is sent to the state, otherwise, the string "false" is sent
     */
    useEffect(()=>{
        const dataToUse = () => {
        if(getData !== undefined) {
            const element = getData.find((data) => data.id === userIdNumber);
            setUserData(element);
            if(element === undefined) {
            setUserData("false")
            }
        }
        };
        dataToUse();
    },[userIdNumber, getData])

    /**
     * An array that contains two objects representing the user's score information
     * @typedef {Object} Score
     * @property {number} todayScore - The rounded score, calculated as the rounded value of either "todayScore" property of the "userData" object (if it exists), or the "score" property of the "userData" object (if "todayScore" does not exist)
     * @property {string} fill - The fill color, either "red" or "transparent"
     */
    const score = [
        {
        "todayScore": Math.round(userData?.todayScore * 100) || Math.round(userData?.score * 100),
        "fill": "red"
        },
        {
        "todayScore": 100,
        "fill": "transparent"
        }
    ];

    /* The const defines an array score that contains two objects representing the user's score information. 
    The first object "todayScore" calculates the score by rounding the value of either "todayScore" property of the "userData" object (if it exists), or the "score" 
    property of the "userData" object (if "todayScore" does not exist), as the data is not homogenized on both users. 
    The second object sets the "todayScore" to 100 and "fill" to "transparent". this permits the cercle of the chart to not stay at 100%, but to compare
    both the objects and set the cercle of the chart to the right percentage of the todayScore/score */


    /**
     * This function displays a score chart with a percentage representing the rounded score of either the "todayScore" property of the "userData" object (if it exists), or the "score" property of the "userData" object (if "todayScore" does not exist).
     * If the state has stored the string "false", the user is redirected to the error page
     * @param {object} userData - An object containing user's data
     * @returns {JSX.Element} A React component representing the score chart or the error page
     */
    if(userData !== "false"){
    return (
        <div className='user-score'>
            <p className='score-title'>Score</p>
            <ResponsiveContainer>
                <RadialBarChart 
                className='user-score-chart'
                data={score} 
                innerRadius="50%" 
                startAngle={90} 
                endAngle={450}
                >
                    <RadialBar 
                    dataKey="todayScore" 
                    barSize={9}
                    cornerRadius="100%" />
                </RadialBarChart>
            </ResponsiveContainer>
            <div>
                <p className='score-percentage'>{Math.round(userData?.todayScore * 100) || Math.round(userData?.score * 100)}%</p>
                <p className='score-txt'>de votre <br/> objectif</p>
            </div>
        </div>
    )}else{
        return(
        <div>
            <Navigate replace to="/Error404" />
        </div>
        )
    }

    // If the state has stored the string "false", the user is redirected to the error page

}

export default UserScore