import s from './Card.module.scss';
import {Card as BootstrapCard} from "react-bootstrap";
import {BookmarkFill} from "react-bootstrap-icons";
import {useMemo} from "react";

export default function Card({imgUrl, imgTitle, imgId, cardClick, bookmark}) {

    return (
            <BootstrapCard>
                <BootstrapCard.Img src={imgUrl} />
                <BootstrapCard.Body>
                    <BootstrapCard.Title>{imgTitle}</BootstrapCard.Title>
                    <BootstrapCard.Text>tags...</BootstrapCard.Text>
                    <input className={s.card_input}/>
                    <BookmarkFill
                        className={s.card_bookmark}
                        onClick={() => cardClick(imgId)}
                        fill={
                            useMemo(() => bookmark.indexOf(imgId) >= 0 ? 'red' : 'black', [imgId, bookmark])
                        }
                        />
                </BootstrapCard.Body>
            </BootstrapCard>
    )
}