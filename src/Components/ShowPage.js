import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import compliancetaskdata from "../compliance-task-data.json";
import "../Style/ShowPage.css";
import ItemCard from "./ItemCard";
import Swal from "sweetalert2";

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

  // Update the showStatus to "completed"
  const markAsCompleted = () => {
    setEpisodeData((prevData) => ({
      ...prevData,
      status: "completed",
    }));
  };

  const handleCompleteButtonClick = () => {
    if (showStatus === "completed") {
      Swal.fire({
        title: "Good job!",
        text: "Items reviewed completely",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          markAsCompleted();
        }
      });
    }
  };

  return (
    <div>
      {episodeData ? (
        <>
          <div className="episodeName">
            <div>
              <h2 className="lumi-text">{episodeData.show}</h2>
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
              <span>
                <button
                  className={`custom-button ${
                    showStatus === "incomplete" ? "disabled" : ""
                  }`}
                  disabled={showStatus === "incomplete"}
                  onClick={handleCompleteButtonClick}
                  type="button"
                >
                  Complete
                </button>
              </span>
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
