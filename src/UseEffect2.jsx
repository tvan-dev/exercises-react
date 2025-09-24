    // useEffect with DOM events/ Cleanup fn
    import { useEffect, useState } from "react";

    export default function Content() {
    const [isToggle, setIsToggle] = useState(false);

    return (
        <div>
        <button onClick={() => setIsToggle((prev) => !prev)}>Toggle</button>
        {isToggle && <ListComment />}
        </div>
    );
    }

    function ListComment() {
    const [users, setUsers] = useState([]);
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums`)
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY >= 400) {
            setShowGoToTop(true);
        } else {
            setShowGoToTop(false);
        }
        // setShowGoToTop(window.scrollY >= 10); //có thể viết như vậy cũng ok, vì toán tử >= trả về true/false luôn
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll); //Cleanup fn
    }, []);

    // Nếu không truyền deps [] . thì mỗi lần render lại, React sẽ thêm 1 listener mới cho sự kiện scroll → dẫn đến nhiều listener bị gắn chồng chéo, memory leak
    // Với effect gắn event listener, nên có [] làm dependency array để chỉ chạy một lần khi mount. ✅
    //Đồng thời nên có cleanup (return () => { ... }) để gỡ listener khi unmount. ✅

    return (
        <div>
        {users.map((user) => (
            <p key={user.id}>{user.title}</p>
        ))}

        {showGoToTop && (
            <button
            style={{ position: "fixed", bottom: "100px", right: "100px" }}
            onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
            >
            Go To Top{" "}
            </button>
        )}
        </div>
    );
    }
