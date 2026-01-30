import { Grid, Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import n3Data from "../assets/courses/n3.json";
import n4Data from "../assets/courses/n4.json";

export interface CourseItem {
  explanation: string;
  schedule: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="text-left margin-auto"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

const Course: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="N4" />
        <Tab label="N3" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2} rowSpacing={1} rowGap={4}>
          {n4Data?.map((item, idx) => (
            <Grid item xs={6} className="bordered" key={`n4-${idx}`}>
              <div>{item.schedule}</div>
              <div dangerouslySetInnerHTML={{ __html: item.explanation }} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2} rowSpacing={1} rowGap={4}>
          {n3Data?.map((item, idx) => (
            <Grid item xs={6} className="bordered" key={`n3-${idx}`}>
              <div>{item.schedule}</div>
              <div dangerouslySetInnerHTML={{ __html: item.explanation }} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </>
  );
};

export default Course;
