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
      <nav className="channel-navbar">
        <h1>{channelName} </h1>
        <div className="filter-search-container">
          <select value={statusFilter} onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Edit required">Edit required</option>
          </select>
          <input
            type="text"
            placeholder="Search shows..."
            className="search-input"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
      </nav>
      <>
        <Grid container spacing={2} style={{ marginTop: "3.5rem" }}>
          {filteredShows.map((data) => {
            const showLink = `/channel/${channelName}/show/${data.episodeNumber}`;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={data.episodeNumber}>
                <Card className="show-card">
                  <CardContent>
                    <Link to={showLink} className="show-link">
                      <div className="episode-number-header">
                        {data.episodeNumber}
                      </div>

                      <Typography variant="h6" component="div">
                        {data.show}
                      </Typography>
                      <Typography
                        className={`status-text ${
                          data.status === "Completed"
                            ? "completed"
                            : data.status === "Edit required"
                            ? "edit-required"
                            : ""
                        }`}
                        color="textSecondary"
                        align="center"
                      >
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
