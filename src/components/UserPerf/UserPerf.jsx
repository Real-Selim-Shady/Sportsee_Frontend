import './UserPerf.css';
import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { getAPIUserPerformance } from '../../services/ApiCalls';


function UserPerf (props) {

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
    const [userData, setUserData] = useState(["before set"]);
    const [idChecker, setIdChecker] = useState([]);

    /**
     * The useEffect hook that sets the userData state to the data from the data source
     * userData is a state that receives its data via setUserData, provided that the received data is not "undefined"
     * In the case of non-undefined data, the data from the props is sent to the state, otherwise, the string "false" is sent
     */
    useEffect(()=>{
      const dataToUse = () => {
        if(getData !== undefined) {
            getAPIUserPerformance(userIdNumber)
          .then((data) => setUserData(data))
        }
      };
      const idCheckerFunction = () => {
        if(getData !== undefined) {
            getAPIUserPerformance(userIdNumber)
          .then((data) => setIdChecker(data.id))
          .catch(error => setIdChecker("false"))
        }
      };
      dataToUse();
      idCheckerFunction();
    },[userIdNumber, getData])

    
    /*useEffect(()=>{
    const dataToUse = () => {
    if(getData !== undefined) {
        const element = getData.find((data) => data.userId === userIdNumber);
        setUserData(element); 
        if(element === undefined) {
        setUserData("false")
        }
    }
    };
    dataToUse();
    },[userIdNumber, getData])*/


    /**
     * Transforms the `kind` number into its corresponding string name
     * @param {number} kind - The number representing the kind of performance data
     * @return {string} The string name of the kind of performance data
     */
    const radarKind = (kind) => {
        switch (kind){
            case 1: return "Cardio";
            case 2: return "Energie";
            case 3: return "Endurance";
            case 4: return "Force";
            case 5: return "Vitesse";
            case 6: return "Intensité";
            default: return null;
        }
    }

    // radarKind transforms the numbers found at kind to their name

    const perfData = userData?.data

    /**
     * Sorts the performance data array based on the `kind` property
     * @param {Object} a - The first object in the array
     * @param {Object} b - The second object in the array
     * @return {number} The sort order of the two objects based on the `kind` property
     */
    const sortData = (a, b) => {
        if (a.kind === 6) return -1;
        if (b.kind === 6) return 1;
        if (a.kind === 5) return -1;
        if (b.kind === 5) return 1;
        if (a.kind === 4) return -1;
        if (b.kind === 4) return 1;
        if (a.kind === 3) return -1;
        if (b.kind === 3) return 1;
        if (a.kind === 2) return -1;
        if (b.kind === 2) return 1;
        if (a.kind === 1) return -1;
        if (b.kind === 1) return 1;
        return 0;
    };

    // sortData permits to chose the order of the kind names

    const perfDataSorted = perfData?.sort(sortData)

    // perfDataSorted takes both the data stored in the state and put in perfData const and the order we want from sortData

    /**
     * Renders the performance data in a radar chart
     * If the state has stored the string "false", the user is redirected to the error page
     * @param {object} userData - An object containing user's data
     * @returns {JSX.Element} A React component representing the score chart or the error page
     */
    if(idChecker !== "false"){
    //const perfDataFiltered = perfDataSorted?.filter(data => typeof data.value === 'number' && !isNaN(data.value));
    if(userData[0] === "before set") { return null} else {
    return (
        <div className='user-perf'>
            <ResponsiveContainer>
                <RadarChart data={perfDataSorted} outerRadius={60} className="radar-chart" >
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis 
                        dataKey='kind' 
                        tickLine={false} 
                        tick={{ fontSize: 11, fontWeight: 400 }} 
                        stroke="#FFFFFF" 
                        tickFormatter={radarKind} />
                    <Radar dataKey='value' fill="#FF0101B2"/>
                </RadarChart> 
            </ResponsiveContainer>
        </div>
    )}}else{
        return(
        <div>
            <Navigate replace to="/Error404" />
        </div>
        )
    }

    // If the state has stored the string "false", the user is redirected to the error page

}

export default UserPerf


/*
useEffect(()=>{
    const dataToUse = () => {
    if(getData !== undefined) {
        const element = getData.find((data) => data.userId === userIdNumber);
        setUserData(element); 
        if(element === undefined) {
        setUserData("false")
        }
    }
    };
    dataToUse();
},[userIdNumber, getData])*/