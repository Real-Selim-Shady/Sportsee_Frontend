import './UserScore.css';
import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import PropTypes from 'prop-types';


function UserScore (props) {


    /**
     * @description Retrieving the data source from the props
     * dataSource provides data used for the chart, idChecker provides id check
     * @type {Array}
     */
    const getData = props.dataSource;
    const getIdChecker = props.idChecker;

    /**
     * @description The userData state that stores the user's session data
     * @type {Array}
     */
    const [userData, setUserData] = useState();

    /**
     * @description The useEffect hook that sets the userData state to the data from the data source
     * userData is a state that receives its data via setUserData
     */
    useEffect(()=>{
        const dataToUse = () => {
          if(getData !== undefined) {
              setUserData(getData)
          }
        };
        dataToUse();
      },[getData])

    /**
     * @description An array that contains two objects representing the user's score information
     * The first object "todayScore" calculates the score by rounding the value of either "todayScore" property of the "userData" object (if it exists), or the "score" 
        property of the "userData" object (if "todayScore" does not exist), as the data is not homogenized on both users. 
        The second object sets the "todayScore" to 100 and "fill" to "transparent". this permits the cercle of the chart to not stay at 100%, but to compare
        both the objects and set the cercle of the chart to the right percentage of the todayScore/score
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

    /**
     * @description This function displays a score chart with a percentage representing the rounded score of either the "todayScore" property of the "userData" object (if it exists), or the "score" property of the "userData" object (if "todayScore" does not exist).
     * If the state idChecker has stored the string "false", the user is redirected to the error page
     * @param {object} userData - An object containing user's data
     * @returns {JSX.Element} A React component representing the score chart or the error page
     */
    if(getIdChecker !== 0){
    return (
        <div className='user-score'>
            <p className='score-title'>Score</p>
                <ResponsiveContainer width="130%" aspect={1}>
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
                        cornerRadius="100%"
                         />
                    </RadialBarChart>
                </ResponsiveContainer>
            <div className='score-txt-container'>
                <p className='score-percentage'>{Math.round(userData?.todayScore * 100) || Math.round(userData?.score * 100)}%</p>
                <p className='score-txt'>de votre <br/> objectif</p>
                <div className='txt-background'></div>
            </div>

        </div>
    )}else{
        return(
        <div>
            <Navigate replace to="/user/404/Error" />
        </div>
        )
    }

}

UserScore.propTypes = {
    dataSource: PropTypes.object,
    idChecker: PropTypes.number,
};

export default UserScore

