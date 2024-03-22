import Map, { MapProps } from "./Map";
import { ReactElement, useState } from "react";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import CropOriginalTwoToneIcon from "@mui/icons-material/CropOriginalTwoTone";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import Tabs from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
interface TabItem extends TabProps {
  label: string;
  props: MapProps;
  icon: ReactElement;
}

const MapList = () => {
  const [mapProps, setMapProps] = useState<MapProps>({ url: "travel1" });
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        emphasis: "#8E44AD",
      },
      icon: <SavingsTwoToneIcon color="primary" />,
      color: "primary",
    },
    {
      label: "Area",
      props: {
        url: "area",
        min: 1867,
        max: 83424.84,
        drillDown: false,
        light: "#EAFAF1",
        dark: "#239B56",
        emphasis: "rgba(222, 49, 99, 0.6)",
      },
      icon: <CropOriginalTwoToneIcon color="success" />,
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
        emphasis: "#FF7F50",
      },
      icon: <SupervisorAccountTwoToneIcon color="error" />,
      color: "error",
    },
    {
      label: "GDP",
      props: {
        url: "gdp",
        min: 1893375,
        max: 115682412,
        drillDown: false,
        light: "rgba(0, 205, 171, 0.2)",
        dark: "rgb(0, 205, 171)",
        emphasis: "rgb(222, 49, 99)",
      },
      icon: <PaidTwoToneIcon color="warning" />,
      color: "warning",
    },
  ];

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
              key={idx}
              // label={item.label}
              color={item.color}
              icon={item.icon}
              onClick={() => setMapProps(item.props)}
              className="button-width"
            />
          ))}
        </Tabs>
      </AppBar>
      <Map {...mapProps} />
    </>
  );
};

export default MapList;
