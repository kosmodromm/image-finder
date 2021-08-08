import s from './ImagesList.module.scss';
import {Col, Row} from "react-bootstrap";
import Card from "./Card";
import {useMemo} from "react";

export default function ImagesList({imagesData, bookmark, cardClick}) {

    let content = useMemo(() => {
        if (!imagesData) {
            return (
                <div>
                    <h3>Images not found</h3>
                </div>
            )
        } else {
            return (
                imagesData.photos.photo.map((e, key) => {
                    let imgUrl=`https://farm${e.farm}.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`;
                    let imgTitle = e.title;
                    let imgId = e.id;
                    let imgTags = bookmark.findIndex(elem => elem.id === imgId) >= 0 ?
                        bookmark[bookmark.findIndex(elem => elem.id === imgId)].tags :
                        [];
                    return (
                        <Col xs='3' key={key}>
                            <Card imgTags={imgTags} imgUrl={imgUrl} imgTitle={imgTitle} imgId={imgId} cardClick={cardClick} bookmark={bookmark}/>
                        </Col>
                    );
                })
            )
        }
    }, [imagesData, bookmark, cardClick]);

    return <Row className={s.finder_content}>{content}</Row>;
}