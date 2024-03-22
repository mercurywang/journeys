import React, { useEffect, useState } from "react";
import { EChartOption } from "echarts";
import { Charts, GeoJson, MapItem } from "./Charts";
import { getEnName, getZoom } from "../assets/name_map";
import Button from "@mui/material/Button";
import ReplyIcon from "@mui/icons-material/Reply";

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
  // emphasis?: string;
}

const Map: React.FC<MapProps> = ({
  url = "travel1",
  drillDown = true,
  max = 1,
  min = 0,
  light = "#F4ECF7",
  dark = "#8E44AD",
  // emphasis = "#48C9B0",
}) => {
  const [options, setOptions] = useState<EChartOption>({});
  const [region, setRegion] = useState("Japan");
  const [geoData, setGeoData] = useState<GeoJson>();
  const [mapData, setMapData] = useState<MapData[]>();
  const [zoom, setZoom] = useState(1.8);
  const [center, setCenter] = useState<[number, number]>([139, 38]);

  const handler = (params: MapItem) => {
    if (!drillDown) {
      return;
    }
    const _county = getEnName(params.name);
    setRegion(_county);
  };

  const handleBack = () => {
    setRegion("Japan");
    setZoom(1.8);
    setCenter([139, 38]);
  };

  useEffect(() => {
    const fetchGeo = async (name: string) => {
      try {
        const response = await import(`../assets/map_data/${name}.json`);
        setGeoData(response.default);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData = async (name: string) => {
      try {
        const response = await import(`../assets/${url}/${name}.json`);
        setMapData(response.default);
        const _zoom = getZoom(region);
        setZoom(_zoom);
        if (region === "Tokyo") {
          setCenter([139.42, 35.7]);
        }
        if (region === "Kagoshima") {
          setCenter([130.557, 31.68]);
        }
        if (region === "Okinawa") {
          setCenter([127.7, 26.48]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGeo(region).then(() => fetchData(region));
  }, [region, url]);

  useEffect(() => {
    setOptions({
      animation: true,
      title: {
        // text: "",
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
          // itemStyle: {
          //   emphasis: {
          //     areaColor: emphasis,
          //   },
          // },
          label: { show: true, fontSize: 10 },
          zoom,
          data: mapData,
          center:
            region === "Japan" ||
            region === "Tokyo" ||
            region === "Kagoshima" ||
            region === "Okinawa"
              ? center
              : undefined,
        },
      ],
    });
  }, [mapData, geoData, region, zoom, min, max, light, dark, center]);

  return (
    <div>
      <Button
        onClick={handleBack}
        variant="outlined"
        className={`mt-10 ${region !== "Japan" && drillDown ? "show" : "hide"}`}
        startIcon={<ReplyIcon />}
        color={`${url === "travel1" ? "secondary" : "primary"}`}
      >
        Back
      </Button>

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
