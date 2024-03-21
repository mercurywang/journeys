import React, { useEffect, useState } from "react";
import { EChartOption } from "echarts";
import { Charts, GeoJson, MapItem } from "./Charts";
import { getEnName, getZoom } from "../assets/name_map";

interface MapData {
  name: string;
  value: number;
}

export interface MapProps {
  url?: string;
  drillDown?: boolean;
  range?: [number, number];
}

const Map: React.FC<MapProps> = ({ url, drillDown, range = [0, 3] }) => {
  const [options, setOptions] = useState<EChartOption>({});
  const [region, setRegion] = useState("Japan");
  const [geoData, setGeoData] = useState<GeoJson>();
  const [mapData, setMapData] = useState<MapData[]>();
  const [zoom, setZoom] = useState(3);

  const handler = (params: MapItem) => {
    if (!drillDown) {
      return;
    }

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
    const fetchData = async (name: string) => {
      try {
        const response = await import(`../assets/${url}/${name}.json`);
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
    fetchData(region);
    fetchGeo(region);
  }, [region, url]);

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
          min: range[0],
          max: range[1],
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
  }, [mapData, geoData, region, zoom, range]);

  return (
    <div>
      <button
        onClick={handleBack}
        className={`${region !== "Japan" && drillDown ? "show" : "hide"}`}
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
