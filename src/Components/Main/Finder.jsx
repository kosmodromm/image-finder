import s from './Finder.module.scss';
import Input from "./Finder/Input";
import Pagination from "./Finder/Pagination";
import { useMemo } from "react";
import Card from "./Finder/Card";
import {Col, Row} from "react-bootstrap";

export default function Finder({onTextChange, text, awaitingResponse, imagesData, cardClick, bookmark}) {

    const content = useMemo(() => {
        return imagesData && !awaitingResponse ?
               imagesData.map((e, key) => {
                   let imgUrl=`https://farm${e.farm}.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`;
                   let imgTitle = e.title;
                   let imgId = e.id;
                    return (
                        <Col xs='3' key={key}>
                            <Card imgUrl={imgUrl} imgTitle={imgTitle} imgId={imgId} cardClick={cardClick} bookmark={bookmark}/>
                        </Col>
                    );
                })
            :
            <div className={s.loader}/>;
    }, [imagesData, awaitingResponse, bookmark, cardClick]);

    return (
        <div className={s.finder}>
            <Input text={text} onInputChange={onTextChange}/>
            <Pagination/>
            <Row className={s.finder_content}>{content}</Row>
        </div>
    )
}