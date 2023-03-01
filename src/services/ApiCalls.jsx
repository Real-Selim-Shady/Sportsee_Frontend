
const port = "http://localhost:3000/";

/**
 * @description constructor for Performance data modeling class
 */
class kind
{
	constructor(k)
	{
		this["1"] = k["1"];
		this["2"] = k["2"];
		this["3"] = k["3"];
		this["4"] = k["4"];
		this["5"] = k["5"];
		this["6"] = k["6"];
	}
}

/**
 * @description constructor for Performance data modeling class
 */
class PerfDataClass
{
	constructor(x)
	{
		this.kind = x.kind;
		this.value = x.value;
	}
}


/**
 * @description Performance data modeling class
 */
class PerfClass {
    constructor(data){

        this.data = [];
		data.data.forEach((v) => {
			const data_data = new PerfDataClass(v);
			this.data.push(data_data);
		});
		
		this.kind = new kind(data.kind);

		this.userId = data.userId;

    }
}

/**
 * @description constructor for Average Sessions data modeling class
 */
class SessionsAvClass
{
	constructor(x)
	{
		this.day = x.day;
		this.sessionLength = x.sessionLength;
	}
}

/**
 * @description Average Sessions data modeling class
 */
class AverageClass {
    constructor(data){

        this.sessions = [];
 
        data.sessions.forEach((s) => {
            const session = new SessionsAvClass(s);
            this.sessions.push(session);
        });
        
        this.userId = data.userId;

    }
}

/**
 * @description constructor for Activity data modeling class
 */
class SessionsAcClass
{
	constructor(x)
	{
		this.day = x.day;
		this.kilogram = x.kilogram;
        this.calories = x.calories;
	}
}

/**
 * @description Activity data modeling class
 */
class ActivityClass {
    constructor(data){

        this.sessions = [];
 
        data.sessions.forEach((s) => {
            const session = new SessionsAcClass(s);
            this.sessions.push(session);
        });
        
        this.userId = data.userId;

    }
}

/**
 * @description constructor for Main Data modeling class
 */
class userInfos
{
	constructor(u)
	{
		this["firstName"] = u["firstName"];
		this["lastName"] = u["lastName"];
		this["age"] = u["age"];
	}
}

/**
 * @description constructor for Main data modeling class
 */
class keyData
{
	constructor(kd)
	{
		this["calorieCount"] = kd["calorieCount"];
		this["proteinCount"] = kd["proteinCount"];
		this["carbohydrateCount"] = kd["carbohydrateCount"];
		this["lipidCount"] = kd["lipidCount"];
	}
}

/**
 * @description Main data modeling class
 */
class MainClass {
    constructor(data){
		
		this.userInfos = new userInfos(data.userInfos);
        this.keyData = new keyData(data.keyData);

		this.id = data.id;
        this.todayScore = data.todayScore;
        this.score = data.score;

    }
}


/**
 * @description fetching API and use of modeling classes
 */
class DataModel {

    /**
     * @description this is the fetch for the API showing user's data
     * @param {query} query - query depending on the source of the data
     * @returns promise
     */
    getAPIUserData(query){
        return fetch(port + query)
            .then(response => response.json())
            .then(response => response.data);
    }

    getAPIUserMainData(userId){
        return this.getAPIUserData("user/" + userId)
        .then (data => new MainClass(data));
    }

    getAPIUserActivity(userId){
        return this.getAPIUserData("user/" + userId + "/activity")
        .then (data => new ActivityClass(data));
    }

    getAPIUserAverageSession(userId){
        return this.getAPIUserData("user/" + userId + "/average-sessions")
        .then (data => new AverageClass(data));
        
    }

    getAPIUserPerformance(userId){
        return this.getAPIUserData("user/" + userId + "/performance")
        .then (data => new PerfClass(data));
        
    }
}

export default DataModel;


