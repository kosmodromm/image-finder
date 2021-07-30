import s from './SideBar.module.scss'
import {NavLink} from "react-router-dom";

export default function SideBar() {
return (
    <div className={s.sidebar}>
        <div className={s.sidebar_images}>
            <NavLink to='/finder' >
                Images
            </NavLink>
        </div>
        <div className={s.sidebar_bookmarks}>
            <NavLink to='/bookmarks' >
                Bookmarks
            </NavLink>
        </div>
    </div>
)
}