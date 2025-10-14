import { Routes, Route, Link, Outlet } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Hotel from "./pages/Hotel.jsx";
import Tour from "./pages/Tour.jsx";

// Nested Routes
function App() {
    return (
        <>
        <nav style={{display:"flex", gap: "100px", marginBottom: "100px"}}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </nav>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* nested routing */}
            <Route path="/contact" element={<Contact />}>
                <Route path="hotel" element={<Hotel/>} />
                <Route path="tour" element={<Tour />} />
            </Route>
        </Routes>
        </>
    );
}

export default App;

// React Router sử dụng ba thành phần chính cho việc định tuyến cơ bản:

// Link: Tạo các liên kết điều hướng, giúp cập nhật URL mà không cần tải lại trang (thay thế thẻ <a></a>)

// Routes: Là bao chứa (container) cho toàn bộ các định nghĩa route trong ứng dụng. 
// Khi URL trên trình duyệt khớp với path của một Route nào đó, React Router sẽ render component tương ứng trong element.

// Route: Định nghĩa mối quan hệ giữa đường dẫn URL và component sẽ được hiển thị tương ứng.
// Thuộc tính element nhận vào một JSX element (ví dụ <Home />)

//NESTED ROUTES
// Định nghĩa các route con bên trong route cha.

// Khi bạn điều hướng đến các route con, layout cha không bị thay đổi, chỉ phần Outlet thay đổi.

// Đây là kỹ thuật rất mạnh để tạo giao diện có layout cố định, như sidebar/header không đổi, còn nội dung chính thay đổi theo route.
