import './UserPerf.css';
import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';


function UserPerf (props) {

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
     * @description Transforms the `kind` number into its corresponding string name
     * @param {number} kind - The number representing the kind of performance data
     * @return {string} The string name of the kind of performance data
     */
    const radarKind = (kind) => {
        switch (kind){
            case 1: return 'Cardio';
            case 2: return 'Energie';
            case 3: return 'Endurance';
            case 4: return 'Force';
            case 5: return 'Vitesse';
            case 6: return 'Intensité';
            default: return null;
        }
    }

    /**
     * @description Takes user's performance data
     * @type {Array}
     */
    const perfData = userData?.data

    /**
     * @description Sorts the performance data array based on the `kind` property
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


    /**
     * @description Set user's performance data to 0 before userData state is filled with data, avoiding console error 'NaN'
     * @type {Array}
     */
    const beforeSet = [
        {
            value: 0,
            kind: 0
        },
        {
            value: 0,
            kind: 0
        },
        {
            value: 0,
            kind: 0
        },
        {
            value: 0,
            kind: 0
        },
        {
            value: 0,
            kind: 0
        },
        {
            value: 0,
            kind: 0
        }
    ]

    /**
     * @description perfDataSorted permits to give an order to the user's performance data
     * @type {Array}
     */
    const perfDataSorted = perfData ? perfData?.sort(sortData) : beforeSet 

    /**
     * @description Renders the performance data in a radar chart
     * If the state idChecker has stored the string 'false', the user is redirected to the error page
     * @param {object} userData - An object containing user's data
     * @returns {JSX.Element} A React component representing the score chart or the error page
     */
    if(getIdChecker !== 0){
    return (
        <div className='user-perf'>
            <ResponsiveContainer>
                <RadarChart data={perfDataSorted} outerRadius={60} className='radar-chart' >
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis 
                        dataKey='kind' 
                        tickLine={false} 
                        tick={{ fontSize: 11, fontWeight: 400 }} 
                        stroke='#FFFFFF' 
                        tickFormatter={radarKind} />
                    <Radar dataKey='value' fill='#FF0101B2'/>
                </RadarChart> 
            </ResponsiveContainer>
        </div>
    )}else{
        return(
        <div>
            <Navigate replace to='/user/404/Error' />
        </div>
        )
    }

}

UserPerf.propTypes = {
    dataSource: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number,
        kind: PropTypes.number
      }))
    }),
    idChecker: PropTypes.number,
};

export default UserPerf

