import { Link, Outlet } from "react-router-dom"
export default function Contact() {
    return (
        <div>
            <div>CONTACT PAGE</div>
            <nav style={{display:"flex", gap: "100px"}}>
                <Link to="hotel">Hotel</Link>
                <Link to="tour">Tour</Link>
            </nav>

             {/* Đây là nơi nested route sẽ được render */}
            <Outlet/>
        </div>
    )
}

//Phần tử-element <Outlet /> trong component Contact(cha) chỉ định vị trí hiển thị nội dung của tuyến con (hotel component, tour component)