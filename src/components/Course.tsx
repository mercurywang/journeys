import { FC } from "react";

export interface CourseItem {
  content: string;
  schedule: string;
}

export interface CourseProps {
  items?: CourseItem[];
}

const Course: FC<CourseProps> = ({ items }) => {
  return (
    <div className="text-left margin-auto">
      {items?.map((item) => (
        <>
          <div>{item.schedule}</div>
          <div
            dangerouslySetInnerHTML={{ __html: item.content }}
            className="mb-20"
          />
        </>
      ))}
    </div>
  );
};

export default Course;
