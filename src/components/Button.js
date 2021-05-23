import React from "react";
import "./Button.css";

export default function Button({ name, color }) {
  return (
    <div style={{ backgroundColor: color }} className="button">
      {name}
    </div>
  );
}
