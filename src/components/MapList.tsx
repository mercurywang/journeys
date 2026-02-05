import { lazy, Suspense, ReactElement, ReactNode, useState } from "react";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";

// 懒加载组件，优化首屏加载
const Map = lazy(() => import("./Map"));

// 加载中占位组件
const Loading = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
    <CircularProgress />
  </div>
);
interface TabItem {
  label: string;
  children?: ReactNode;
  icon?: ReactElement;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
}

const items: TabItem[] = [
  {
    label: "Travel1",
    children: <Map url="travel1" />,
    icon: <SavingsTwoToneIcon color="secondary" />,
    color: "secondary",
  },
  {
    label: "Travel2",
    children: (
      <Map
        {...{
          url: "travel2",
          light: "#EAF2F8",
          dark: "#3498DB",
        }}
      />
    ),
    icon: <SavingsTwoToneIcon color="primary" />,
    color: "primary",
  },
  {
    label: "Region",
    children: (
      <Map
        {...{
          url: "region",
          min: 1,
          max: 10,
          drillDown: false,
          colors: [
            "lightskyblue", // 浅蓝
            "#90EE90", // 绿
            "yellow", // 黄
            "#FFA500", // 橙
            "pink", // 粉
            "#DDA0DD", // 浅紫色
            "orangered", // 红
          ],
        }}
      />
    ),
    icon: <MapTwoToneIcon color="success" />,
    color: "success",
  },
  {
    label: "Population",
    children: (
      <Map
        {...{
          url: "population",
          min: 566000,
          max: 13960000,
          drillDown: false,
          light: "rgba(222, 49, 99, 0.1)",
          dark: "rgb(222, 49, 99)",
        }}
      />
    ),
    icon: <SupervisorAccountTwoToneIcon color="error" />,
    color: "error",
  },
];

const MapList = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="sticky" className="bg-white">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="secondary"
          textColor="secondary"
        >
          {items.map((item, idx) => (
            <Tab
              value={idx}
              key={idx}
              color={item.color}
              icon={item.icon}
              className="button-width"
            />
          ))}
        </Tabs>
      </AppBar>
      <Suspense fallback={<Loading />}>{items[value]?.children}</Suspense>
    </>
  );
};

export default MapList;
