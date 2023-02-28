import React from "react";
import PropTypes from "prop-types";
import "./Loader.css";

/**
 * @description Function rendering loader while data are loading
 */
function Loader(props){

    /**
     * @description idChecker provides id check
     */
    const getStatus = props.idChecker;

    /**
     * @description while id check is not finished, loader is displayed and spinning
     */
    if (getStatus === -1){
        return (
            <div className="loader">
                <div className="lds-dual-ring">
                    <p className="loader-txt">Loading</p>
                </div>
            </div>
        );
    }else{
        return(
            null
        );
    }


}

Loader.propTypes = {
    idChecker: PropTypes.number,
};

export default Loader;