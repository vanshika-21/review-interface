import React, { useState, useEffect } from "react";
import { useParams, Link, Route, Router } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";

function ChannelPage() {
  const { channelName } = useParams();
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShows, setFilteredShows] = useState([]);

  const getChannels = (data) => {
    const filteredData = data.filter(
      (episode) => episode.channel === channelName
    );

    console.log(filteredData);
    return filteredData;
  };

  const updateFilteredShows = (query) => {
    if (!query) {
      return getChannels(data); // Return all shows when query is empty
    }

    const filtered = getChannels(data).filter((episode) =>
      episode.show.toLowerCase().startsWith(query.toLowerCase())
    );
    return filtered;
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredShows(getChannels(data)); // Set all shows when query is empty
    } else {
      setFilteredShows(updateFilteredShows(query));
    }
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

  useEffect(() => {
    setChannels(getChannels(compliancetaskdata));
    setData(compliancetaskdata);
    setFilteredShows(getChannels(compliancetaskdata));
    console.log(compliancetaskdata);
  }, []);

  return (
    <div>
      <h1>channel name : {channelName} </h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search shows..."
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <>
        {/* {channels.map((data) => {
          const showLink = `/channel/${channelName}/show/${data.episodeNumber}`;
          // return <div>Show name: {data.show}</div>;
          return (
            <div key={data.episodeNumber}>
              <Link to={showLink}>{data.show}</Link>
            </div>
          );
        })} */}

        {filteredShows.map((data) => {
          const showLink = `/channel/${channelName}/show/${data.episodeNumber}`;
          return (
            <div key={data.episodeNumber}>
              <Link to={showLink}>{data.show}</Link>
            </div>
          );
        })}
      </>
    </div>
  );
}
export default ChannelPage;
