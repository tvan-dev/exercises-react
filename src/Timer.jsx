    import { useState, useEffect } from "react";

    export default function Content() {
    const [isToggle, setIsToggle] = useState(false);

    return (
        <div>
        <button onClick={() => setIsToggle((prev) => !prev)}>Toggle</button>
        {isToggle && <CountDown60 /> }
        {isToggle && <CountDown30 /> }
        </div>
    );
    }

    //cách 1 with setInterval
    function CountDown60() {
    const [countdown, setCountDown] = useState(60);
    
    useEffect(() => {
        const timerID = setInterval(() => {
        setCountDown((pre) => (pre > 0 ? pre - 1 : 0));
        }, 1000);

        return () => {
        clearInterval(timerID);
        };
    }, []); // useEffect vs deps là [ ] thì sẽ chạy một lần khi component mount lần đáu tiên => setInterval có chạy nhiều lần đi nữa thì state: Countdown vẫn luôn 60,
            // suy ra phải dùng setCountDown(callback) để tránh phụ thuộc trực tiếp ở giá trị ngoài theo cách truyền setCountDown(countdown -1 )

    return <button>{countdown}</button>;
    }

    //Cách 2 with setTimeout
    function CountDown30() {
    const [countdown, setCountDown] = useState(30);
    useEffect(() => {
        const timerID = setTimeout(() => setCountDown(countdown> 0 ? countdown -1 : 0 ), 1000);

        return () => {
        clearTimeout(timerID);
        };
    }, [countdown]); //setTimeout cũng chỉ chạy một lần => setCount => count change => useEffect chạy lại ..v..v

    return <button>{countdown}</button>;
    }












    //KHi muốn mount lại sau khi unmount thì đồng nghĩa component được mount lại mới hoàn toàn, đó là lí dó tách ra 2 component ở trên,

    // Nếu để chung thì bị lỗi là khi mount button hiển thị giây lại thì component content ko có mount lại => state không cập nhật lại 60s

    //useState(60) chỉ chạy một lần duy nhất khi component mount.

    // Khi bạn unmount component rồi mount lại, React không reset state mặc định về 60 (nếu component vẫn còn trong cây nhưng chỉ toggle hiển thị nội dung).

    // Ở đây isToggle chỉ điều khiển việc render <button>{countdown}</button>, chứ không hề unmount component CountDown. Vì vậy state countdown vẫn giữ nguyên giá trị hiện tại và tiếp tục đếm tiếp.
