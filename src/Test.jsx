    import clsx from "clsx";

    //import styles obj từ .module.css
    import styles from "./Test.module.css";

    //import css global scope
    import "./Overall.css";


    function Test(props) {
    return (
        <div>
            <h1>Testing.....</h1>
            <h2 className={styles.block}>Sử dụng một class thông thường</h2>
            <h2 className="myHeader">This is global classes</h2>

            <p className={`myHeader ${styles.secondary} ${styles.primary} text`}>
                Combine global css in module/ và file css thông thường, kết hợp với
                nhiều class
            </p>

            <p
                className={clsx(
                styles.secondary,
                styles.primary,
                "text",
                props.isActive && "myHeader"
                )}
            >
                Dùng clsx để thay thế cho trường hợp trên, kết hợp điều kiện
            </p>

            <h3 className={`${styles["composing-class"]}`}>khi class được viết theo kebap-case</h3>
            <h3 className={clsx(styles["composing-class"])}>use clsx : khi class được viết theo kebap-case</h3>
            
        </div>
    );
    }
    export default Test;

    //text: class in  Overall.css
    //myHeader: global class in Test.module.css
    //block, secondary, primary, myButton, composing-class in Test.module.css

    // in short about clsx 
//     className={clsx(
//   styles.base,
//   isActive && styles.active,
//   ['extra', condition && styles.conditional],
//   { [styles.special]: isSpecial }
// )}