import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function ExampleChart() {


  return (
    <>
      <div class="card" aria-hidden="true">
          <div class="card-body">
            <h5 class="card-title placeholder-glow">
              <span class="placeholder col-6"></span>
            </h5>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
            <a class="btn btn-primary disabled placeholder col-6"></a>
          </div>
      </div>
    </>

  );
}

export default ExampleChart;
