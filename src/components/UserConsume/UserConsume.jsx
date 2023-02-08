import './UserConsume.css';
import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


function UserConsume (props) {
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
            const element = getData.find((data) => data.id === userIdNumber);
            setUserData(element);
            if(element === undefined) {
            setUserData("false")
            }
        }
        };
        dataToUse();
    },[userIdNumber, getData])

    // userData is a state that receives its data via setUserData, provided that the received data is not "undefined"
    // In the case of non-undefined data, the data from the props is sent to the state, otherwise, the string "false" is sent


    const dataKey = userData?.keyData;
    const calorieCountNum = dataKey?.calorieCount;
    const proteinCountNum = dataKey?.proteinCount;
    const carbohydrateCountNum = dataKey?.carbohydrateCount;
    const lipidCountNum = dataKey?.lipidCount;
    // these constants retrieve specific data stored in the state
    

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
                        // According to what data returns, the appropriate icon is displayed
                    } alt={"icone consomation"+data} className="user-consume-img"/>
                    <div className="user-consume-txt">
                        <p className='user-consume-num'>{new Intl.NumberFormat("en-IN", {
                                maximumSignificantDigits: 3,
                            }).format(
                                data === "calorieCount" ? calorieCountNum :
                                data === "proteinCount" ? proteinCountNum :
                                data === "carbohydrateCount" ? carbohydrateCountNum :
                                lipidCountNum
                                // According to what data returns, the appropriate number is displayed
                            )}{
                                data === "calorieCount" ? "kCal" : "g" 
                            }
                        </p>
                        <p className='user-consume-name'>{
                                data === "calorieCount" ? "Calories" :
                                data === "proteinCount" ? "Protéines" :
                                data === "carbohydrateCount" ? "Glucides" :
                                "Lipides"
                                // According to what data returns, the appropriate name is displayed
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
    
    // If the state has stored the string "false", the user is redirected to the error page


}

export default UserConsume
