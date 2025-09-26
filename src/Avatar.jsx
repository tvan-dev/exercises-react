    import { useState, useEffect } from "react";

    export default function Content() {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        console.log(2.1);
        return () => {
        if (avatar?.preview) {
            URL.revokeObjectURL(avatar.preview);
        }
        };
    }, [avatar]);

    function handleChangeAvt(e) {
        const file = e.target.files[0];
        if (!file) return;

        const urlPreview = URL.createObjectURL(file); 
        setAvatar({ file, urlPreview }); //@@@
        // e.target.value =null // fix lỗi chọn 2 bức ảnh giống nhau 
    }
    
    return (
        <div>
        {avatar && (
            <img
            src={avatar.urlPreview}
            alt=""
            style={{ width: "300px", height: "300px" }}
            />
        )}
        <input type="file" onChange={handleChangeAvt} />
        </div>
        //đối với input có  type="file" thì sẽ có mục e.target.files = một mảng FileList chứa các File object
        //Nếu input cho phép chọn nhiều file (multiple), thì files sẽ chứa nhiều phần tử. Nếu không, nó chỉ có 1 hoặc rỗng.
        //<input type="file" multiple onChange={handleChange} />
    );
    }
    //Note:
    
    //@@@ avatar được set sẽ có dạng :
    //  avatar = {
    //   file: File,          // chính là file object người dùng chọn (có đủ name, size, type, lastModified...)
    //   preview: "blob:..."  // URL tạm để hiển thị ảnh (tạo từ URL.createObjectURL)
    // }

    
    //URL.createObjectURL() là một API trong JavaScript dùng để tạo ra một URL tạm (dạng blob:) trỏ tới một File hoặc Blob mà bạn có trong bộ nhớ (RAM).
    //  Mỗi lần bạn gọi URL.createObjectURL(file) → trình duyệt sẽ giữ một tham chiếu đến dữ liệu của file trong bộ nhớ.
    // Nếu không gọi URL.revokeObjectURL(), các blob URL này sẽ không tự giải phóng → gây memory leak (rò rỉ bộ nhớ) nếu người dùng upload nhiều file liên tục.


    // -- About CleanUp Function --

    // useEffect(()=> {
    //logic calback
    //return Cleanup Fn
    //     }, [deps])

    // 1. Ở lần component mount đầu tiên vào DOM, thì useEffect cũng chạy lần đầu tiên, thì logic callback chạy , nhưng cleanUp fn sẽ không chạy

    // 2. Nếu deps thay đổi => useEffect sẽ chạy lại, nhưng lúc này, Cleanup sẽ chạy trước và logic callback chạy sau

    // - React sẽ gọi cleanup function của lần useEffect trước.

    // - Điều này giúp dọn dẹp những tài nguyên cũ (ví dụ: clear setInterval, remove event listener, revoke URL…) trước khi tạo cái mới, tránh rò rỉ bộ nhớ hoặc chạy chồng chéo.

    // 3. Cleanup function được gọi trước khi component unmount

    //  - KHi component bị gỡ bỏ khỏi DOM (unmount), cleanup sẽ chạy một lần cuối.

    // - Điều này cực kỳ quan trọng để giải phóng tài nguyên:

    // + Clear timer (setTimeout, setInterval)

    // + Hủy subscription (WebSocket, Firebase, v.v.)

    // + Remove event listener (window.addEventListener)

    // + Revoke ObjectURL khi preview file ảnh
