import s from './Finder.module.scss';
import Input from "./Finder/Input";
import { useMemo } from "react";
import ImagesList from "./Finder/ImagesList.jsx";
import ReactPaginate from "react-paginate";
import {Container} from "react-bootstrap";

export default function Finder({
                                   addTag,
                                   tags,
                                   error,
                                   onStart,
                                   loadImages,
                                   onTextChange,
                                   text,
                                   awaitingResponse,
                                   imagesData,
                                   cardClick,
                                   bookmark,
                                   page
}) {

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
               addTag={addTag}
               tags={tags}
               text={text}
               page={page}
                />
        }
    }, [
        imagesData,
        awaitingResponse,
        bookmark,
        cardClick,
        onStart,
        loadImages,
        page,
        pageCount,
        text,
        error,
        addTag,
        tags
    ]);

    return (
        <div className={s.finder}>
            <Input text={text} onInputChange={onTextChange}/>
            {imagesData ?
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
                </div> :
                <div />
            }

            <Container fluid>
                        {content}
            </Container>
        </div>
    )
}