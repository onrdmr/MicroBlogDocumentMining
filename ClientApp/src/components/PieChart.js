import React from 'react';
import { PieChart as MinimalPieChart } from 'react-minimal-pie-chart';

export const PieChart = ({ data }) => {
  return (
    <div>
      <h1>onur</h1>
      <MinimalPieChart
        animation
        animationDuration={500}
        animationEasing="ease-out"
        center={[50, 50]}
        data={[
          {
          color: "#E38627",
          title: "One",
          value: 10,
          },
          {
          color: "#C13C37",
          title: "Two",
          value: 15,
          },
          {
          color: "#6A2135",
          title: "Three",
          value: 20,
          },
        ]}
        labelPosition={50}
        lengthAngle={360}
        lineWidth={15}
        paddingAngle={0}
        radius={50}
        rounded
        startAngle={0}
        viewBoxSize={[100, 100]}
      />
    </div>
  );
};

// export const default PieChart;