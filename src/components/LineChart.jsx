import { ResponsiveLine } from "@nivo/line";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import DataExample from "../data/DataExample";
import React, { useState } from "react";

const lineData = DataExample.reduce((accumulator, entry) => {
  const date = new Date(entry.gestion, entry.mes - 1, entry.quincena * 14)
    .toISOString()
    .split("T")[0];

  // Filtrar las propiedades que no son relevantes
  const filteredProperties = Object.keys(entry).filter(
    (key) =>
      key !== "Periodo" &&
      key !== "quincena" &&
      key !== "mes" &&
      key !== "gestion" &&
      key !== "Estado"
  );

  // Iterar sobre las propiedades filtradas
  filteredProperties.forEach((key) => {
    const value = entry[key] === null ? 0 : entry[key];
    // Verificar si ya existe una entrada con la misma id
    const existingEntry = accumulator.find((item) => item.id === key);
    if (existingEntry) {
      // Si ya existe, agregar el nuevo punto de datos a la entrada existente
      existingEntry.data.push({ x: date, y: value });
    } else {
      // Si no existe, crear una nueva entrada
      accumulator.push({
        id: key,
        data: [{ x: date, y: value }],
      });
    }
  });

  return accumulator;
}, []);

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedId, setSelectedId] = useState(null);

  const filteredData = selectedId
    ? lineData.filter((entry) => entry.id === selectedId)
    : lineData;

  console.log(filteredData);

  return (
    <Box>
      {/* Selector para elegir el id */}
      <Box display="flex" justifyContent="flex-end">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Mostrar todos</option>
          {lineData.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.id}
            </option>
          ))}
        </select>
      </Box>
      {/* Gráfico de línea */}
      <Box width={600} height={200}>
        <ResponsiveLine
          data={filteredData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
              container: {
                color: colors.primary[500],
              },
            },
          }}
          //colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xFormat="time:%Y-%m-%d"
          xScale={{
            format: "%Y-%m-%d",
            precision: "day",
            type: "time",
            useUTC: false,
          }}
          yScale={{
            type: "linear",
          }}
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            tickValues: "every 1 month",
            tickFormat: "%Y-%m-%d",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 5, // added
            tickSize: 3,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "TM", // added
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default LineChart;
