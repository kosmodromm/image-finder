import s from './SideBar.module.scss'
import {useCallback} from "react";
import {BookmarksFill, CollectionFill} from "react-bootstrap-icons";


export default function SideBar({onTabChange}) {

    const selectFinder = useCallback(() => onTabChange(0), [onTabChange])

    const selectBookmarks = useCallback(() => onTabChange(1), [onTabChange])

    return (
        <div className={s.sidebar}>
            <div className={s.sidebar_images}>
                <button onClick={selectFinder}>
                    <CollectionFill />
                </button>
            </div>
            <div className={s.sidebar_bookmarks}>
                <button onClick={selectBookmarks}>
                    <BookmarksFill />
                </button>
            </div>
        </div>
    )
}