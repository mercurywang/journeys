import Map from "./Map";
import LabTabs, { TabItem, TabPanelItem } from "./basic/Tabs";

const MapList = () => {
  const tabs: TabItem[] = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
  ];

  const panels: TabPanelItem[] = [
    {
      children: <Map />,
      value: "1",
    },
    {
      children: <Map />,
      value: "2",
    },
    {
      children: <Map />,
      value: "3",
    },
  ];
  return <LabTabs tabs={tabs} tabPanels={panels} />;
};

export default MapList;
