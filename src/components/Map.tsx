import React, { useEffect, useState } from "react";
import { EChartOption } from "echarts";
import { Charts, GeoJson, MapItem } from "./Charts";
import { getEnName } from "../assets/name_map";

interface TravelData {
  name: string;
  value: number;
}

const Map: React.FC = () => {
  const [options, setOptions] = useState<EChartOption>({});
  const [region, setRegion] = useState("Japan");
  const [geoData, setGeoData] = useState<GeoJson>();
  const [travelData, setTravelData] = useState<TravelData[]>();

  const fetchData = async (name: string) => {
    try {
      const response = await import(`../assets/mockup_data/${name}.json`);
      setTravelData(response.default);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchGeo = async (name: string) => {
    try {
      const response = await import(`../assets/map_data/${name}.json`);
      setGeoData(response.default);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handler = (params: MapItem) => {
    const _county = getEnName(params.name);
    console.log(_county);
    setRegion(_county);
  };

  useEffect(() => {
    fetchData(region);
    fetchGeo(region);
  }, [region]);

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
          max: 5,
          inRange: {
            color: ["#fff", "yellow", "orangered"],
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
          map: region,
          emphasis: {
            label: {
              show: true,
            },
          },
          label: { show: true, fontSize: 10 },
          zoom: 2,
          data: travelData,
        },
      ],
    });
  }, [travelData, geoData, region]);

  return (
    <Charts
      options={options}
      geoData={geoData}
      country={region}
      handler={handler}
    />
  );
};

export default Map;
