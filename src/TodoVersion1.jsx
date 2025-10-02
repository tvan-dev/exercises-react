    import { useState, useRef, useEffect } from "react";

    export default function Content() {
    const inputRef = useRef();
    const [value, setValue] = useState("");
    const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) ?? []);

// Khởi tạo useState bằng lazy initializer. Thay vì truyền giá trị trực tiếp, bạn truyền vào một hàm.
// Hàm này chỉ chạy một lần duy nhất khi component được mount, không chạy lại mỗi lần re-render.
//cũng có thể dùng useEffect để parse localStorage khi component mount
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    },[todos])

    function handleSubmit() {
        if (!value.trim()) return;
        setTodos([...todos, value]);
        setValue("");
        inputRef.current.focus();
    }

    function handleDelete(index) {
        setTodos(todos.filter((todo, i) => i !== index)); //sẽ giữ lại tất cả phần tử có vị trí khác với index.
    }

    return (
        <div>
            <h2>Todo list</h2>

            <input
                type="text"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button type="button" onClick={handleSubmit}>Add</button>

            {todos.map((todo, index) => {
                return (
                <li key={index}>
                    {todo}
                    <span
                    onClick={() => handleDelete(index)}
                    style={{ padding: "10px", color: "red" }}
                    >
                    &times;
                    </span>
                </li>
                );
            })}
        </div>
    );
    }
