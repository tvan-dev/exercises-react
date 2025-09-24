import {useState, useEffect} from "react"

export default function Content() { //Mount của Content: ngay lượt render đầu tiên (khi app start).
    const [isToggle, setIsToggle] = useState(false);
    console.log(0);
    function handleToggle() {
        setIsToggle((prev) => !prev);
        // setIsToggle(!isToggle); ✨ setIsToggle((prev) => !prev) đảm bảo không bị lệ thuộc giá trị cũ.
        console.log(1);
    }

    return (
        <div>
            <button onClick = {handleToggle}>Toggle</button>
            {isToggle && <Input />}
            {console.log(2)}
        </div>
    )
}

//Mount của Input: chỉ xảy ra khi bạn click Toggle để isToggle chuyển sang true.
// Thời điểm đó, Input() được gọi lần đầu tiên và DOM <input> được gắn vào thật → chính là lúc mount của Input.
function Input () { 
    const [value, setValue] = useState("") //useState đang cục bộ trong Input. có thể đưa lên Cha sau đó truyền qua props.
    const [users, setUsers] =useState([])
    console.log(4);

    useEffect(() => { //nếu không truyền deps là [], thì mỗi lần re-render sẽ gọi useEffect => setUsers => re-render => gọi useEffect => lặp vô hạn.
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
            setUsers(data)
            console.log(4.1);
        })
        console.log(4.4);
    }, []) 
    //[]: chỉ gọi useEffect 1 lần sau lần render đầu tiên (mount), 
    //           nhưng nếu trong phân thân useEffect có logic liên quan đến state, props thì nó sẽ không được cập nhật khi state, props thay đổi
    //           vì useEffect không được gọi lại. => dùng deps tương ứng.

    function handleChange(e) {
        console.log(5);
        setValue(e.target.value)
        
    }

    return (
        <>
        <input type="text" value={value} onChange={handleChange} />
        {console.log(6)}
        {users.map(user =>{
            return <li key={user.id}>{user.name}</li>
        }) }
        </>
        
    )
}

// 🔹 Nguyên tắc re-render trong React

// Một component chỉ re-render khi:

// State trong chính component đó thay đổi (setState).

// Props truyền từ cha vào thay đổi.