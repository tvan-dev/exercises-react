    import { useRef, useEffect, useState } from "react";

    export default function Content() {
    return (
        <>
        <h2>**Ex 1: Does Not Cause Re-renders</h2>
        <p>- It can be used to store a mutable value that does not cause a re-render when updated.</p>
        <Application1 />
        <h2>Ex2: Keeping track of previous state values.</h2>
        <Application2 />
        <h2>Ex3: Store timerID returned from setInterval / setTimeout.</h2>
        <Application3 />
        <h2>Ex4: Accessing DOM Elements</h2>
        <Application4 />
        </>
    );
    }
    function Application1() {
    const [count, setCount] = useState(0);

    // const [ref, setRef] = useState(0) // nếu không dùng useRef thì mỗi lần setRef sẽ làm component re-render. gây việc render nhiều lần mà không cần thiết
    // useEffect(() => {
    //     setRef(count)
    // },[count])

    const ref = useRef(0);
    useEffect(() => {
        ref.current += 1; //mỗi lần component re-render thì ref.current sẽ tăng lên 1 // nhớ tắt strict mode (render 2 lần )
    });

    const handleClick = () => {
        setCount(count + 1);
    };
    return (
        <div>
        <button onClick={handleClick}>Click</button>
        <button>{count}</button>

        <div>Số lần re-render {ref.current}</div>
        </div>
    );
    }

    // + useState:

    // Khi gọi setState, component bắt buộc re-render để cập nhật UI.

    // Mỗi lần re-render đều đi lại toàn bộ function component.

    // + useRef:

    // Thay đổi ref.current không gây re-render.

    // Dữ liệu vẫn được giữ nguyên sau mỗi lần re-render, nhưng React không vẽ lại UI trừ khi bạn có chỗ nào đang đọc giá trị đó trong JSX.

    // Bởi vì UI vốn đã render lại do state count thay đổi.

    // Trong quá trình render đó, bạn in ra ref.current → giá trị mới được hiển thị.

    // Nếu component không có state nào thay đổi → nó sẽ không re-render → ref.current có thay đổi cũng không thấy gì trên UI.

    function Application2() {
    const [inputValue, setInputValue] = useState("");
    const prevValue = useRef(null);
    useEffect(() => {
        prevValue.current = inputValue;
    });

    function handleChange(e) {
        setInputValue(e.target.value);
    }
    return (
        <div>
        <input type="text" value={inputValue} onChange={handleChange} />
        <p>Previous input value: {prevValue.current }</p>
        </div>
    );
    }
    function Application3() {
    const [time, setTime] = useState(0);
    const timerId = useRef();

    function handleStart() {
        if(!timerId.current) { // if tránh việc bấm nhiều lần nút start sẽ tạo nhiều timer
            timerId.current = setInterval(() => {
            setTime((prev) => prev + 1)
        }, 1000); //ok tránh lỗi closure khi dùng trực tiếp time.
        }

    }

    function handleStop() {
        clearInterval(timerId.current);
        timerId.current = null // reset về null để có thể start lại theo if ở trên
    }
    useEffect(()=> {
        return () => clearInterval (timerId.current) //cleanup function để tránh việc quên không bấm stop mà component unmount thì timer vẫn chạy ngầm(ở đây thì không có unmount nên không thấy tác dụng)
    },[])

    return (
        <div>
        <button>{time}</button>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        </div>
    );
    }

    // useRef = một ngăn tủ để cất giá trị bất kỳ, tồn tại xuyên suốt component, không làm UI render lại.

    // Trường hợp giá trị trước đó là cất lại state cũ.

    // Trường hợp timer ID là cất lại giá trị trả về từ setInterval / setTimeout.

    function Application4() {
    const [state, setState] = useState("");
    const h3Ref = useRef();
    const inputRef1 = useRef();
    const inputRef2 = useRef();

    useEffect(() => {
        //thao tác style hoặc className đặc biêt ( bình thường vẫn ƯU TIÊn state + className)
        //Ref + style: khi cần thao tác đặc biệt với DOM mà React khó handle (đo kích thước, animation manual, tích hợp thư viện ngoài).
        h3Ref.current.style.color = "red";

        //đo kích thước, vị trí của thẻ
        const rect = h3Ref.current.getBoundingClientRect();
        console.log(rect); // clg ra một DOMRect chứa các thông tin về kích thước và vị trí của thẻ

        //Scroll control
        h3Ref.current.scrollIntoView({ behavior: "smooth" }); //scroll đến thẻ h1

        // thao tác với thẻ input
        console.log(inputRef1.current.value); //lấy value hiện tại trong DOM

        //focus vào input // blur input
        inputRef1.current.focus();
    }, []);

    return (
        <div>
        <h3 ref={h3Ref}>Hello</h3>
        <h3>Nice to meet u </h3>
        <input
            type="text"
            ref={inputRef1}
            value={state}
            onChange={(e) => setState(e.target.value)}
        />
        <input
            type="text"
            ref={inputRef2}
            value={state}
            onChange={(e) => setState(e.target.value)}
        />
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            molestias voluptates at tenetur quos doloribus ducimus repellendus quis
            nisi quam dolore impedit, rem officiis corporis numquam laborum
            aspernatur incidunt distinctio voluptatem officia? Eius, minus. Mollitia
            quisquam, sit, cum officiis quis fuga at autem ex soluta excepturi
            necessitatibus expedita tempore, enim distinctio! Assumenda amet vel cum
            maxime. Nulla ipsa, soluta saepe architecto eaque consequatur delectus
            accusamus corporis laboriosam excepturi in? Repudiandae hic eos porro.
            Veritatis impedit quam consectetur explicabo sit sequi dolorem
            recusandae quisquam similique, nisi quasi, illo perferendis? Dicta
            architecto placeat illum maxime nemo, ipsa expedita qui perspiciatis
            esse doloribus recusandae? Asperiores recusandae ipsa porro. Quam ut
            neque quis beatae quo explicabo cum corrupti eaque mollitia error! Quos
            harum eaque doloribus vitae quo sunt quas nisi, officiis temporibus
            maxime officia vero eveniet nesciunt culpa ab atque hic voluptas iure
            possimus blanditiis. Non autem alias veritatis, quia laborum itaque
            eveniet iste. Qui pariatur, ducimus mollitia earum nam deserunt iste
            fugit exercitationem id consequuntur accusamus rem ut repellendus
            accusantium labore sapiente iusto quaerat culpa, assumenda nemo atque
            perspiciatis! Ratione aliquam molestias cupiditate et repellat ab hic
            veritatis ipsam. Aliquid quam fuga corporis recusandae fugit ducimus
            voluptate saepe deserunt? Ad, optio adipisci. Quidem tempore ea
            reiciendis officia earum doloribus repudiandae magnam deserunt
            explicabo. Consectetur quod facilis cupiditate dolores autem suscipit
            quaerat. Voluptatibus fugit recusandae mollitia? Labore quo cumque
            explicabo amet asperiores? Dicta expedita molestias eveniet aspernatur
            rerum. Dolore, voluptas obcaecati nisi porro a, quasi asperiores, illum
            animi delectus explicabo consectetur dolorum necessitatibus. Id at enim
            ad ipsa vitae nulla rem provident eligendi unde quidem qui non vero
            ducimus nostrum suscipit quaerat est porro, a mollitia. Eligendi aut
            aliquam obcaecati suscipit molestias rem officiis ex. Dolor, ipsum
            dolore numquam iusto, provident dolores, soluta non minima expedita rem
            modi qui vero eius nostrum quia impedit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Soluta molestias voluptates at tenetur
            quos doloribus ducimus repellendus quis nisi quam dolore impedit, rem
            officiis corporis numquam laborum aspernatur incidunt distinctio
            voluptatem officia? Eius, minus. Mollitia quisquam, sit, cum officiis
            quis fuga at autem ex soluta excepturi necessitatibus expedita tempore,
            enim distinctio! Assumenda amet vel cum maxime. Nulla ipsa, soluta saepe
            architecto eaque consequatur delectus accusamus corporis laboriosam
            excepturi in? Repudiandae hic eos porro. Veritatis impedit quam
            consectetur explicabo sit sequi dolorem recusandae quisquam similique,
            nisi quasi, illo perferendis? Dicta architecto placeat illum maxime
            nemo, ipsa expedita qui perspiciatis esse doloribus recusandae?
            Asperiores recusandae ipsa porro. Quam ut neque quis beatae quo
            explicabo cum corrupti eaque mollitia error! Quos harum eaque doloribus
            vitae quo sunt quas nisi, officiis temporibus maxime officia vero
            eveniet nesciunt culpa ab atque hic voluptas iure possimus blanditiis.
            Non autem alias veritatis, quia laborum itaque eveniet iste. Qui
            pariatur, ducimus mollitia earum nam deserunt iste fugit exercitationem
            id consequuntur accusamus rem ut repellendus accusantium labore sapiente
            iusto quaerat culpa, assumenda nemo atque perspiciatis! Ratione aliquam
            molestias cupiditate et repellat ab hic veritatis ipsam. Aliquid quam
            fuga corporis recusandae fugit ducimus voluptate saepe deserunt? Ad,
            optio adipisci. Quidem tempore ea reiciendis officia earum doloribus
            repudiandae magnam deserunt explicabo. Consectetur quod facilis
            cupiditate dolores autem suscipit quaerat. Voluptatibus fugit recusandae
            mollitia? Labore quo cumque explicabo amet asperiores? Dicta expedita
            molestias eveniet aspernatur rerum. Dolore, voluptas obcaecati nisi
            porro a, quasi asperiores, illum animi delectus explicabo consectetur
            dolorum necessitatibus. Id at enim ad ipsa vitae nulla rem provident
            eligendi unde quidem qui non vero ducimus nostrum suscipit quaerat est
            porro, a mollitia. Eligendi aut aliquam obcaecati suscipit molestias rem
            officiis ex. Dolor, ipsum dolore numquam iusto, provident dolores,
            soluta non minima expedita rem modi qui vero eius nostrum quia impedit.
        </p>
        </div>
    );
    }

    // Việc dùng ref.current trong useEffect hay trong event handler phụ thuộc vào thời điểm bạn cần giá trị DOM hoặc giá trị lưu trong ref.

    // 1. Dùng ref.current trong useEffect 👉 Dùng useEffect vì React đảm bảo DOM đã sẵn sàng.

    // Khi bạn cần thao tác với DOM ngay sau khi React đã render UI xong.

    // Ví dụ:

    // Focus vào input khi component mount.

    // Đo kích thước DOM (getBoundingClientRect).

    // Gán event listener ngoài React (scroll, resize).

    // 2. Dùng ref.current trong event handler 👉 Dùng trong handler vì sự kiện có thể xảy ra bất kỳ lúc nào sau render.

    // Khi bạn muốn lấy giá trị tại thời điểm người dùng thực hiện hành động.

    // Ví dụ:

    // Lấy inputRef.current.value khi user nhấn nút.

    // Dừng timer khi user click "Stop".
