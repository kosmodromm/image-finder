import s from './Main.module.scss';
import SideBar from "./Main/SideBar";
import Finder from "./Main/Finder";
import Bookmarks from "./Main/Bookmarks";
import {useCallback, useMemo, useRef, useState} from "react";

const API_KEY = '5f1b3971fa93cb35ebe2d6c0769db9ca';
const API_ROOT = 'https://api.flickr.com/services/rest/';
const METHOD = 'flickr.photos.search';
const PER_PAGE = '32';
const FORMAT = 'json';
const NO_JSON_CALLBACK = '1';

export default function Main() {

    const [currentTab, setCurrentTab] = useState(0);
    const [page, setPage] = useState(0);
    const [awaitingResponse, setAwaitingResponse] = useState(0);
    const [imagesData, setImagesData] = useState(null);
    const [text, setText] = useState('');
    const [bookmark, setBookmark] = useState([]);
    const [onStart, setOnStart] = useState(true);
    const [error, setError] = useState(null)

    const makeApiRequest = useCallback((url, params) => {
        const query = new URLSearchParams(params);

        return fetch(`${url}?${query}`)
            .then(response => {
                if (!response.ok) {
                    throw Error(`status: ${response.status}`)
                }
            })
    }, []);

    const loadImages = useCallback((text, page) => {
        setPage(page);
        setOnStart(false);

        if (!text) {
            return;
        }

        try {
            setAwaitingResponse(r => r + 1);
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
                    setImagesData(data);
                })
                .catch((e) => setError(e))
                .finally(() => setAwaitingResponse(r => r - 1));
        } catch (e) {
            setError(e);
        }
    }, [makeApiRequest])

    let timer = useRef(null);
    const onTextChange = useCallback((value) => {
        setText(value);
        setPage(0);

        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            loadImages(value);
        }, 800);
    }, [loadImages, timer])

    const cardClick = useCallback((imgId, imgTitle, imgUrl) => {
        let newBookmark = {id: imgId, title: imgTitle, url: imgUrl}
        let updatedBookmark = [...bookmark];

        let bookmarkIdx = updatedBookmark.findIndex(elem => elem.id === imgId);

        bookmarkIdx >= 0 ? updatedBookmark.splice(bookmarkIdx, 1) : updatedBookmark = [...updatedBookmark, newBookmark];
        setBookmark(updatedBookmark);
    }, [bookmark]);

    const pageContent = useMemo(() => {
        if (!currentTab) {
            return <Finder error={error} onStart={onStart} loadImages={loadImages} page={page} setPage={setPage} awaitingResponse={awaitingResponse} imagesData={imagesData} text={text} onTextChange={onTextChange} cardClick={cardClick} bookmark={bookmark}/>;
        } else {
            return <Bookmarks bookmark={bookmark} cardClick={cardClick}/>;
        }
    }, [loadImages, page, currentTab, awaitingResponse, imagesData, text, onTextChange, cardClick, bookmark, onStart, error]);

    return (
        <div className={s.main}>
            <SideBar onTabChange={setCurrentTab}/>
            {pageContent}
        </div>
    )
}