import React, { useEffect, useState } from "react";
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

const calculateDaysDifference = (inputDate: string) => {
  const today = new Date();
  const [month, day] = inputDate.split("/").map(Number);
  const year =
    month > today.getMonth() + 1
      ? today.getFullYear() - 1
      : today.getFullYear();

  const startDate = new Date(year, month - 1, day);
  const diffInTime = today.getTime() - startDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  return diffInDays;
};

const Map: React.FC = () => {
  const [chart, setChart] = useState<echarts.ECharts>();
  const [options, setOptions] = useState<EChartsOption>({});
  const [daysArray, setDaysArray] = useState<number[]>();
  const [dateArray, setDateArray] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import(`../assets/record.json`);
        const _date = response.default.map((item) => item.date);
        const _days = response.default.map(
          (item) => item.days || calculateDaysDifference(item.date)
        );
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
        // axisLabel: {
        //   interval: 0, // 强制显示所有标签
        // },
      },
      yAxis: {
        min: 0,
        max: 80,
        type: "value",
        axisLabel: {
          formatter: "{value} days",
        },
      },
      series: [
        {
          name: "record",
          type: "line",
          data: daysArray,
          lineStyle: {
            color: "#e2acf8",
          },
          itemStyle: {
            color: "#c54af8",
          },
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
