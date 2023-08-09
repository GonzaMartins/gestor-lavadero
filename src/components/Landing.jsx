import React, { useState } from "react";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landingContainer">
      <div className="border landingTitles">Lavadero Crosa</div>
      <div className="wave landingTitles">Lavadero Crosa</div>
      <button class="contactButton homeButton">
        {" "}
        Iniciar
        <div class="iconButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );
}
