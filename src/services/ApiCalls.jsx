
const server = 'http://localhost:3000/'

/**
 * Fetch the user's data from the server
 * @param {uri} uri - uri depending on the source of the data
 * @returns a promise
 */
function getAPIUserData(uri){
    return fetch(server + uri)
        .then(response => response.json())
        .then(response => response.data)
}

function getAPIUserMainData(userId){
    return getAPIUserData('user/' + userId)
}

function getAPIUserActivity(userId){
    return getAPIUserData('user/' + userId + '/activity')
}

function getAPIUserAverageSession(userId){
    return getAPIUserData('user/' + userId + '/average-sessions')
}

function getAPIUserPerformance(userId){
    return getAPIUserData('user/' + userId + '/performance')
}

export {getAPIUserMainData, getAPIUserActivity, getAPIUserAverageSession, getAPIUserPerformance}