import React, { useState, useEffect } from "react";
import { useParams, Link, Route, Router } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";

function ChannelPage() {
  const { channelName } = useParams();
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);

  const getChannels = (data) => {
    const filteredData = data.filter(
      (episode) => episode.channel === channelName
    );

    console.log(filteredData);
    return filteredData;
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
    console.log(compliancetaskdata);
  }, []);

  return (
    <div>
      <h1>channel name : {channelName} </h1>
      <>
        {channels.map((data) => {
          const showLink = `/channel/${channelName}/show/${data.episodeNumber}`;
          // return <div>Show name: {data.show}</div>;
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
