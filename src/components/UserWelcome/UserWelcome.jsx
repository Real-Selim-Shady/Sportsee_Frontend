import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./UserWelcome.css";

/**
 * @description Function rendering welcome message with user name
 */
function UserWelcome (props) {

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
   * @description Renders the welcome message with user's name
   * If the state idChecker has stored the string 'false', the user is redirected to the error page
   * @param {object} userData - An object containing user's data
   * @returns {JSX.Element} A React component representing the score chart or the error page
   */
  if(getIdChecker !== 0){
  return (
      <div className='user-welcome'>
        <h1 className='welcome-title'>Bonjour<p className='user-name'>{userData?.userInfos?.firstName}</p></h1>
        <p className='welcome-congrats'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
  );}else{
    return(
      <div>
        <Navigate replace to='/user/404/Error' />
      </div>
    );
  }
  
}

UserWelcome.propTypes = {
  dataSource: PropTypes.object,
  idChecker: PropTypes.number,
};

export default UserWelcome;

