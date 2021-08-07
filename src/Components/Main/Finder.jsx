import s from './Finder.module.scss';
import Input from "./Finder/Input";
import { useMemo } from "react";
import ImagesList from "./Finder/ImagesList.jsx";

export default function Finder({error, onStart, loadImages, onTextChange, text, awaitingResponse, imagesData, cardClick, bookmark, page}) {

    const pageCount = useMemo(() => {
        if (!imagesData) {
            return;
        } else {
            return imagesData.photos.pages;
        }
    }, [imagesData])

    const content = useMemo( () => {
        if (onStart) {
            return <div>
                <h3>No images here. Would you try to search for anything else?</h3>
            </div>
        } else if (error) {
          return  <div>
                <h3>Images not found</h3>
            </div>
        } else if (awaitingResponse) {
            return <div className={s.loader}/>;
        } else  {
           return <ImagesList
               imagesData={imagesData}
               loadImages={loadImages}
               cardClick={cardClick}
               pageCount={pageCount}
               bookmark={bookmark}
               text={text}
               page={page}
           />
        }
    }, [imagesData, awaitingResponse, bookmark, cardClick, onStart, loadImages, page, pageCount, text, error]);

    return (
        <div className={s.finder}>
            <Input text={text} onInputChange={onTextChange}/>
            {content}
        </div>
    )
}