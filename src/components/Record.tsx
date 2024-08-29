import React, { useEffect, useState } from "react";
import { Charts } from "./Charts";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  MarkLineComponent,
  MarkLineComponentOption,
  MarkPointComponent,
  MarkPointComponentOption,
} from "echarts/components";

import { LineChart, LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

interface RecordData {
  date: string;
  days: number;
}

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | MarkLineComponentOption
  | MarkPointComponentOption
  | LineSeriesOption
>;

const Map: React.FC = () => {
  const [chart, setChart] = useState<echarts.ECharts>();
  const [options, setOptions] = useState<EChartsOption>({});
  const [daysArray, setDaysArray] = useState<number[]>();
  const [dateArray, setDateArray] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import(`../assets/record.json`);
        const _days = response.default.map((item) => item.days);
        const _date = response.default.map((item) => item.date);
        setDaysArray(_days);
        setDateArray(_date);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const option: EChartsOption = {
      title: {
        text: "Records",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        show: false,
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: dateArray,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} days",
        },
      },
      series: [
        {
          name: "Periods",
          type: "line",
          data: daysArray,
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
      ],
    };

    setOptions(option);
  }, [daysArray, dateArray]);

  useEffect(() => {
    const chartDom = document.getElementById("record");
    let myChart = echarts.getInstanceByDom(chartDom as HTMLDivElement);

    if (!myChart) {
      myChart = echarts.init(chartDom);
    }

    myChart.setOption(options, true);
    setChart(myChart);

    return () => {
      chart?.dispose();
    };
  }, [options, chart]);

  return <div id="record" style={{ height: "88vh", width: "100%" }} />;
};

export default Map;
