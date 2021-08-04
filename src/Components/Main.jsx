import s from './Main.module.scss';
import SideBar from "./Main/SideBar";
import Finder from "./Main/Finder";
import Bookmarks from "./Main/Bookmarks";
import {useCallback, useMemo, useRef, useState} from "react";

const API_KEY = '5f1b3971fa93cb35ebe2d6c0769db9ca';
const API_ROOT = 'https://api.flickr.com/services/rest/';
const METHOD = 'flickr.photos.search';
const PER_PAGE = '10';
const FORMAT = 'json';
const NO_JSON_CALLBACK = '1';

export default function Main() {

    const [currentTab, setCurrentTab] = useState(0);
    const [page, setPage] = useState(1);
    const [awaitingResponse, setAwaitingResponse] = useState(0);
    const [imagesData, setImagesData] = useState(null);
    const [text, setText] = useState('');
    const [bookmark, setBookmark] = useState([]);

    const makeApiRequest = useCallback((url, params) => {
        setAwaitingResponse(r => r + 1);

        const query = new URLSearchParams(params);
        return fetch(`${url}?${query}`)
            .then(response => response.json())
            .finally(() => setAwaitingResponse(r => r - 1));
    }, []);

    const loadImages = useCallback((text) => {
        if (!text) {
            return;
        }

        makeApiRequest(`${API_ROOT}`, {
            method: METHOD,
            api_key: API_KEY,
            text,
            per_page: PER_PAGE,
            page,
            format: FORMAT,
            nojsoncallback: NO_JSON_CALLBACK
        })
            .then(data => {
                setImagesData(data.photos.photo);
            });
    }, [page, makeApiRequest])

    let timer = useRef(null);
    const onTextChange = useCallback((value) => {
        setText(value);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            loadImages(value);
        }, 1100);
    }, [loadImages, timer])

    const cardClick = useCallback((imgId) => {
        let updatedBookmark = Object.assign([], bookmark);
        updatedBookmark.indexOf(imgId) >= 0 ? updatedBookmark.splice(updatedBookmark.indexOf(imgId), 1) : updatedBookmark = [...updatedBookmark, imgId];
        setBookmark(updatedBookmark);
    }, [bookmark]);

    const pageContent = useMemo(() => {
        if (!currentTab) {
            return <Finder awaitingResponse={awaitingResponse} imagesData={imagesData} text={text} onTextChange={onTextChange} cardClick={cardClick} bookmark={bookmark}/>;
        } else {
            return <Bookmarks />;
        }
    }, [currentTab, awaitingResponse, imagesData, text, onTextChange, cardClick, bookmark]);

    console.log(bookmark);
    return (
        <div className={s.main}>
            <SideBar onTabChange={setCurrentTab}/>
            {pageContent}
        </div>
    )
}