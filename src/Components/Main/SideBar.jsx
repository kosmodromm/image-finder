import s from './SideBar.module.scss'
import {useCallback} from "react";
import {BookmarksFill, CollectionFill} from "react-bootstrap-icons";


export default function SideBar({currentTab, onTabChange}) {

    const selectFinder = useCallback(() => onTabChange(0), [onTabChange])

    const selectBookmarks = useCallback(() => onTabChange(1), [onTabChange])

    return (
        <div className={s.sidebar}>
            <div className={s.sidebar_images}>
                <button onClick={selectFinder}>
                    <CollectionFill style={currentTab === 0 ? {color:"goldenrod"} : {color: "black"}}/>
                </button>
            </div>
            <div className={s.sidebar_bookmarks}>
                <button onClick={selectBookmarks}>
                    <BookmarksFill style={currentTab === 1 ? {color:"goldenrod"} : {color: "black"}}/>
                </button>
            </div>
        </div>
    )
}