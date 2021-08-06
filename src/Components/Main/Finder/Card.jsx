import s from './Card.module.scss';
import {Card as BootstrapCard} from "react-bootstrap";
import {BookmarkFill} from "react-bootstrap-icons";
import {useCallback, useMemo} from "react";

export default function Card({imgUrl, imgTitle, imgId, cardClick, bookmark}) {

    const handleClick = useCallback(() => cardClick(imgId, imgTitle, imgUrl), [imgId, cardClick, imgTitle, imgUrl])

    return (
            <BootstrapCard>
                <BootstrapCard.Img src={imgUrl} />
                <BootstrapCard.Body>
                    <BootstrapCard.Title>{imgTitle}</BootstrapCard.Title>
                    <BootstrapCard.Text>tags...</BootstrapCard.Text>
                    <input className={s.card_input}/>
                    <BookmarkFill
                        className={s.card_bookmark}
                        onClick={handleClick}
                        color={
                            useMemo(() => bookmark.findIndex(elem => elem.id === imgId) >= 0 ?
                                '#daa520' :
                                '#000000',
                                [imgId, bookmark]
                            )
                        }
                        />
                </BootstrapCard.Body>
            </BootstrapCard>
    )
}