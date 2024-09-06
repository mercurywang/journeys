import { Grid } from "@mui/material";
import { FC } from "react";

export interface CourseItem {
  explanation: string;
  schedule: string;
}

export interface CourseProps {
  items?: CourseItem[];
}

const Course: FC<CourseProps> = ({ items }) => {
  return (
    <div className="text-left margin-auto">
      <Grid container spacing={2} rowSpacing={1}>
        {items?.map((item) => (
          <Grid item xs={6} className="bordered mb-20">
            <div>{item.schedule}</div>
            <div dangerouslySetInnerHTML={{ __html: item.explanation }} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Course;
