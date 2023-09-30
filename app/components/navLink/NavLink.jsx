const { default: Link } = require("next/link");
import styles from "./navlink.module.css";

const NavLink = ({route, text}) => {
    return (
        <div >
            <Link href={route} className={styles.nav}>{text}</Link>
        </div>
    );
}
export default NavLink;