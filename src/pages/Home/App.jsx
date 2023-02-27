/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import "./App.css";
import UserAverageSession from "../../components/UserAverageSession/UserAverageSession";
import UserConsume from "../../components/UserConsume/UserConsume";
import UserPerf from "../../components/UserPerf/UserPerf";
import UserScore from "../../components/UserScore/UserScore";
import UserWeightCal from "../../components/UserWeightCal/UserWeightCal";
import UserWelcome from "../../components/UserWelcome/UserWelcome";
import Error from "../Error/Error";
import { Routes, Route } from "react-router-dom";
import { getAPIUserPerformance, getAPIUserActivity, getAPIUserAverageSession, getAPIUserMainData } from "../../services/ApiCalls";
import PropTypes from "prop-types";

/**
 * @function App
 * @description Main function of the SportSee application.
 * This function uses React hooks to update the application state with user data.
 * It also uses React Router DOM to display different pages of the application based on the URL.
 * @returns {JSX.Element} Returns the component rendering in JSX format.
 */
function App() {

  /**
  * @description id is found on URL and put in currentId const
  */
  const url = window.location.href;
  const match = url.match(/user\/(\d+)/);
  const currentId = match ? match[1] : null;

  const [fetchPerf, setFetchPerf] = useState();
  const [fetchMain, setFetchMain] = useState();
  const [fetchActivity, setFetchActivity] = useState();
  const [fetchAverageSession, setAverageSession] = useState();
  const [idChecker, setIdChecker] = useState(-1);

  /**
  * @description this useEffect use setter to change all file states
  */
  useEffect(() => {

    /**
    * @description if the id is found, it is used to retrieve the right data via a fetch
    */
    if (currentId) {
      getAPIUserPerformance(currentId)
        .then((data) => setFetchPerf(data))
        .catch(() => setIdChecker(0));

      getAPIUserMainData(currentId)
        .then((data) => setFetchMain(data))
        .catch(() => setIdChecker(0));

      getAPIUserActivity(currentId)
        .then((data) => setFetchActivity(data))
        .catch(() => setIdChecker(0));

      getAPIUserAverageSession(currentId)
        .then((data) => setAverageSession(data))
        .catch(() => setIdChecker(0));

      /**
      * @description this API call is used to check is the id is existing in data or not
      */
      getAPIUserPerformance(currentId)
      .then((data) => setIdChecker(data.userId))
      .catch(() => setIdChecker(0));
    }
  }, [currentId]);

  return (
    <Routes>
      {currentId ? (
        <>
          <Route path='/user/:id' element={
            <div className='App'>
              <header className='App-header'>
                <img className='logo' src='https://i.ibb.co/275btmt/logo.png' alt='logo Sportsee'></img>
                <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
              </header>
              <main>
                <aside className='left-side'>
                  <nav className='left-list'>
                    <img className='left-icon' src='https://i.ibb.co/cydBcvc/icon-Yoga.png' alt='icon de yoga'></img>
                    <img className='left-icon' src='https://i.ibb.co/Yk0cV2S/icon-Natation.png' alt='icon de natation'></img>
                    <img className='left-icon' src='https://i.ibb.co/bgrC0cb/icon-Velo.png' alt='icon de vélo'></img>
                    <img className='left-icon' src='https://i.ibb.co/28MPpPZ/icon-Muscul.png' alt='icon de musculation'></img>
                  </nav>
                  <p className='copyright'>Copyright, SportSee 2020</p>
                </aside>
                <div className='main-content'>
                  <section className='center-content'>
                    <div>
                      <UserWelcome dataSource = {fetchMain} idChecker = {idChecker} />
                    </div>
                    <div className='first-chart'>
                      <section>
                        <UserWeightCal dataSource = {fetchActivity} idChecker = {idChecker} />
                      </section>
                    </div>
                    <div className='bottom-content'>
                      <section>
                        <UserAverageSession dataSource = {fetchAverageSession} idChecker = {idChecker} />
                      </section>
                      <section>
                        <UserPerf dataSource = {fetchPerf} idChecker = {idChecker} />
                      </section>
                      <section>
                        <UserScore dataSource = {fetchMain} idChecker = {idChecker} />
                      </section>
                    </div>
                  </section>
                  <aside>
                    <section>
                      <UserConsume dataSource = {fetchMain} idChecker = {idChecker} />
                    </section>
                  </aside>
                </div>
              </main>
            </div>
          } />

          <Route path='/user/404/Error' element={
            <div className='App'>
            <header className='App-header'>
              <img className='logo' src='https://i.ibb.co/275btmt/logo.png' alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src='https://i.ibb.co/cydBcvc/icon-Yoga.png' alt='icon de yoga'></img>
                  <img className='left-icon' src='https://i.ibb.co/Yk0cV2S/icon-Natation.png' alt='icon de natation'></img>
                  <img className='left-icon' src='https://i.ibb.co/bgrC0cb/icon-Velo.png' alt='icon de vélo'></img>
                  <img className='left-icon' src='https://i.ibb.co/28MPpPZ/icon-Muscul.png' alt='icon de musculation'></img>
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

          <Route path='/*' element={
            <div className='App'>
            <header className='App-header'>
              <img className='logo' src='https://i.ibb.co/275btmt/logo.png' alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src='https://i.ibb.co/cydBcvc/icon-Yoga.png' alt='icon de yoga'></img>
                  <img className='left-icon' src='https://i.ibb.co/Yk0cV2S/icon-Natation.png' alt='icon de natation'></img>
                  <img className='left-icon' src='https://i.ibb.co/bgrC0cb/icon-Velo.png' alt='icon de vélo'></img>
                  <img className='left-icon' src='https://i.ibb.co/28MPpPZ/icon-Muscul.png' alt='icon de musculation'></img>
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

          <Route path='/user/:id' element={
            <div className='App'>
            <header className='App-header'>
              <img className='logo' src='https://i.ibb.co/275btmt/logo.png' alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src='https://i.ibb.co/cydBcvc/icon-Yoga.png' alt='icon de yoga'></img>
                  <img className='left-icon' src='https://i.ibb.co/Yk0cV2S/icon-Natation.png' alt='icon de natation'></img>
                  <img className='left-icon' src='https://i.ibb.co/bgrC0cb/icon-Velo.png' alt='icon de vélo'></img>
                  <img className='left-icon' src='https://i.ibb.co/28MPpPZ/icon-Muscul.png' alt='icon de musculation'></img>
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
            <div className='App'>
              <header className='App-header'>
                <img className='logo' src='https://i.ibb.co/275btmt/logo.png' alt='logo Sportsee'></img>
                <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
              </header>
              <main>
                <aside className='left-side'>
                  <nav className='left-list'>
                    <img className='left-icon' src='https://i.ibb.co/cydBcvc/icon-Yoga.png' alt='icon de yoga'></img>
                    <img className='left-icon' src='https://i.ibb.co/Yk0cV2S/icon-Natation.png' alt='icon de natation'></img>
                    <img className='left-icon' src='https://i.ibb.co/bgrC0cb/icon-Velo.png' alt='icon de vélo'></img>
                    <img className='left-icon' src='https://i.ibb.co/28MPpPZ/icon-Muscul.png' alt='icon de musculation'></img>
                  </nav>
                  <p className='copyright'>Copyright, SportSee 2020</p>
                </aside>
                <div className='main-content'>
                  <section className='center-content'>
                    <div>
                      <UserWelcome dataSource = {fetchMain} idChecker = {idChecker} />
                    </div>
                    <div className='first-chart'>
                      <section>
                        <UserWeightCal dataSource = {fetchActivity} idChecker = {idChecker} />
                      </section>
                    </div>
                  </section>
                  <aside>
                    <section>
                      <UserConsume dataSource = {fetchMain} idChecker = {idChecker} />
                    </section>
                  </aside>
                </div>
              </main>
            </div>
          } />

          <Route path='/user/:id/performance' element={
            <div className='App'>
              <header className='App-header'>
                <img className='logo' src='https://i.ibb.co/275btmt/logo.png' alt='logo Sportsee'></img>
                <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
              </header>
              <main>
                <aside className='left-side'>
                  <nav className='left-list'>
                    <img className='left-icon' src='https://i.ibb.co/cydBcvc/icon-Yoga.png' alt='icon de yoga'></img>
                    <img className='left-icon' src='https://i.ibb.co/Yk0cV2S/icon-Natation.png' alt='icon de natation'></img>
                    <img className='left-icon' src='https://i.ibb.co/bgrC0cb/icon-Velo.png' alt='icon de vélo'></img>
                    <img className='left-icon' src='https://i.ibb.co/28MPpPZ/icon-Muscul.png' alt='icon de musculation'></img>
                  </nav>
                  <p className='copyright'>Copyright, SportSee 2020</p>
                </aside>
                <div className='main-content'>
                  <section className='center-content'>
                    <div>
                      <UserWelcome dataSource = {fetchMain} idChecker = {idChecker} />
                    </div>
                    <div className='bottom-content'>
                      <section>
                        <UserPerf dataSource = {fetchPerf} idChecker = {idChecker} />
                      </section>
                    </div>
                  </section>
                </div>
              </main>
            </div>
          } />

          <Route path='/user/:id/average-sessions' element={
            <div className='App'>
              <header className='App-header'>
                <img className='logo' src='https://i.ibb.co/275btmt/logo.png' alt='logo Sportsee'></img>
                <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
              </header>
              <main>
                <aside className='left-side'>
                  <nav className='left-list'>
                    <img className='left-icon' src='https://i.ibb.co/cydBcvc/icon-Yoga.png' alt='icon de yoga'></img>
                    <img className='left-icon' src='https://i.ibb.co/Yk0cV2S/icon-Natation.png' alt='icon de natation'></img>
                    <img className='left-icon' src='https://i.ibb.co/bgrC0cb/icon-Velo.png' alt='icon de vélo'></img>
                    <img className='left-icon' src='https://i.ibb.co/28MPpPZ/icon-Muscul.png' alt='icon de musculation'></img>
                  </nav>
                  <p className='copyright'>Copyright, SportSee 2020</p>
                </aside>
                <div className='main-content'>
                  <section className='center-content'>
                    <div>
                      <UserWelcome dataSource = {fetchMain} idChecker = {idChecker} />
                    </div>
                    <div className='bottom-content'>
                      <section>
                        <UserAverageSession dataSource = {fetchAverageSession} idChecker = {idChecker} />
                      </section>
                    </div>
                  </section>
                </div>
              </main>
            </div>
          } />

          <Route path='/user/:id/score' element={
            <div className='App'>
              <header className='App-header'>
                <img className='logo' src='https://i.ibb.co/275btmt/logo.png' alt='logo Sportsee'></img>
                <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
              </header>
              <main>
                <aside className='left-side'>
                  <nav className='left-list'>
                    <img className='left-icon' src='https://i.ibb.co/cydBcvc/icon-Yoga.png' alt='icon de yoga'></img>
                    <img className='left-icon' src='https://i.ibb.co/Yk0cV2S/icon-Natation.png' alt='icon de natation'></img>
                    <img className='left-icon' src='https://i.ibb.co/bgrC0cb/icon-Velo.png' alt='icon de vélo'></img>
                    <img className='left-icon' src='https://i.ibb.co/28MPpPZ/icon-Muscul.png' alt='icon de musculation'></img>
                  </nav>
                  <p className='copyright'>Copyright, SportSee 2020</p>
                </aside>
                <div className='main-content'>
                  <section className='center-content'>
                    <div>
                      <UserWelcome dataSource = {fetchMain} idChecker = {idChecker} />
                    </div>
                    <div className='bottom-content'>
                      <section>
                        <UserScore dataSource = {fetchMain} idChecker = {idChecker} />
                      </section>
                    </div>
                  </section>
                </div>
              </main>
            </div>
          } />
        </>):
        <>
          <Route path='/*' element={
            <div className='App'>
            <header className='App-header'>
              <img className='logo' src='https://i.ibb.co/275btmt/logo.png' alt='logo Sportsee'></img>
              <nav className='header-titles'><p>Accueil</p><p>Profil</p><p>Réglage</p><p>Communauté</p></nav>
            </header>
            <main>
              <aside className='left-side'>
                <nav className='left-list'>
                  <img className='left-icon' src='https://i.ibb.co/cydBcvc/icon-Yoga.png' alt='icon de yoga'></img>
                  <img className='left-icon' src='https://i.ibb.co/Yk0cV2S/icon-Natation.png' alt='icon de natation'></img>
                  <img className='left-icon' src='https://i.ibb.co/bgrC0cb/icon-Velo.png' alt='icon de vélo'></img>
                  <img className='left-icon' src='https://i.ibb.co/28MPpPZ/icon-Muscul.png' alt='icon de musculation'></img>
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
        </>}
      </Routes>
  );
}

export default App;

App.propTypes = {
  currentId: PropTypes.string,
};