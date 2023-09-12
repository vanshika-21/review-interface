import React from "react";

function ItemCard({ item, checked, onCheckboxChange, showCheckbox }) {
  return (
    <div className="item-card">
      <div className="item-card-content">
        <p>{item.comment}</p>
        <p>Timecode In: {item["timecode in"]}</p>
        <p>Timecode Out: {item["timecode out"]}</p>
        <p>Category: {item.categoryName}</p>
      </div>
      {showCheckbox && (
        <input type="checkbox" checked={checked} onChange={onCheckboxChange} />
      )}
    </div>
  );
}

export default ItemCard;
