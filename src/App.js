import "./App.css";
import React, { useState, useEffect } from "react";
// import "./compliance-task-data.json";
import HomePage from "./Components/HomePage";
import ShowPage from "./Components/ShowPage";
import ChannelPage from "./Components/ChannelPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/channel/:channelName/show/:episodeNumber"
            element={<ShowPage />}
          />
          <Route path="/channel/:channelName" element={<ChannelPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
