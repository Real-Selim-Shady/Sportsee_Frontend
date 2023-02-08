import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './UserWelcome.css';


function UserWelcome (props) {
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



  if(userData !== "false"){
  return (
      <div className='user-welcome'>
        <h1 className='welcome-title'>Bonjour<p className='user-name'>{userData?.userInfos?.firstName}</p></h1>
        <p className='welcome-congrats'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
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

export default UserWelcome