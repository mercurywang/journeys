import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export interface TabItem {
  label: string;
  value: string;
}
export interface TabPanelItem {
  children?: React.ReactNode;
  value: string;
}

export interface LabTabsProps {
  tabs?: TabItem[];
  tabPanels?: TabPanelItem[];
}

const LabTabs: React.FC<LabTabsProps> = ({ tabs = [], tabPanels = [] }) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            {tabs.map((item) => (
              <Tab label={item.label} value={item.value} key={item.value} />
            ))}
          </TabList>
        </Box>
        {tabPanels.map((item) => (
          <TabPanel value={item.value} key={item.value}>
            {item.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default LabTabs;
