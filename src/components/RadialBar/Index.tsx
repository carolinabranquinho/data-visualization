import { Legend, RadialBar, RadialBarChart, Tooltip, Treemap } from "recharts";
import useGroupBy from "../../hooks/useGroupBy";
const data = require("../../data/books.json");

export default function RadialBarComponent() {
  const groupedData = useGroupBy(data, "genre");
  console.log(groupedData);
  return (
    <div>
      <h1>Radial Bar Chart</h1>
      <RadialBarChart
        width={730}
        height={250}
        cx={150}
        cy={150}
        innerRadius={20}
        outerRadius={140}
        barSize={10}
        data={groupedData}
      >
        <RadialBar
          //   minAngle={15}
          label={{ fill: "#666", position: "insideStart" }}
          background
          //   clockWise={true}
          dataKey="genre"
        />
        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip />
      </RadialBarChart>
    </div>
  );
}
