import './UserWeightCal.css';
import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect/*, PureComponent*/ } from 'react';
import { BarChart, Bar, /*Cell,*/XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function UserWeightCal (props) {
    const params = useParams();
    const userId = params.id;
    let userIdNumber = parseInt(userId)
    const getData = props.dataSource;
    // The params and user id variables are used to retrieve the user's id stocked in the HTML, which is then parsed as an integer in the userIdNumber variable
    // The getData function is used to retrieve the data props, which are received from a parent element in the App file

    const [userData, setUserData] = useState([]);

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

    // userData is a state that receives its data via setUserData, provided that the received data is not "undefined"
    // In the case of non-undefined data, the data from the props is sent to the state, otherwise, the string "false" is sent

 
    const dayFormat = (value) => {
        const valueDay = value.split('-')
        
        return (Number(valueDay[2]))
    }

    /* The function dayFormat takes in a value as an argument and returns the day of the month in that value. 
    The value is first split into an array by the - character, and then the third item in the array (which is the day of the month) 
    is converted to a number using Number() and returned
    */
    

    /**
 * Format Tooltip
 * @param {array} payload - source data
 * @param {boolean} active - is Tootip active
 * @returns data.value on hover
 */

    function tooltipWeightCal ({payload, active}) {
        if (active) {
            return (
                <div className='activity-chart-tooltip'>
                    <div>{`${payload[0].value}`}kg</div>
                    <div>{`${payload[1].value}`}Kcal</div>
                </div>
            )
        }
        return null
    }

    //tooltipWeightCal displays a tooltip when a data point is active in the chart


    if(userData !== "false"){
    return (
        <div className='user-weight-cal'>
            <ResponsiveContainer width="100%" aspect={2}>
                <BarChart
                data={userData?.sessions}
                margin={{ top: 80, right: 48, bottom: 32, left: 48 }}
                barGap={5}
                barCategoryGap="37%"
                >
                
                <CartesianGrid 
                strokeDasharray="3 3"
                vertical='false'
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

                <Tooltip content={tooltipWeightCal} />

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
