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
      props: { url: "travel2" },
    },
    {
      label: "Area",
      props: { url: "area", range: [1867, 83424.84] },
    },
    {
      label: "Population",
      props: { url: "population", range: [566000, 13960000] },
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
