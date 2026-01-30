import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EChartOption } from "echarts";
import { Charts, GeoJson, MapItem } from "./Charts";
import { getEnName, getZoom, getCenter } from "../assets/name_map";
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
  colors?: string[];
  // emphasis?: string;
}

const Map: React.FC<MapProps> = ({
  url = "travel1",
  drillDown = true,
  max = 1,
  min = 0,
  light = "#F4ECF7",
  dark = "#8E44AD",
  colors,
}) => {
  const [region, setRegion] = useState("Japan");
  const [geoData, setGeoData] = useState<GeoJson>();
  const [mapData, setMapData] = useState<MapData[]>();

  // 使用 useCallback 避免 handler 函数重复创建
  const handler = useCallback(
    (params: MapItem) => {
      if (!drillDown) return;
      const _county = getEnName(params.name);
      if (_county) setRegion(_county);
    },
    [drillDown],
  );

  const handleBack = useCallback(() => {
    setRegion("Japan");
  }, []);

  // 从配置获取 zoom 和 center
  const zoom = useMemo(() => getZoom(region), [region]);
  const center = useMemo(() => getCenter(region), [region]);

  useEffect(() => {
    const fetchGeo = async (name: string) => {
      try {
        const response = await import(`../assets/map_data/${name}.json`);
        setGeoData(response.default);
      } catch (error) {
        console.error("Error fetching geo data:", error);
      }
    };

    const fetchData = async (name: string) => {
      try {
        const response = await import(`../assets/${url}/${name}.json`);
        setMapData(response.default);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchGeo(region).then(() => fetchData(region));
  }, [region, url]);

  // 使用 useMemo 优化 options，避免不必要的重新计算
  const options = useMemo<EChartOption>(
    () => ({
      animation: true,
      title: {
        sublink: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: (hover) => {
          const name = (hover as { name?: string }).name || "";
          return getEnName(name) || name;
        },
      },
      visualMap: [
        {
          left: "right",
          min,
          max,
          inRange: {
            color: colors || [light, dark],
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
          label: { show: true, fontSize: 10 },
          zoom,
          data: mapData,
          center,
        },
      ],
    }),
    [mapData, region, zoom, min, max, light, dark, center, colors],
  );

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
