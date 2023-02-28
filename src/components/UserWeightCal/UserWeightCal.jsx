import "./UserWeightCal.css";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";


/**
 * @description Function rendering user weight and burned calories on a bar chart
 */
function UserWeightCal (props) {

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
              setUserData(getData);
          }
        };
        dataToUse();
      },[getData]);

    /**
     * @description The function dayFormat takes in a value as an argument and returns the day of the month in that value. 
     * The value is first split into an array by the - character, and then the third item in the array (which is the day of the month) 
        is converted to a number using Number() and returned
     * @param {string} value - The date value
     * @returns {number} The day of the month in the date value
     */
    const dayFormat = (value) => {
        const valueString = value.toString();
        const valueDay = valueString.split("-");
        
        return (Number(valueDay[2]));
    };
    

    /**
     * @description A function that returns the weight and calories tooltip
     * @function
     * @param {Object} payload - The payload of the active data point 
     * @param {boolean} active - The state of the data point
     * @returns {JSX} The weight and calories tooltip, showing data.value on hover
     */
    function tooltipWeightCal ({payload, active}) {
        if (active) {
            return (
                <div className='weightCal-chart-tooltip' style={{ borderBlockColor: "red", padding: "10px" }}>
                    <div>{`${payload[0].value}`}kg</div>
                    <div>{`${payload[1].value}`}Kcal</div>
                </div>
                
            );
        }
        return null;
    }

    /**
     * @description Renders the weight and calories data in a bar chart
     * If the state idChecker has stored the string 'false', the user is redirected to the error page
     * @param {object} userData - An object containing user's data
     * @returns {JSX.Element} A React component representing the score chart or the error page
     */
    if(getIdChecker !== 0){
    return (
        <div className='user-weight-cal'>
            <ResponsiveContainer width='98%' aspect={2} >
                <BarChart
                data={userData?.sessions}
                margin={{ top: 40, right: 35, bottom: 30, left: 35 }}
                barGap={5}
                barCategoryGap='37%'
                >
                
                <CartesianGrid 
                strokeDasharray='3 3'
                vertical={false}
                height={1} 
                 />

                <XAxis 
                dataKey='day' 
                tickFormatter={dayFormat} 
                interval='preserveStartEnd' 
                tickSize='0' 
                tickMargin='20'
                 />

                <YAxis
                dataKey='kilogram' 
                tickSize='0'
                tickMargin='20'
                axisLine={false} 
                yAxisId='right' 
                orientation='right' 
                domain={["dataMin -1", "dataMax +2"]} 
                type='number' 
                tickCount='3' 
                 />

                <YAxis 
                dataKey='calories'
                yAxisId='left'
                orientation='left' 
                hide={true}
                type='number'
                 />

                <Tooltip 
                content={tooltipWeightCal}
                wrapperStyle={{ backgroundColor: "blue" }}
                 />

                <Legend
                verticalAlign='top' 
                align='right' 
                height={80} 
                iconType='circle'
                iconSize={8} 
                formatter={(value) => (
                            <span className='weight-cal-legend'>{value}</span>)
                        }
                 />

                <Bar 
                dataKey='kilogram' 
                name='Poids (kg)' 
                fill='black' 
                yAxisId='right'
                radius={[50, 50, 0, 0]}
                 />

                <Bar 
                dataKey={"calories"} 
                name='Calories brûlées (cKal)' 
                fill='red' 
                radius={[50, 50, 0, 0]} 
                yAxisId='left'
                 />
                
                </BarChart>
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

UserWeightCal.propTypes = {
    dataSource: PropTypes.shape({
      sessions: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.string,
          kilogram: PropTypes.number,
          calories: PropTypes.number,
        })
      ),
    }),
    idChecker: PropTypes.number,
};

export default UserWeightCal;

