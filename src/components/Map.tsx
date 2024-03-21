import React, { useEffect, useState } from "react";
import { EChartOption } from "echarts";
import { Charts, GeoJson, MapItem } from "./basic/Charts";
import { getEnName, getZoom } from "../assets/name_map";

interface MapData {
  name: string;
  value: number;
}

const Map: React.FC = () => {
  const [options, setOptions] = useState<EChartOption>({});
  const [region, setRegion] = useState("Japan");
  const [geoData, setGeoData] = useState<GeoJson>();
  const [mapData, setMapData] = useState<MapData[]>();
  const [zoom, setZoom] = useState(3);

  const fetchData = async (name: string) => {
    try {
      const response = await import(`../assets/mockup_data/${name}.json`);
      setMapData(response.default);
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
    const _zoom = getZoom(_county);
    setRegion(_county);
    setZoom(_zoom);
  };

  const handleBack = () => {
    setRegion("Japan");
    setZoom(3);
  };

  useEffect(() => {
    fetchData(region);
    fetchGeo(region);
  }, [region]);

  useEffect(() => {
    setOptions({
      animation: true,
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
          max: 3,
          inRange: {
            color: ["#EBDEF0", "#C39BD3", "#76448A"],
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
          itemStyle: {
            emphasis: {
              areaColor: "#76D7C4",
            },
          },
          label: { show: true, fontSize: 10 },
          zoom,
          data: mapData,
        },
      ],
    });
  }, [mapData, geoData, region, zoom]);

  return (
    <div>
      <button
        onClick={handleBack}
        className={`${region !== "Japan" ? "show" : "hide"}`}
      >
        Back
      </button>
      <Charts
        options={options}
        geoData={geoData}
        country={region}
        handler={handler}
      />
    </div>
  );
};

export default Map;
