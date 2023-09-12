import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";
import "../Style/searchBox.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../Style/HomePage.css";
import { WidthFull } from "@mui/icons-material";
import sonyMarathilogo from "../images/sonymarathi.png";
import { Search as SearchIcon } from "@mui/icons-material";

function getChannelImageSrc(channel) {
  switch (channel) {
    case "sab":
      return "https://upload.wikimedia.org/wikipedia/en/f/f4/Sony_Sab_new.png";
    case "marathi":
      return sonyMarathilogo;
    case "set":
      return "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Sony_TV_new.png/225px-Sony_TV_new.png";
    default:
      return ""; // You can provide a default image source or handle this case accordingly
  }
}

function HomePage() {
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [filteredShows, setFilteredShows] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to track search input visibility
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

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle search input visibility
    setSearchQuery(""); // Clear search query when opening/closing
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
              src="https://d1or4efq32i6bx.cloudfront.net/images/logo-new.png"
              alt="Logo"
              className="logo"
            />
          </div>

          {/* search box design */}
          <div
            className={`navbar-right ${isSearchOpen ? "is-search-open" : ""}`}
          >
            <div className="search-container">
              {/* <input
                type="text"
                placeholder="Search shows..."
                className="search-input"
                value={searchQuery}
                onChange={handleInputChange}
              /> */}
              <button
                className="search-icon"
                onClick={handleSearchToggle} // Toggle search input
              >
                <SearchIcon />
              </button>
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search shows..."
                  className="search-input"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
              )}
              {showSuggestions && (
                <div className="suggestions-dropdown">
                  {filteredShows.length > 0 ? (
                    filteredShows.map((show) => (
                      <div
                        key={show.show + show.episodeNumber}
                        className="suggestion"
                        onClick={() => handleShowSelection(show)}
                      >
                        {show.show} (Episode {show.episodeNumber})
                      </div>
                    ))
                  ) : (
                    <div> No show present </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      <div
        style={{
          height: "25rem",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          color: "whitesmoke",
          backgroundImage: `url(https://i.pinimg.com/originals/7f/e7/74/7fe774bbacce09f00cb5b2e3cbc48db3.png)`, // Set the background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1 className="luminance-text">WELCOME USER</h1>
      </div>

      {/* card design */}
      <div
        style={{
          marginTop: "30px",
          // backgroundImage: `url(https://img.freepik.com/free-vector/realistic-white-golden-geometric-background_79603-2032.jpg)`, // Set the background image
        }}
      >
        <h1 className="typing-animation">Select your TV channel</h1>
        <div className="card-container">
          {channels.map((channel) => (
            <Link
              to={`/channel/${channel}`}
              state={{ data }}
              key={channel}
              className="card-link"
            >
              <Card className="card">
                <div
                  className="card-bg"
                  style={{
                    backgroundImage: `url(${getChannelImageSrc(channel)})`,
                  }}
                ></div>
                {/* <CardContent>
                  <Typography variant="h5" component="div">
                    {channel}
                  </Typography>
                </CardContent> */}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
