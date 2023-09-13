import React from "react";

function ItemCard({ item, checked, onCheckboxChange, showCheckbox }) {
  return (
    <div className="item-card">
      <div className="item-card-content">
        <p>{item.comment}</p>
        <p>Timecode In: {item["timecode in"]}</p>
        <p>Timecode Out: {item["timecode out"]}</p>
        <p>Category: {item.categoryName}</p>
        {showCheckbox && (
          <label className="custom-checkbox-label">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={checked}
              onChange={onCheckboxChange}
              id={`checkbox-${item.id}`}
            />
            <span className="checkmark"></span>{" "}
          </label>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
