import s from './Bookmarks.module.scss';
import {Col, Row, Container} from "react-bootstrap";
import {useMemo} from "react";
import Card from "./Finder/Card";

export default function Bookmarks({bookmark, cardClick}) {

    const content = useMemo(() => {
        return bookmark ?
            bookmark.map((e, key) => {
                let imgUrl=e.url;
                let imgTitle = e.title;
                let imgId = e.id;
                return (
                    <Col xs='3' key={key}>
                        <Card imgUrl={imgUrl} imgTitle={imgTitle} imgId={imgId} cardClick={cardClick} bookmark={bookmark}/>
                    </Col>
                );
            })
            :
            <div className={s.empty}>Bookmarks is empty</div>;
    }, [bookmark, cardClick]);

return (
    <div className={s.bookmarks}>
        <Container fluid>
        <Row className={s.bookmarks_content}>{content}</Row>
        </Container>
    </div>
)
}