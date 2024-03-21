import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { EChartOption, ECharts } from "echarts";

interface Property {
  name: string;
}
interface Feature {
  properties: Property;
}

export interface GeoJson {
  features: Feature[];
  type: string;
}

export interface MapItem {
  name: string;
}

type BaseChartProps = {
  options: EChartOption;
  geoData?: GeoJson;
  country: string;
  handler: (params: MapItem) => void;
};

export const Charts: React.FC<BaseChartProps> = ({
  options,
  geoData = {},
  country,
  handler,
}) => {
  const [chart, setChart] = useState<ECharts>();

  useEffect(() => {
    const chartDom = document.getElementById("chart");
    let myChart = echarts.getInstanceByDom(chartDom as HTMLDivElement);

    if (!myChart) {
      myChart = echarts.init(chartDom);
    }

    echarts.registerMap(country, geoData);
    myChart.setOption(options, true);
    myChart.on("click", handler);
    setChart(myChart);

    return () => {
      chart?.dispose();
    };
  }, [options, geoData, country, handler, chart]);

  return <div id="chart" style={{ height: "88vh", width: "100%" }} />;
};
