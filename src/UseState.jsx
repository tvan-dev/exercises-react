import { useState } from "react";
import "./App.css";

// let data = [
//   {
//     id: 15,
//     title: "HTML CSS Pro",
//     slug: "htmlcss",
//     description:
//       " lên tới 8 dự án trên Figma, 300+ bài tập và flashcards, tặng 3+ games, tặng 20+ Figma để thực hành, cộng đồng học viên Pro nhiệt tình hỗ trợ nhau, mua một lần học mãi mãi.",
//     image_url:
//       "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png",
//     icon_url:
//       "https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png",
//     price: 1299000,
//     old_price: 2500000,
//     is_pro: true,
//     is_published: true,
//     students_count: 0,
//     videos_count: 590,
//     duration: 420602,
//     duration_text: "116h50p",
//     user_progress: 0,
//     last_completed_at: null,
//     published_at: "2022-08-18T17:00:00.000000Z",
//   },
//   {
//     id: 19,
//     title: "JavaScript Pro",
//     slug: "javascript",
//     description:
//       "Vue.js, Node.js, v.v. Mục tiêu là giúp bạn có thể làm chủ JavaScript thông qua việc am hiểu cơ chế hoạt động của ngôn ngữ.",
//     image_url:
//       "https://files.fullstack.edu.vn/f8-prod/courses/19/66aa28194b52b.png",
//     icon_url:
//       "https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb685c81.png",
//     price: 1399000,
//     old_price: 3299000,
//     is_pro: true,
//     is_published: true,
//     students_count: 0,
//     videos_count: 249,
//     duration: 174793,
//     duration_text: "48h33p",
//     user_progress: 98,
//     last_completed_at: "2025-07-29 07:23:55",
//     published_at: "2024-08-08T17:00:00.000000Z",
//   },
// ];
// const courses = [
//   {
//     id: 1,
//     name: "Khóa học HTML CSS",
//   },
//   {
//     id: 2,
//     name: "Khóa học JavaScript",
//   },
//   {
//     id: 3,
//     name: "Khóa học ReactJS",
//   },
//   {
//     id: 4,
//     name: "Khóa học NodeJS",
//   },
// ];

const data = [
  {
    id: 1,
    name: "Khóa học HTML CSS",
  },
  { id: 2, name: "Khóa học JavaScript" },
  {
    id: 3,
    name: "Khóa học ReactJS",
  },
];

// chọn nhiều options
export function CourseCheckboxList() {
  const [courseIds, setcourseIds] = useState([]);
  function handleChange(id) {
    let isChange = courseIds.includes(id);
    if (isChange) {
      setcourseIds((prev) => {
        return prev.filter((courseId) => courseId !== id);
      });
    } else {
      setcourseIds((prev) => {
        return [...prev, id];
      });
    }
  }
  
  function handleSubmit() {
  const name = courseIds
    .map(courseId => data.find(course => course.id === courseId)?.name)
    .join(" & ");

  alert(name);
}
  return (
    <div className="course-list">
      {data.map((course) => {
        return (
          <div key={course.id}>
            <input
              type="checkbox"
              checked={courseIds.includes(course.id)}
              onChange={() => handleChange(course.id)}
            />
            {course.name}
          </div>
        );
      })}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
// chọn 1 trong các options
export function CourseRadioList() {
  const [tick, setTick] = useState()

  function handleCheck(id) {
    setTick(id)
  }

  function handleSubmit() {
    alert(`Bạn đã chọn khoá học có id là ${data.find(course => course.id === tick).name}`)
  }
  return (
    <div className="course-list">
      {data.map((course => {
        return(
          <div key= {course.id}>
            <input  type="radio" checked={tick === course.id} onChange={()=> handleCheck(course.id)}/>
            {course.name}
          </div>
        )
      }))}
    <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
