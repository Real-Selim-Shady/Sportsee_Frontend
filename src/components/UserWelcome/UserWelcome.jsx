import { useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './UserWelcome.css';
import { getAPIUserMainData } from '../../services/ApiCalls';


function UserWelcome (props) {

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
  const [idChecker, setIdChecker] = useState([]);

  /**
   * The useEffect hook that sets the userData state to the data from the data source
   * userData is a state that receives its data via setUserData, provided that the received data is not "undefined"
   * In the case of non-undefined data, the data from the props is sent to the state, otherwise, the string "false" is sent
   */
  useEffect(()=>{
    const dataToUse = () => {
      if(getData !== undefined) {
        getAPIUserMainData(userIdNumber)
        .then((data) => setUserData(data))
      }
    };
    const idCheckerFunction = () => {
      if(getData !== undefined) {
        getAPIUserMainData(userIdNumber)
        .then((data) => setIdChecker(data.id))
        .catch(error => setIdChecker("false"))
      }
    };
    dataToUse();
    idCheckerFunction();
  },[userIdNumber, getData])

  /**
   * Renders the welcome message with user's name
   * If the state has stored the string "false", the user is redirected to the error page
   * @param {object} userData - An object containing user's data
   * @returns {JSX.Element} A React component representing the score chart or the error page
   */
  if(idChecker !== "false"){
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