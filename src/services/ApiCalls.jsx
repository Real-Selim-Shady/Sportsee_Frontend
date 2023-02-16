
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

function getAPIUserDataMain(userId){
    return getAPIUserData('user/' + userId)
}

function getAPIUserDataActivity(userId){
    return getAPIUserData('user/' + userId + '/activity')
}

function getAPIUserDataAverage(userId){
    return getAPIUserData('user/' + userId + '/average-sessions')
}

function getAPIUserDataPerformance(userId){
    return getAPIUserData('user/' + userId + '/performance')
}

export {getAPIUserDataMain, getAPIUserDataActivity, getAPIUserDataAverage, getAPIUserDataPerformance}