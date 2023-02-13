import './UserConsume.css';
import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

/**
 * UserConsume component, used to display the user's consumption data.
 * @function
 * @param {object} props - Props received from the parent component.
 * @param {object[]} props.dataSource - Data source for user consumption.
 * @returns {JSX.Element} - JSX component for the user's consumption data.
 */
function UserConsume (props) {

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
     * Store the key data for the user's consumption.
     * @constant {object} dataKey - Key data for the user's consumption.
     */
    const dataKey = userData?.keyData;
    /**
     * Store the calorie count for the user's consumption.
     * @constant {number} calorieCountNum - User's calorie count.
     */
    const calorieCountNum = dataKey?.calorieCount;
    /**
     * Store the protein count for the user's consumption.
     * @constant {number} proteinCountNum - User's protein count.
     */
    const proteinCountNum = dataKey?.proteinCount;
    /**
     * Store the carbohydrate count for the user's consumption.
     * @constant {number} carbohydrateCountNum - User's carbohydrate count.
     */
    const carbohydrateCountNum = dataKey?.carbohydrateCount;
    /**
     * Store the lipid count for the user's consumption.
     * @constant {number} carbohydrateCountNum - User's lipid count.
     */
    const lipidCountNum = dataKey?.lipidCount;
    
    /**
     * Renders the user consumption data 
     * If the state has stored the string "false", the user is redirected to the error page
     * @param {object} userData - An object containing user's data
     * @returns {JSX.Element} A React component representing the score chart or the error page
     */
    if(userData !== "false"){
    return (
        <div className='user-consume'>
            {dataKey ? Object.keys(dataKey).map((data) => (
                <section key={data} className="user-consume-component">
                    <img src={
                        data === "calorieCount" ? "https://i.postimg.cc/sgmRW7Vr/calories-icon.png" :
                        data === "proteinCount" ? "https://i.postimg.cc/Ls2r6Xfb/protein-icon.png" :
                        data === "carbohydrateCount" ? "https://i.postimg.cc/ydkBsxCz/carbs-icon.png" :
                        "https://i.postimg.cc/brD5F2cs/fat-icon.png"
                        /**
                         * @description Determines which image to display based on the value of the data variable. 
                         * The image displayed is related to the type of data being displayed
                         */
                    } alt={"icone consomation"+data} className="user-consume-img"/>
                    <div className="user-consume-txt">
                        <p className='user-consume-num'>{new Intl.NumberFormat("en-IN", {
                                maximumSignificantDigits: 3,
                            }).format(
                                data === "calorieCount" ? calorieCountNum :
                                data === "proteinCount" ? proteinCountNum :
                                data === "carbohydrateCount" ? carbohydrateCountNum :
                                lipidCountNum
                                /**
                                 * @description Determines which number to display based on the value of the data variable. 
                                 * The number displayed is related to the type of data being displayed
                                 */
                            )}{
                                data === "calorieCount" ? "kCal" : "g" 
                            }
                        </p>
                        <p className='user-consume-name'>{
                                data === "calorieCount" ? "Calories" :
                                data === "proteinCount" ? "Protéines" :
                                data === "carbohydrateCount" ? "Glucides" :
                                "Lipides"
                                /**
                                 * @description Determines which name to display based on the value of the data variable. 
                                 * The name displayed is related to the type of data being displayed
                                 */
                            }
                        </p>
                    </div>
                </section>
            )) : null}
        </div>
    )}else{
        return(
        <div>
            <Navigate replace to="/Error404" />
        </div>
        )
    }


}

export default UserConsume
