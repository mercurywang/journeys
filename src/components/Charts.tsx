import { useEffect, useRef, memo } from "react";
import * as echarts from "echarts";
import type { EChartOption, ECharts } from "echarts";

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

const ChartsComponent: React.FC<BaseChartProps> = ({
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
    chartInstanceRef.current?.dispose();

    // 创建新实例
    const myChart = echarts.init(chartRef.current);
    chartInstanceRef.current = myChart;

    // 注册地图和设置选项
    echarts.registerMap(country, geoData);
    myChart.setOption(options, true);
    myChart.on("click", handler);

    // 窗口大小变化时自动调整
    const handleResize = () => myChart.resize();
    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, [options, geoData, country, handler]);

  return <div ref={chartRef} style={{ height: "88vh", width: "100%" }} />;
};

// 使用 memo 避免不必要的重渲染
export const Charts = memo(ChartsComponent);
