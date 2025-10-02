    import { useRef, useReducer, useEffect } from "react";

    //1 Khai báo initialState-nên dùng object để khai báo nhiều giá trị state
    const initialState = {
    job: "",
    jobs: [],
    };

    //2.Khai báo action để nếu gõ sai tên action thì sẽ báo lỗi
    const SET_JOB = "set_job";
    const ADD_JOB = "add_job";
    const DELETE_JOB = "delete_job";

    //3. khai báo reducer: hàm reduce nhận vào state hiện tại và action, trả về state mới
    const reducer = (state, action) => {
    console.log(action);
    console.log(`state`, state);

    switch (action.type) {
        case SET_JOB:
        return {
            ...state,
            job: action.payload, //lấy giá trị từ payload của action
        };
        case ADD_JOB:
        return {
            ...state,
            jobs: [...state.jobs, action.payload],
        };
        case DELETE_JOB: {
        const newJobs = [...state.jobs]; // khai báo biến nhớ đưa hết nhóm vô block {}, khai báo newJobs bằng cách copy mảng cũ, không thay đổi trực tiếp state cũ
        newJobs.splice(action.payload, 1); //xóa 1 phần tử tại vị trí index = payload
        return {
            ...state,
            jobs: newJobs,
        };
        }

        default:
        throw new Error("Invalid action");
    }
    };

    //4.dispatch, useReducer

    export default function Content() {
    const inputRef = useRef();
    const [state, dispatch] = useReducer(reducer, initialState, () => {
        const jobsStored = JSON.parse(localStorage.getItem("jobs"));
        return {
        job: "",
        jobs: jobsStored ?? [],
        };
    });
    //useReducer thường nhận vào 2 tham số bắt buộc: reducer và initialState. trả vể 1 mảng gồm state và hàm dispatch
    //tham số thứ 3 của useReducer -init function(tùy chọn): đây là thêm lazy initializer để lấy giá trị từ localStorage khi component mount.
    // chỉ chạy đúng 1 lần khi component mount) hữu ích khi:
    // Dữ liệu khởi tạo phức tạp (VD: tính toán nặng).
    // Lấy dữ liệu ban đầu từ API hoặc localStorage.

    const { job, jobs } = state;

    useEffect(() => {
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }, [jobs]);

    function handleChange(e) {
        dispatch({ type: SET_JOB, payload: e.target.value }); // hàm dispatch nhận vào 1 object action gồm type và payload (dữ liệu bổ sung nếu có) gửi lên reducer
    }

    function handleAdd() {
        if (!job.trim()) return; // chặn todo rỗng
        dispatch({ type: ADD_JOB, payload: job });
        dispatch({ type: SET_JOB, payload: "" });
        inputRef.current.focus();
    }
    function handleDelete(index) {
        dispatch({ type: DELETE_JOB, payload: index });
    }
    return (
        <div>
        <h2>Todo List</h2>

        <input ref={inputRef} type="text" value={job} onChange={handleChange} />

        <button onClick={handleAdd}>Add</button>

        <ul>
            {jobs.map((job, index) => {
            return (
                <li key={index}>
                {job}
                <span
                    onClick={() => handleDelete(index)}
                    style={{ padding: "10px", cursor: "pointer", color: "red" }}
                >
                    &times;
                </span>
                </li>
            );
            })}
        </ul>
        </div>
    );
    }
