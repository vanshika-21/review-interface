import React, { useState, useEffect } from "react";
import { useParams, Link, Route, Router } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";
import Card from "@mui/material/Card"; // Import Material-UI Card component
import CardContent from "@mui/material/CardContent"; // Import Material-UI CardContent component
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../Style/ChannelPage.css";

function ChannelPage() {
  const { channelName } = useParams();
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShows, setFilteredShows] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const getChannels = (data) => {
    const filteredData = data.filter(
      (episode) => episode.channel === channelName
    );
    return filteredData;
  };

  const updateFilteredShows = (query, status) => {
    let filteredData = getChannels(data);

    if (status !== "all") {
      filteredData = filteredData.filter(
        (episode) => episode.status === status
      );
    }

    if (query) {
      filteredData = filteredData.filter((episode) =>
        episode.show.toLowerCase().startsWith(query.toLowerCase())
      );
    }
    return filteredData;
  };
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredShows(updateFilteredShows(query, statusFilter));
  };
  // const getData = () => {
  //   fetch("compliance-task-data.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //       setChannels(getChannels(data));
  //       console.log(data, "data");
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };
  // console.log(channels);

  // const getData = () => {
  //   fetch(compliancetaskdata)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //       const channels = getChannels(data);
  //       setChannels(channels);
  //       console.log(channels, "channels");
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    setFilteredShows(updateFilteredShows(searchQuery, status));
  };

  useEffect(() => {
    setChannels(getChannels(compliancetaskdata));
    setData(compliancetaskdata);
    setFilteredShows(getChannels(compliancetaskdata));
    console.log(compliancetaskdata);
  }, []);

  return (
    <div>
      <nav className="navbar">
        <h1 style={{ color: "white" }}>{channelName} </h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search shows..."
            className="search-input"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <select value={statusFilter} onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Edit required">Edit required</option>
          </select>
        </div>
      </nav>
      <>
        <Grid container spacing={2}>
          {filteredShows.map((data) => {
            const showLink = `/channel/${channelName}/show/${data.episodeNumber}`;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={data.episodeNumber}>
                <Card className="show-card">
                  <CardContent>
                    <Link to={showLink} className="show-link">
                      <Typography variant="h6" component="div">
                        {data.show}
                      </Typography>
                      <Typography color="textSecondary">
                        {data.episodeNumber}
                      </Typography>
                      <Typography color="textSecondary">
                        {data.status}
                      </Typography>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </>
    </div>
  );
}
export default ChannelPage;
