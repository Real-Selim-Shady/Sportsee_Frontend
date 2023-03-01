import mokedData from "./data";


/**
* @description id is found on URL and put in currentId const
*/
const url = window.location.href;
const match = url.match(/user\/(\d+)/);
const currentId = match ? match[1] : null;

/**
 * @description dataChosenCM is used in the case of sourcing mockedData instead of APIs' data
 */
let dataChosenCM = {};
if(+currentId == 12){
dataChosenCM = 0;
}else if(+currentId == 18) {
dataChosenCM = 1;
}


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
 * @description getting mock data and use of modeling classes
 */
class MockDataModel {

    getMockMainData(){
        return Promise.resolve(mokedData.USER_MAIN_DATA[dataChosenCM])
        .then (data => new MainClass(data));
    }

    getMockActivityData(){
        return Promise.resolve(mokedData.USER_ACTIVITY[dataChosenCM])
        .then (data => new ActivityClass(data));
    }

    getMockAverageSessionsData(){
        return Promise.resolve(mokedData.USER_AVERAGE_SESSIONS[dataChosenCM])
        .then (data => new AverageClass(data));
    }

    getMockPerfData(){
        return Promise.resolve(mokedData.USER_PERFORMANCE[dataChosenCM])
        .then (data => new PerfClass(data));
    }


}

export default MockDataModel;


