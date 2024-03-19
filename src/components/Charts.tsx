import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { EChartOption, ECharts } from "echarts";

interface Property {
  name: string;
}
interface Feature {
  properties: Property;
}

interface GeoJson {
  features: Feature[];
  type: string;
}

type BaseChartProps = {
  options: EChartOption;
  geoData: GeoJson;
  country: string;
};

export const Charts: React.FC<BaseChartProps> = ({
  options,
  geoData,
  country,
}) => {
  const chartRef = useRef<HTMLInputElement>(null);
  const [chart, setChart] = useState<ECharts>();

  const handleResize = () => {
    chart?.resize();
  };

  const initChart = () => {
    if (chart) {
      window.removeEventListener("resize", handleResize);
      chart?.dispose();
    }

    const newChart = echarts?.init(chartRef?.current as HTMLDivElement);
    echarts.registerMap(country, geoData);
    newChart.setOption(options, true);
    window.addEventListener("resize", handleResize);
    setChart(newChart);
  };

  useEffect(() => {
    initChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return <div ref={chartRef} style={{ height: "100vh", width: "100%" }} />;
};
