import React, { useEffect, useState } from "react";
import { EChartOption } from "echarts";
import { Charts } from "./Charts";
import { JapanJson } from "../assets/japan";
// import Tokyo from "../assets/map_data/東京都.json";

interface TravelData {
  name: string;
  value: number;
}

const country = "Tokyo";

const Map: React.FC = () => {
  const [options, setOptions] = useState<EChartOption>({});
  const [travelData, setTravelData] = useState<TravelData[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import("../assets/mockup_data/japan_data.json");
        setTravelData(response.default);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setOptions({
      title: {
        text: "Journeys",
        // subtext: "Data",
        sublink: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
      },
      visualMap: [
        {
          left: "right",
          min: 0,
          max: 10,
          inRange: {
            color: [
              "#4575b4",
              "#313695",
              // "#74add1",
              // "#abd9e9",
              // "#e0f3f8",
              // "#ffffbf",
              // "#fee090",
              // "#fdae61",
              // "#f46d43",
              // "#d73027",
              // "#a50026",
            ],
          },
          // text: ["High", "Low"],
          calculable: true,
        },
      ],
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: "left",
        top: "top",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: "Journeys",
          type: "map",
          roam: true,
          map: country,
          emphasis: {
            label: {
              show: true,
            },
          },
          data: travelData,
        },
      ],
    });
  }, [travelData]);

  return <Charts options={options} geoData={JapanJson} country={country} />;
};

export default Map;
