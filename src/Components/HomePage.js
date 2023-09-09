import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";
import axios from "axios";

function HomePage() {
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  // const [selectedEpisode, setSelectedEpisode] = useState(null);

  // Fetch data from the API or use the provided 'compliance-task-data.json' here

  const getChannels = (data) => {
    const tempChannels = [];
    data.forEach((element) => {
      const temp = element.channel;
      if (!tempChannels.includes(temp)) tempChannels.push(temp);
    });

    return tempChannels;
  };

  // const getData = () => {
  //   fetch(compliancetaskdata)
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

  // const getdata2 = () => {
  //   axios
  //     .get("/compliance-task-data.json")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  console.log(channels);
  // useEffect(() => {
  //   getdata2();
  // }, []);

  useEffect(() => {
    // setData(compliancetaskdata.json);
    setChannels(getChannels(compliancetaskdata));
    // Define the URL of your JSON file
    // const jsonFileURL = "../compliance-task-data.json";

    // // Make a GET request using Axios
    // axios
    //   .get(jsonFileURL)
    //   .then((response) => {
    //     // Log the JSON data
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching JSON data:", error);
    //   });
    console.log(compliancetaskdata);
  }, []);

  // Handle episode selection

  return (
    <div>
      <h1>Home page</h1>
      {channels &&
        channels.map((channel) => {
          return (
            <div>
              {/* <h4>{channel}</h4> */}
              {/* <ul>
                {data.map((item, idx) => {
                  if (item.channel === channel) {
                    return <li key={idx}>{item.show}</li>;
                  }
                })}
              </ul> */}

              <div key={channel}>
                <h4>
                  <Link to={`/channel/${channel}`} state={{ data }}>
                    {channel}
                  </Link>
                </h4>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default HomePage;
