import s from './ImagesList.module.scss';
import ReactPaginate from "react-paginate";
import {Col, Container, Row} from "react-bootstrap";
import Card from "./Card";
import {useMemo} from "react";

export default function ImagesList({imagesData, page, pageCount, text, loadImages, bookmark, cardClick}) {

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
                    return (
                        <div>
                            <div className={s.pagination}>
                                <ReactPaginate
                                    initialPage={page}
                                    disableInitialCallback={false}
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
                                <Row className={s.finder_content}>
                                    <Col xs='3' key={key}>
                                        <Card imgUrl={imgUrl} imgTitle={imgTitle} imgId={imgId} cardClick={cardClick} bookmark={bookmark}/>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    );
                })
            )
        }
    }, [imagesData, bookmark, cardClick, loadImages, page, pageCount, text]);

    return <div>{content}</div>;
}