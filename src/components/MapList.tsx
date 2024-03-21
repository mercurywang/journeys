import Map, { MapProps } from "./Map";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

interface ButtonItem {
  label: string;
  props: MapProps;
}

const MapList = () => {
  const [mapProps, setMapProps] = useState<MapProps>({ url: "travel1" });
  const buttons: ButtonItem[] = [
    {
      label: "Travel",
      props: { url: "travel1" },
    },
    {
      label: "Travel",
      props: {
        url: "travel2",
        light: "#EAF2F8",
        dark: "#3498DB",
        emphasis: "#8E44AD",
      },
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
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup color="secondary" aria-label="Medium-sized button group">
          {buttons.map((item, idx) => (
            <Button key={idx} onClick={() => setMapProps(item.props)}>
              {item.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Map {...mapProps} />
    </>
  );
};

export default MapList;
