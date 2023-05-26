import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function ExampleChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://o5t896hzxk.execute-api.us-east-1.amazonaws.com/Prod/servicio-buscar-todos");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Data",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Ejemplo de gráfico</h2>
      <Line data={chartData} />
    </div>
  );
}

export default ExampleChart;
