import React, { useEffect, useRef } from "react";
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
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 清理现有实例
    if (chartInstanceRef.current) {
      if (!chartInstanceRef.current.isDisposed()) {
        chartInstanceRef.current.dispose();
      }
      chartInstanceRef.current = null;
    }

    // 创建新实例
    const myChart = echarts.init(chartRef.current);
    chartInstanceRef.current = myChart;

    // 注册地图和设置选项
    echarts.registerMap(country, geoData);
    myChart.setOption(options, true);
    myChart.on("click", handler);

    // 清理函数
    return () => {
      if (chartInstanceRef.current && !chartInstanceRef.current.isDisposed()) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, [options, geoData, country, handler]);

  // 组件卸载时的最终清理
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current && !chartInstanceRef.current.isDisposed()) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={chartRef} style={{ height: "88vh", width: "100%" }} />;
};
