import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";
import "../Style/searchBox.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../Style/HomePage.css";

function HomePage() {
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [filteredShows, setFilteredShows] = useState([]);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const getChannels = (data) => {
    const tempChannels = [];
    data.forEach((element) => {
      const temp = element.channel;
      if (!tempChannels.includes(temp)) tempChannels.push(temp);
    });
    return tempChannels;
  };

  useEffect(() => {
    setChannels(getChannels(compliancetaskdata));
    setData(compliancetaskdata);
  }, []);

  const updateFilteredShows = (query) => {
    if (!query) {
      return [];
    }

    const filtered = data.filter((item) =>
      item.show.toLowerCase().startsWith(query.toLowerCase())
    );
    return filtered;
  };

  const handleShowSelection = (show) => {
    setSelectedShow(show);
    setShowSuggestions(false);
    setSearchQuery(show.show);
    navigate(`/channel/${show.channel}/show/${show.episodeNumber}`);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      const filtered = updateFilteredShows(searchQuery);
      setFilteredShows(filtered);
    } else {
      setFilteredShows([]); // Clear the filtered list when searchQuery is empty
    }
  }, [searchQuery, data]);

  return (
    <div>
      <div>
        <nav className="navbar">
          {/* Logo */}
          <div className="navbar-left">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Sony_TV_new.png/225px-Sony_TV_new.png"
              alt="Logo"
              className="logo"
            />
          </div>

          {/* search box design */}
          <div className="navbar-right">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search shows..."
                className="search-input"
                value={searchQuery}
                onChange={handleInputChange}
              />
              {showSuggestions && (
                <div className="suggestions-dropdown">
                  {filteredShows.map((show) => (
                    <div
                      key={show.show + show.episodeNumber}
                      className="suggestion"
                      onClick={() => handleShowSelection(show)}
                    >
                      {show.show} (Episode {show.episodeNumber})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      {/* card design */}
      <div style={{ marginTop: "60px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {channels.map((channel) => {
            return (
              <Card key={channel} style={{ margin: "16px", minWidth: "200px" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <Link to={`/channel/${channel}`} state={{ data }}>
                      {channel}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
