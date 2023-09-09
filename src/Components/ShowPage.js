import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";

function ShowPage() {
  const { episodeNumber } = useParams(); // Get episodeNumber from the URL
  const [episodeData, setEpisodeData] = useState(null);

  useEffect(() => {
    // Find the episode data in the JSON file based on the episodeNumber
    const selectedEpisode = compliancetaskdata.find(
      (episode) => episode.episodeNumber === episodeNumber
    );

    if (selectedEpisode) {
      // Set the episode data if it's found
      setEpisodeData(selectedEpisode);
    } else {
      // Handle the case where the episode data is not found
      // For example, you can display a message or redirect to an error page
    }
  }, [episodeNumber]);

  return (
    <div>
      {episodeData ? (
        <>
          <h2>Episode Number: {episodeData.episodeNumber}</h2>
          {/* Display other episode details as needed */}
          <h2>Show name: {episodeData.show}</h2>
        </>
      ) : (
        <p>Episode not found</p>
      )}
    </div>
  );
}

export default ShowPage;
