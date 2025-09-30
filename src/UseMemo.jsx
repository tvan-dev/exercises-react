// useCallback: dùng khi props bạn truyền xuống là một function.
// Ví dụ: onIncrease, onLogin, filterProducts (hàm).
// → Dùng để giữ tham chiếu hàm ổn định.

// useMemo: dùng khi props bạn truyền xuống là một object, array, hoặc giá trị tính toán phức tạp.
// Ví dụ: themeStyles, userProfile, cartSummary (object/array).
// → Dùng để giữ tham chiếu object/array ổn định và tránh tính toán lại nặng nề.

import {useState, useMemo} from 'react'

//Ví dụ về useMemo: tính tổng giá sản phẩm trong giỏ hàng, tuy không truyền props nhưng vẫn dùng useMemo để tránh tính toán lại hàm tính tổng giá khi không cần thiết
//Khi nhập tên sản phẩm, giá trị name thay đổi, component re-render, hàm tính tổng giá calculateTotal được gọi lại dù mảng products không thay đổi
//Dùng useMemo để hàm calculateTotal chỉ được gọi lại khi mảng products thay đổi

export default function Content() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [products, setProducts] = useState([])

    function handleAddProducts() {
        setProducts([...products, {
            name,
            price: +price //giá trị input là string, chuyển về number bằng +price
        }])
    }

     //Không dùng useMemo
    // calculateTotal ở đây là một hàm, muốn lấy giá trị thì phải gọi hàm:

    // const calculateTotal = () => {
    //     console.log(`ham tinh toan lai`);
    //     return products.reduce((total, product) => {
    //         return total + product.price
    //     },0)
    // }

    //Dùng useMemo 
    //calculateTotal không còn là hàm nữa, mà là giá trị được memoized (một con số - tổng giá)

    const calculateTotal = useMemo(() => {
        console.log(`ham tinh toan lai`);
        return products.reduce((total, product) => {
            return total + product.price
        },0)
    }, [products])//Chỉ tính toán lại khi products thay đổi
    return (
        <div>
            <input type="text"  placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="number"  placeholder="Giá" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <button onClick={handleAddProducts}>Add</button>
            <h2> Tổng giá {calculateTotal} </h2> 
            <ul>
                {products.map((product,index)=> {
                    return <li key={index}>{product.name} - {product.price}</li>
                })}
            </ul>
            
        </div>
    )
}