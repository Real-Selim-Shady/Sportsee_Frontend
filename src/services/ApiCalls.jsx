
const port = "http://localhost:3000/";

/**
 * @description this is the fetch for the API showing user's data
 * @param {uri} uri - uri depending on the source of the data
 * @returns promise
 */
function getAPIUserData(uri){
    return fetch(port + uri)
        .then(response => response.json())
        .then(response => response.data);
}

function getAPIUserMainData(userId){
    return getAPIUserData("user/" + userId);
}

function getAPIUserActivity(userId){
    return getAPIUserData("user/" + userId + "/activity");
}

function getAPIUserAverageSession(userId){
    return getAPIUserData("user/" + userId + "/average-sessions");
}

function getAPIUserPerformance(userId){
    return getAPIUserData("user/" + userId + "/performance");
}

export {getAPIUserMainData, getAPIUserActivity, getAPIUserAverageSession, getAPIUserPerformance};