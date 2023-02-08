import React, {useState, useEffect} from 'react';
import './App.css';
import mokedData from '../../mock/data.js';
import UserAverageSession from '../../components/UserAverageSession/UserAverageSession';
import UserConsume from '../../components/UserConsume/UserConsume';
import UserPerf from '../../components/UserPerf/UserPerf';
import UserScore from '../../components/UserScore/UserScore';
import UserWeightCal from '../../components/UserWeightCal/UserWeightCal';
import UserWelcome from '../../components/UserWelcome/UserWelcome';
import Error from '../Error/Error';
import { Routes, Route } from 'react-router-dom';

function App() {


  const [data, updateData] = useState([]);

  useEffect(() => {
        updateData(mokedData);
      }, []);


  return (
      <Routes>

        <Route path='/user/:id' element={
          <div className="App">
            <header className="App-header">
              <img className='logo' src="https://i.ibb.co/275btmt/logo.png" alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src="https://i.ibb.co/cydBcvc/icon-Yoga.png" alt='icon de yoga'></img>
                  <img className='left-icon' src="https://i.ibb.co/Yk0cV2S/icon-Natation.png" alt='icon de natation'></img>
                  <img className='left-icon' src="https://i.ibb.co/bgrC0cb/icon-Velo.png" alt='icon de vélo'></img>
                  <img className='left-icon' src="https://i.ibb.co/28MPpPZ/icon-Muscul.png" alt='icon de musculation'></img>
                </nav>
                <p className='copyright'>Copyright, SportSee 2020</p>
              </aside>
              <div className='main-content'>
                <section className='center-content'>
                  <div>
                    <UserWelcome dataSource = {data.USER_MAIN_DATA} />
                  </div>
                  <div className='first-chart'>
                    <section>
                      <UserWeightCal dataSource = {data.USER_ACTIVITY} />
                    </section>
                  </div>
                  <div className='bottom-content'>
                    <section>
                      <UserAverageSession dataSource = {data.USER_AVERAGE_SESSIONS} />
                    </section>
                    <section>
                      <UserPerf dataSource = {data.USER_PERFORMANCE} />
                    </section>
                    <section>
                      <UserScore dataSource = {data.USER_MAIN_DATA} />
                    </section>
                  </div>
                </section>
                <aside>
                  <section>
                    <UserConsume dataSource = {data.USER_MAIN_DATA} />
                  </section>
                </aside>
              </div>
            </main>
          </div>
        } />

        <Route path='/*' element={
          <div className="App">
            <header className="App-header">
              <img className='logo' src="https://i.ibb.co/275btmt/logo.png" alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src="https://i.ibb.co/cydBcvc/icon-Yoga.png" alt='icon de yoga'></img>
                  <img className='left-icon' src="https://i.ibb.co/Yk0cV2S/icon-Natation.png" alt='icon de natation'></img>
                  <img className='left-icon' src="https://i.ibb.co/bgrC0cb/icon-Velo.png" alt='icon de vélo'></img>
                  <img className='left-icon' src="https://i.ibb.co/28MPpPZ/icon-Muscul.png" alt='icon de musculation'></img>
                </nav>
                <p className='copyright'>Copyright, SportSee 2020</p>
              </aside>
              <div className='main-content'>
                <section className='center-content'>
                  <div>
                    <Error />
                  </div>
                </section>
              </div>
            </main>
          </div>
        } />

        <Route path='/Error404' element={
          <div className="App">
            <header className="App-header">
              <img className='logo' src="https://i.ibb.co/275btmt/logo.png" alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src="https://i.ibb.co/cydBcvc/icon-Yoga.png" alt='icon de yoga'></img>
                  <img className='left-icon' src="https://i.ibb.co/Yk0cV2S/icon-Natation.png" alt='icon de natation'></img>
                  <img className='left-icon' src="https://i.ibb.co/bgrC0cb/icon-Velo.png" alt='icon de vélo'></img>
                  <img className='left-icon' src="https://i.ibb.co/28MPpPZ/icon-Muscul.png" alt='icon de musculation'></img>
                </nav>
                <p className='copyright'>Copyright, SportSee 2020</p>
              </aside>
              <div className='main-content'>
                <section className='center-content'>
                  <div>
                    <Error />
                  </div>
                </section>
              </div>
            </main>
          </div>
        } />

        <Route path='/user/:id/activity' element={
          <div className="App">
            <header className="App-header">
              <img className='logo' src="https://i.ibb.co/275btmt/logo.png" alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src="https://i.ibb.co/cydBcvc/icon-Yoga.png" alt='icon de yoga'></img>
                  <img className='left-icon' src="https://i.ibb.co/Yk0cV2S/icon-Natation.png" alt='icon de natation'></img>
                  <img className='left-icon' src="https://i.ibb.co/bgrC0cb/icon-Velo.png" alt='icon de vélo'></img>
                  <img className='left-icon' src="https://i.ibb.co/28MPpPZ/icon-Muscul.png" alt='icon de musculation'></img>
                </nav>
                <p className='copyright'>Copyright, SportSee 2020</p>
              </aside>
              <div className='main-content'>
                <section className='center-content'>
                  <div>
                    <UserWelcome dataSource = {data.USER_MAIN_DATA} />
                  </div>
                  <div className='first-chart'>
                    <section>
                      <UserWeightCal dataSource = {data.USER_ACTIVITY} />
                    </section>
                  </div>
                </section>
                <aside>
                  <section>
                    <UserConsume dataSource = {data.USER_MAIN_DATA} />
                  </section>
                </aside>
              </div>
            </main>
          </div>
        } />

        <Route path='/user/:id/performance' element={
          <div className="App">
            <header className="App-header">
              <img className='logo' src="https://i.ibb.co/275btmt/logo.png" alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src="https://i.ibb.co/cydBcvc/icon-Yoga.png" alt='icon de yoga'></img>
                  <img className='left-icon' src="https://i.ibb.co/Yk0cV2S/icon-Natation.png" alt='icon de natation'></img>
                  <img className='left-icon' src="https://i.ibb.co/bgrC0cb/icon-Velo.png" alt='icon de vélo'></img>
                  <img className='left-icon' src="https://i.ibb.co/28MPpPZ/icon-Muscul.png" alt='icon de musculation'></img>
                </nav>
                <p className='copyright'>Copyright, SportSee 2020</p>
              </aside>
              <div className='main-content'>
                <section className='center-content'>
                  <div>
                    <UserWelcome dataSource = {data.USER_MAIN_DATA} />
                  </div>
                  <div className='bottom-content'>
                    <section>
                      <UserPerf dataSource = {data.USER_PERFORMANCE} />
                    </section>
                  </div>
                </section>
              </div>
            </main>
          </div>
        } />

        <Route path='/user/:id/average-sessions' element={
          <div className="App">
            <header className="App-header">
              <img className='logo' src="https://i.ibb.co/275btmt/logo.png" alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src="https://i.ibb.co/cydBcvc/icon-Yoga.png" alt='icon de yoga'></img>
                  <img className='left-icon' src="https://i.ibb.co/Yk0cV2S/icon-Natation.png" alt='icon de natation'></img>
                  <img className='left-icon' src="https://i.ibb.co/bgrC0cb/icon-Velo.png" alt='icon de vélo'></img>
                  <img className='left-icon' src="https://i.ibb.co/28MPpPZ/icon-Muscul.png" alt='icon de musculation'></img>
                </nav>
                <p className='copyright'>Copyright, SportSee 2020</p>
              </aside>
              <div className='main-content'>
                <section className='center-content'>
                  <div>
                    <UserWelcome dataSource = {data.USER_MAIN_DATA} />
                  </div>
                  <div className='bottom-content'>
                    <section>
                      <UserAverageSession dataSource = {data.USER_AVERAGE_SESSIONS} />
                    </section>
                  </div>
                </section>
              </div>
            </main>
          </div>
        } />

        <Route path='/user/:id/score' element={
          <div className="App">
            <header className="App-header">
              <img className='logo' src="https://i.ibb.co/275btmt/logo.png" alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src="https://i.ibb.co/cydBcvc/icon-Yoga.png" alt='icon de yoga'></img>
                  <img className='left-icon' src="https://i.ibb.co/Yk0cV2S/icon-Natation.png" alt='icon de natation'></img>
                  <img className='left-icon' src="https://i.ibb.co/bgrC0cb/icon-Velo.png" alt='icon de vélo'></img>
                  <img className='left-icon' src="https://i.ibb.co/28MPpPZ/icon-Muscul.png" alt='icon de musculation'></img>
                </nav>
                <p className='copyright'>Copyright, SportSee 2020</p>
              </aside>
              <div className='main-content'>
                <section className='center-content'>
                  <div>
                    <UserWelcome dataSource = {data.USER_MAIN_DATA} />
                  </div>
                  <div className='bottom-content'>
                    <section>
                      <UserScore dataSource = {data.USER_MAIN_DATA} />
                    </section>
                  </div>
                </section>
              </div>
            </main>
          </div>
        } />

      </Routes>
  );
}

export default App;


      /*<MainCharts dataSource = {data.USER_MAIN_DATA} />
      function MainCharts(props) {
  return <h1>Hello, {props.dataSource}</h1>;
  }*/