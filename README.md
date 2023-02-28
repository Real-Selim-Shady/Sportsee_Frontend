1. `Prerequisites`

- NodeJS (at least version 12.18) - https://nodejs.org/en/download/
- Yarn - https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

2. `Install project`

Create a directory P12.
Inside, clone the two following folders:
- Backend: git clone https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard.git
- Frontend: git clone https://github.com/Real-Selim-Shady/P12-Sportsee-Frontend.git

3. `Install dependencies`

- In backend folder, install yarn dependencies: cmd "yarn"
- In frontend folder, install npm dependencies: cmd "npm install"
- In frontend folder, install recharts dependencies: cmd "npm install recharts"

4. `Launch project`

- In backend folder, launch cmd "yarn dev"
- In frontend folder, launch cmd "npm start", and accept to launch on a different port

5. `Available Queries`

- Available id are 12 and 18 untill now, replace id with them on the queries
- Replace "http://localhost:3001/" on following queries with the right port your project have been launched from
- Have an overview on users' charts using : http://localhost:3001/user/id
- Have a specific view on users' chart using : http://localhost:3001/user/id/performance, http://localhost:3001/user/id/activity, http://localhost:3001/user/id/average-sessions or http://localhost:3001/user/id/score 

6. `Using MockedData`

In order to use mockedData instead of APIs' data, follow these steps:
- step 1 : go to app.jsx file, which can be found in: src/Home/app.jsx
- step 2 : erase "//" on lines 43 and 58, which will transform those lines from comment to usable code
- step 3 : replace following information:
        - dataSource = {fetchMain} --> dataSource = {mockedData?.USER_MAIN_DATA[dataChosen]}
        - dataSource = {fetchActivity} --> dataSource = {mockedData?.USER_ACTIVITY[dataChosen]}
        - dataSource = {fetchAverageSession} --> dataSource = {mockedData?.USER_AVERAGE_SESSIONS[dataChosen]}
        - dataSource = {fetchPerf} --> dataSource = {mockedData?.USER_PERFORMANCE[dataChosen]}
    - to replace them quickly and safely, you can use on your keybord the combo Control + H or Command + H (depending on your keyboard), put on search the text you want to change, put on replace the text you want to enter instead
    - you can chose to work with a part of APIs' data and mockedData, if you select which dataSource you really want to replace instead of replacing them all

