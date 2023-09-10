import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";
import "../Style/searchBox.css";
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
      <h1>Home Page</h1>
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

      {channels.map((channel) => {
        return (
          <div key={channel}>
            <h4>
              <Link to={`/channel/${channel}`} state={{ data }}>
                {channel}
              </Link>
            </h4>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;
