import React from "react";
import * as Recharts from "recharts/umd/Recharts";
const { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } = Recharts;

export default function Chart(props) {
  const { data } = props;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && data && data !== []) {
      // && data because don't run tool tip unless we have data
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            borderRadius: "2px",
            boxShadow: "0px 0px 60px #d5d5d5;",
          }}
        >
          <p style={{ margin: 0 }}>
            <span style={{ fontWeight: "bold" }}>{payload[0].value}</span>{" "}
            people write
          </p>
          <p style={{ margin: 0 }}>
            <span style={{ fontWeight: "bold" }}>{label}</span> words per minute
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <>
      <h2
        style={{
          textAlign: "center",
          padding: "20px",
          marginTop: "50px",
        }}
      >
        Global Scores 🏆
      </h2>
      <div className="chart">
        <ResponsiveContainer height="95%" width="95%">
          <BarChart
            width={600}
            height={400}
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <XAxis
              type="number"
              height={60}
              dataKey="wpm"
              type="number"
              domain={[20, 100]}
              label="words/min"
              ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]}
            ></XAxis>
            <Tooltip content={<CustomTooltip />}></Tooltip>
            <Bar dataKey="frequency" fill="orange"></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
