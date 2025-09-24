import { useState, useEffect } from "react";

export default function Content() {
    const [isToggle, setIsToggle] = useState(false);
    return (
        <div>
            <button onClick= {() => setIsToggle(prev => !prev)}>Toggle</button>
            {isToggle && <Body />}
        </div>
    )
}

const tabNames = ["photos", "comments", "albums"]
function Body() {
    const [value, setValue] = useState("");
    const [tab, setTab] = useState("photos");
    const [list, setList] = useState([])
    
    useEffect(() => {
        document.title = value // side effect: thay đổi title của trang web
    },[value])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${tab}`)  // side effect: gọi API
        .then(res => res.json())
        .then(data => {
            setList(data)
        })
    }, [tab])
    return (
        <>
        <input type="text" value={value}  onChange= {e => setValue(e.target.value)}/>

        {tabNames.map(tabName => <button key={tabName} style={tab === tabName ? {backgroundColor:"#13d330ff"} : {}} onClick={() => setTab(tabName)}>{tabName}</button>)}

        <ul>
            {list.map(item => <li key={item.id}>{item.name || item.title}</li>)}
        </ul>
        </>
    )
}