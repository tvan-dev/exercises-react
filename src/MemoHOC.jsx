import { useState, memo } from "react";    

/* Child1: truyền props là một trong các kiểu giá trị nguyên thủy - boolean */

const Child1 = memo((props) => {
    console.log("Child rendered");
    return <div style={props.active? {backgroundColor: "green"}: {}}>HELLO BIBILI</div>;
})



export default function Content() {
    const [value, setValue] = useState("");
    const [isToggle, setIsToggle] = useState(false);

    return(
        <div>
            <input type="text" value={value} onChange={(e)=> setValue(e.target.value)} />

            <div>
                <button onClick={() => setIsToggle(prev => !prev)}>Click To Change Color</button>
                <Child1 active={isToggle}/> 
            </div>
        </div>
    )
}

//Explain: 
/* + Không dùng React memo cho Component con thì bất cứ lần re-render của Cha => Con re-render nếu logic ở component con phức tạp thì sẽ ảnh hưởng hiệu năng ứng dụng */
/* + Dùng memo thì component con chỉ re-render khi props thay đổi 
    Dùng memo cho component không nhận props thì hầu như không khác biệt so với component bình thường.
    Chỉ hữu ích khi bạn muốn đảm bảo rõ ràng là component đó sẽ không bao giờ re-render theo parent (trừ khi mount/unmount).*/

// Ở ví dụ trên, mỗi lần gõ chữ vào input thì component cha re-render nhưng component con ko re-render vì ko có props nào thay đổi
// nếu bấm nút Click thì component con re-render vì props active thay đổi

// + React memo chỉ so sánh props ở cấp độ bề mặt (shallow comparison) nên nếu truyền object, array, function thì sẽ luôn re-render vì tham chiếu thay đổi
// để khắc phục vấn đề này có thể dùng useMemo để ghi nhớ giá trị object, array hoặc useCallback để ghi nhớ hàm

