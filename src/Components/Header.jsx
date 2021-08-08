import s from './Header.module.scss';
import {PersonCircle} from "react-bootstrap-icons";

export default function Header() {
return (
    <div className={s.header}>
        <div className={s.header_title}>Image Finder</div>
        <div className={s.header_login}>
            <h2>
                <PersonCircle />
            </h2>
            <p>LOGIN</p>
        </div>
    </div>
)
}