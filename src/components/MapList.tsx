import Map from "./Map";
import { ReactElement, ReactNode, useState } from "react";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Course from "./Course";
import courseData from "../assets/courses/c1.json";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";
import Record from "./Record";
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
          max: 7,
          drillDown: false,
          colors: ["lightskyblue", "yellow", "orangered"],
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
  {
    label: "Course",
    icon: <TranslateTwoToneIcon className="green" />,
    children: <Course items={courseData} />,
    color: "warning",
  },
  {
    label: "Records",
    icon: <CircleTwoToneIcon className="pink" />,
    children: <Record />,
    color: "warning",
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
      {items[value]?.children}
    </>
  );
};

export default MapList;
