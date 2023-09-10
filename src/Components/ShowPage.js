import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";

function ShowPage() {
  const { episodeNumber } = useParams();
  const [episodeData, setEpisodeData] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [showStatus, setShowStatus] = useState("incomplete");

  useEffect(() => {
    const selectedEpisode = compliancetaskdata.find(
      (episode) => episode.episodeNumber === episodeNumber
    );

    if (selectedEpisode) {
      setEpisodeData(selectedEpisode);
      initializeCheckedItems(selectedEpisode.items);
      setShowStatus(selectedEpisode.status);
    } else {
      return <p>Episode not found</p>;
    }
  }, [episodeNumber]);

  useEffect(() => {
    // Check if all items are checked
    const areAllItemsChecked = Object.values(checkedItems).every(
      (isChecked) => isChecked
    );

    // Enable the "Complete" button only if all items are checked
    setShowStatus(areAllItemsChecked ? "completed" : "incomplete");
    console.log("current value", showStatus);
  }, [checkedItems]);

  const initializeCheckedItems = (items) => {
    const initialCheckedItems = {};

    items.forEach((item, index) => {
      initialCheckedItems[index] = false; // Initialize all items as unchecked
    });

    setCheckedItems(initialCheckedItems);
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems({
      ...checkedItems,
      [index]: !checkedItems[index],
    });
    console.log(showStatus);
  };

  const handleCompleteButtonClick = () => {
    if (showStatus === "completed") {
      alert("Show marked as completed!");
    }
  };

  // console.log(episodeData);

  return (
    <div>
      {episodeData ? (
        <>
          <h2>Episode Number: {episodeData.episodeNumber}</h2>
          <h2>Show name: {episodeData.show}</h2>
          <h2>Show Status: {episodeData.status}</h2>
          <h2>Items:</h2>
          {episodeData.status === "Completed"
            ? episodeData.items.map((item, index) => (
                <div key={index}>{item.comment}</div>
              ))
            : episodeData.items.map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {item.comment}
                </div>
              ))}
          {episodeData.status !== "Completed" && (
            <>
              <button
                disabled={showStatus === "incomplete"}
                onClick={handleCompleteButtonClick}
              >
                Complete
              </button>
            </>
          )}
        </>
      ) : (
        <p>Episode not found</p>
      )}
    </div>
  );
}

export default ShowPage;
