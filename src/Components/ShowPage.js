import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";
import "../Style/ShowPage.css";
import ItemCard from "./ItemCard";

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
          <div className="episodeName">
            <div>
              <h2 className="luminance-text">{episodeData.show}</h2>
            </div>
            <div>
              <h2>Episode Number: {episodeData.episodeNumber}</h2>
            </div>
            <div>
              <h2>Status: {episodeData.status}</h2>
            </div>
            <div>
              <h2>{episodeData.reviewDate}</h2>
            </div>
          </div>

          {/* <h2>Items:</h2>
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
              ))} */}
          <h2>Items:</h2>
          <div className="grid-container">
            {episodeData.items.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                checked={checkedItems[index]}
                onCheckboxChange={() => handleCheckboxChange(index)}
                showCheckbox={episodeData.status !== "Completed"}
              />
            ))}
          </div>
          <div>
            {episodeData.status !== "Completed" && (
              <>
                <button
                  className="completed-button"
                  disabled={showStatus === "incomplete"}
                  onClick={handleCompleteButtonClick}
                >
                  Complete
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <p>Episode not found</p>
      )}
    </div>
  );
}

export default ShowPage;
