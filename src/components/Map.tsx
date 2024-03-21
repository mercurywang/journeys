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
  max?: number;
  min?: number;
  light?: string;
  dark?: string;
  emphasis?: string;
}

const Map: React.FC<MapProps> = ({
  url = "travel1",
  drillDown = true,
  max = 3,
  min = 0,
  light = "#F4ECF7",
  dark = "#76448A",
  emphasis = "#48C9B0",
}) => {
  const [options, setOptions] = useState<EChartOption>({});
  const [region, setRegion] = useState("Japan");
  const [geoData, setGeoData] = useState<GeoJson>();
  const [mapData, setMapData] = useState<MapData[]>();
  const [zoom, setZoom] = useState(1.8);

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
    setZoom(1.8);
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
        // text: "",
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
          min,
          max,
          inRange: {
            color: [light, dark],
          },
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
      // geo: {
      //   select: {
      //     itemStyle: {
      //       areaColor: "#A3E4D7",
      //     },
      //   },
      //   regions: [
      //     {
      //       name: region,
      //     },
      //   ],
      // },
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
              areaColor: emphasis,
            },
          },

          label: { show: true, fontSize: 10 },
          zoom,
          data: mapData,
          center: region === "Japan" ? [140, 39] : undefined,
        },
      ],
    });
  }, [mapData, geoData, region, zoom, min, max, light, dark, emphasis]);

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
