import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import Todo from './Todo.jsx'
// import Content from './UseEffect.jsx'
// import Content from './UseEffect1.jsx'
// import Content from './UseEffect2.jsx'
// import Content from './Timer.jsx'
// import Content from './Avatar.jsx'
// import Content from './UseRef.jsx'
// import Content from './MemoHOC.jsx'
// import Content from './useCallback.jsx'
// import Content from './UseMemo.jsx'
import Content from './TodoVersion1.jsx'
// import Content from './UseReducer.jsx'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <>
    <Content />
    {/* <Todo/> */}
    </>
  // </StrictMode>,
)
