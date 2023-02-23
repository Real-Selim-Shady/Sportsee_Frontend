import './UserConsume.css';
import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function UserConsume (props) {

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
     * @description Store the key data for the user's consumption.
     * @constant {object} dataKey - Key data for the user's consumption.
     */
    const dataKey = userData?.keyData;

    /**
     * @description Store the calorie count for the user's consumption.
     * @constant {number} calorieCountNum - User's calorie count.
     */
    const calorieCountNum = dataKey?.calorieCount;

    /**
     * @description Store the protein count for the user's consumption.
     * @constant {number} proteinCountNum - User's protein count.
     */
    const proteinCountNum = dataKey?.proteinCount;

    /**
     * @description Store the carbohydrate count for the user's consumption.
     * @constant {number} carbohydrateCountNum - User's carbohydrate count.
     */
    const carbohydrateCountNum = dataKey?.carbohydrateCount;

    /**
     * @description Store the lipid count for the user's consumption.
     * @constant {number} carbohydrateCountNum - User's lipid count.
     */
    const lipidCountNum = dataKey?.lipidCount;
    
    /**
     * @description Renders the user consumption data 
     * If the state idChecker has stored the string 'false', the user is redirected to the error page
     * @param {object} userData - An object containing user's data
     * @returns {JSX.Element} A React component representing the score chart or the error page
     */
    if(getIdChecker !== 0){
    return (
        <div className='user-consume'>
            {dataKey ? Object.keys(dataKey).map((data) => (
                <section key={data} className='user-consume-component'>
                    <img src={
                        data === 'calorieCount' ? 'https://i.postimg.cc/sgmRW7Vr/calories-icon.png' :
                        data === 'proteinCount' ? 'https://i.postimg.cc/Ls2r6Xfb/protein-icon.png' :
                        data === 'carbohydrateCount' ? 'https://i.postimg.cc/ydkBsxCz/carbs-icon.png' :
                        'https://i.postimg.cc/brD5F2cs/fat-icon.png'
                        /**
                         * @description Determines which image to display based on the value of the data variable. 
                         * The image displayed is related to the type of data being displayed
                         */
                    } alt={'icone consomation'+data} className='user-consume-img'/>
                    <div className='user-consume-txt'>
                        <p className='user-consume-num'>{new Intl.NumberFormat('en-IN', {
                                maximumSignificantDigits: 3,
                            }).format(
                                data === 'calorieCount' ? calorieCountNum :
                                data === 'proteinCount' ? proteinCountNum :
                                data === 'carbohydrateCount' ? carbohydrateCountNum :
                                lipidCountNum
                                /**
                                 * @description Determines which number to display based on the value of the data variable. 
                                 * The number displayed is related to the type of data being displayed
                                 */
                            )}{
                                data === 'calorieCount' ? 'kCal' : 'g' 
                            }
                        </p>
                        <p className='user-consume-name'>{
                                data === 'calorieCount' ? 'Calories' :
                                data === 'proteinCount' ? 'Protéines' :
                                data === 'carbohydrateCount' ? 'Glucides' :
                                'Lipides'
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
            <Navigate replace to='/user/404/Error' />
        </div>
        )
    }


}

UserConsume.propTypes = {
    dataSource: PropTypes.object,
    idChecker: PropTypes.number,
};

export default UserConsume
