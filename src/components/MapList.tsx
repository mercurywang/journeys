import Map, { MapProps } from "./Map";
import { ReactElement, useState } from "react";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";
import Tabs from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
// import Course from "./Course";
// import courseData from "../assets/courses.json";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import Record from "./Record";
interface TabItem extends TabProps {
  label: string;
  props?: MapProps;
  icon?: ReactElement;
}

const buttons: TabItem[] = [
  {
    label: "Travel",
    props: { url: "travel1" },
    icon: <SavingsTwoToneIcon color="secondary" />,
    color: "secondary",
  },
  {
    label: "Travel",
    props: {
      url: "travel2",
      light: "#EAF2F8",
      dark: "#3498DB",
    },
    icon: <SavingsTwoToneIcon color="primary" />,
    color: "primary",
  },
  {
    label: "Region",
    props: {
      url: "region",
      min: 1,
      max: 7,
      drillDown: false,
      colors: ["lightskyblue", "yellow", "orangered"],
    },
    icon: <MapTwoToneIcon color="success" />,
    color: "success",
  },
  {
    label: "Population",
    props: {
      url: "population",
      min: 566000,
      max: 13960000,
      drillDown: false,
      light: "rgba(222, 49, 99, 0.1)",
      dark: "rgb(222, 49, 99)",
    },
    icon: <SupervisorAccountTwoToneIcon color="error" />,
    color: "error",
  },
  // {
  //   label: "GDP",
  //   props: {
  //     url: "gdp",
  //     min: 1893375,
  //     max: 115682412,
  //     drillDown: false,
  //     light: "rgba(0, 205, 171, 0.05)",
  //     dark: "rgb(0, 205, 171)",
  //   },
  //   icon: <PaidTwoToneIcon className="green" />,
  //   color: "warning",
  // },
  {
    label: "RECORDS",
    icon: <CircleTwoToneIcon className="pink" />,
    color: "warning",
  },
];

const MapList = () => {
  const [value, setValue] = useState(0);
  const [lastTab, setLastTab] = useState(true);
  const [mapProps, setMapProps] = useState<MapProps | null>({ url: "travel1" });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="secondary"
          textColor="secondary"
        >
          {buttons.map((item, idx) => (
            <Tab
              value={idx}
              key={idx}
              color={item.color}
              icon={item.icon}
              onClick={() => {
                if (item.label !== "RECORDS") {
                  setMapProps(item.props as MapProps);
                  setLastTab(false);
                  return;
                }
                setLastTab(true);
              }}
              className="button-width"
            />
          ))}
        </Tabs>
      </AppBar>
      {/* {isLastTab ? <Course items={courseData} /> : <Map {...mapProps} />} */}
      {lastTab ? <Record /> : <Map {...mapProps} />}
    </>
  );
};

export default MapList;
