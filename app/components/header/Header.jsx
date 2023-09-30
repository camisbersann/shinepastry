import Image from "next/image";
import styles from "./header.module.css";
import NavLink from "../navLink/NavLink";


export const Header = () => {
    return(
        <div className={styles.header}>
            <Image src="/pastrylogo.jpeg" alt= "Logo" width={96} height={96}></Image>

            <div className={styles.links}>
                <NavLink route="/" text="Início"></NavLink>
            </div>
        </div>
    );
}