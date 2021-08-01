import s from './Finder.module.scss';
import Input from "./Finder/Input";
import Pagination from "./Finder/Pagination";
import {useCallback, useEffect, useMemo, useState} from "react";
import Card from "./Finder/Card";

const api_key = '5f1b3971fa93cb35ebe2d6c0769db9ca';
const api_root = 'https://api.flickr.com/services/rest/';
const method = 'flickr.photos.search';
const per_page = '10';
const format = 'json';
const nojsoncallback = '1';


export default function Finder() {

    const [page, setPage] = useState(1);
    const [awaitingResponse, setAwaitingResponse] = useState(0);
    const [imagesData, setImagesData] = useState(null);
    const [text, setText] = useState('');

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

        makeApiRequest(`${api_root}`, {method, api_key, text, per_page, page, format, nojsoncallback})
            .then(data => {
                setImagesData(data.photos.photo);
            });
    }, [page, makeApiRequest])

    let content;
    if (imagesData && !awaitingResponse) {
        content =
            <div className={s.finder_content}>
                {imagesData.map((e, key) => <Card key={key} img_url={`https://farm${e.farm}.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`}/>)}
            </div>;
    } else {
        content = <div className={s.loader}></div>;
    }

    let timer;
    useEffect(() => {
        clearTimeout(timer);
        return timer = setTimeout(() => {
            loadImages(text);
        }, 1500);
    }, [text])

    console.log(awaitingResponse);
    console.log(text);

return (
    <div className={s.finder}>
        <Input text={text} onInputChange={setText}/>
        <Pagination />
        {content}
    </div>
)
}