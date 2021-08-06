import s from './Finder.module.scss';
import Input from "./Finder/Input";
import { useMemo } from "react";
import Card from "./Finder/Card";
import {Col, Row, Container} from "react-bootstrap";
import ReactPaginate from 'react-paginate';

export default function Finder({loadImages, onTextChange, text, awaitingResponse, imagesData, cardClick, bookmark, page, setPage}) {

    const content = useMemo(() => {
        return imagesData && !awaitingResponse ?
               imagesData.photos.photo.map((e, key) => {
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

    const pageCount = useMemo(() => {
        if (!imagesData) {
            return;
        } else {
            return imagesData.photos.pages;
        }
    }, [imagesData])

console.log(imagesData);
    return (
        <div className={s.finder}>
            <Input text={text} onInputChange={onTextChange}/>
            <div className={s.pagination}>
                <ReactPaginate
                    initialPage={page}
                    disableInitialCallback={true}
                    pageCount={pageCount}
                    previousLabel={''}
                    nextLabel={''}
                    breakLabel={'...'}
                    breakClassName={s.break_me}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={(e) => {
                        loadImages(text, e.selected + 1);
                    }}
                    activeClassName={s.active}
                    containerClassName={s.pagination_wrapper}
                    pageClassName={s.pagination_page}
                    pageLinkClassName={s.pagination_page_link}
                    activeLinkClassName={s.active_link}
                    previousClassName={s.previous}
                    nextClassName={s.next}
                    previousLinkClassName={s.previous_link}
                    nextLinkClassName={s.next_link}
                    disabledClassName={s.disabled}
                />
            </div>
            <Container fluid>
                <Row className={s.finder_content}>{content}</Row>
            </Container>
        </div>
    )
}