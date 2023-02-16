import './UserWeightCal.css';
import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect/*, PureComponent*/ } from 'react';
import { BarChart, Bar, /*Cell,*/XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function UserWeightCal (props) {

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
            const element = getData.find((data) => data.userId === userIdNumber);
            setUserData(element);
            if(element === undefined) {
            setUserData("false")
            }
        }
        };
        dataToUse();
    },[userIdNumber, getData]);

    /**
     * The function dayFormat takes in a value as an argument and returns the day of the month in that value. 
     * The value is first split into an array by the - character, and then the third item in the array (which is the day of the month) 
     * is converted to a number using Number() and returned
     * @param {string} value - The date value
     * @returns {number} The day of the month in the date value
     */
    const dayFormat = (value) => {
        const valueDay = value.split('-')
        
        return (Number(valueDay[2]))
    }

    /* The function dayFormat takes in a value as an argument and returns the day of the month in that value. 
    The value is first split into an array by the - character, and then the third item in the array (which is the day of the month) 
    is converted to a number using Number() and returned
    */
    

    /**
     * A function that returns the weight and calories tooltip
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
                
            )
        }
        return null
    }

    //tooltipWeightCal displays a tooltip when a data point is active in the chart

    /**
     * Renders the weight and calories data in a bar chart
     * If the state has stored the string "false", the user is redirected to the error page
     * @param {object} userData - An object containing user's data
     * @returns {JSX.Element} A React component representing the score chart or the error page
     */
    if(userData !== "false"){
    return (
        <div className='user-weight-cal'>
            <ResponsiveContainer width="98%" aspect={2} >
                <BarChart
                data={userData?.sessions}
                margin={{ top: 40, right: 35, bottom: 30, left: 35 }}
                barGap={5}
                barCategoryGap="37%"
                >
                
                <CartesianGrid 
                strokeDasharray="3 3"
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
                dataKey="kilogram" 
                tickSize="0"
                tickMargin="20"
                axisLine={false} 
                yAxisId="right" 
                orientation="right" 
                domain={["dataMin -1", "dataMax +2"]} 
                type="number" 
                tickCount="3" 
                 />

                <YAxis 
                dataKey="calories"
                yAxisId='left'
                orientation='left' 
                hide={true}
                type="number"
                 />

                <Tooltip 
                content={tooltipWeightCal}
                wrapperStyle={{ backgroundColor: "blue" }}
                 />

                <Legend
                verticalAlign='top' 
                align="right" 
                height={80} 
                iconType="circle"
                iconSize={8} 
                formatter={(value, entry, index) => (
                            <span className='weight-cal-legend'>{value}</span>)
                        }
                 />

                <Bar 
                dataKey="kilogram" 
                name="Poids (kg)" 
                fill="black" 
                yAxisId='right'
                radius={[50, 50, 0, 0]}
                 />

                <Bar 
                dataKey={"calories"} 
                name="Calories brûlées (cKal)" 
                fill="red" 
                radius={[50, 50, 0, 0]} 
                yAxisId="left"
                 />
                
                </BarChart>
            </ResponsiveContainer>
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

export default UserWeightCal

