    import { useState, memo, useCallback } from "react";

    /* Child2: truyền props là một trong các kiểu giá trị tham chiếu - hàm - useCallback() */

    const Child2 = memo((props) => {
    console.log("Child2 rendered");
    return <button onClick={props.onIncrease}>Increase</button>;
    });

    export default function Content() {
    const [value, setValue] = useState("");
    const [count, setCount] = useState(0);

    // const handleIncrease = () => {
    //     setCount(prev => prev + 1)
    // }
    /*Không dùng useCallback
    Mỗi lần component cha re-render thì hàm handleIncrease được tạo lại. => một tham chiếu mới.
    Tham chiếu mới này khác với tham chiếu cũ → memo ở Child2 coi như props đổi → Child2 re-render.
    Dù việc re-render này không liên quan (ví dụ ở đây là chỉ nhập input thôi), Child2 vẫn render lại. ✅*/

    // để khắc phục vấn đề này có thể dùng useCallback để ghi nhớ hàm

    const handleIncrease = useCallback(() => {
        setCount(prev=> prev + 1);
    }, []);

    //chỉ tạo hàm một lần khi component được mount
    //Truyền [] → callback cố định suốt vòng đời component. setCount(prev => prev + 1) ✅ ổn định callback
    // Truyền [deps] → Hàm chỉ được tạo lại /callback chỉ thay đổi khi deps thay đổi. setCount(count + 1)

    return (
        <div>
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        <p>{count}</p>
        <Child2 onIncrease={handleIncrease} />
        </div>
    );
    }
