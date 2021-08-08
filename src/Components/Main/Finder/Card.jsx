import s from './Card.module.scss';
import {Card as BootstrapCard} from "react-bootstrap";
import {BookmarkFill} from "react-bootstrap-icons";
import {useCallback, useMemo, useState} from "react";

export default function Card({addTag, imgTags, imgUrl, imgTitle, imgId, cardClick, bookmark}) {

    const [tagText, setTagText] = useState('');
    const [tags, setTags] = useState([]);

    const onKeyDown = event => {
        if (event.key === 'Enter') {
            let updatedTags = [...tags, tagText];
            setTags(updatedTags);
            setTagText('');
            addTag(imgId, tags);
        }
    }

    const handleTags = useMemo (() => {
       return imgTags.length ? `Tags: ${imgTags.join(', ')}` : '';
    }, [imgTags])

    const handleClick = useCallback(() => cardClick(imgId, imgTitle, imgUrl), [imgId, cardClick, imgTitle, imgUrl])

    return (
            <BootstrapCard>
                <BootstrapCard.Img src={imgUrl} />
                <BootstrapCard.Body>
                    <BootstrapCard.Title>{imgTitle}</BootstrapCard.Title>
                    <BootstrapCard.Text>{handleTags}</BootstrapCard.Text>
                    <input className={s.card_input} value={tagText} onChange={event => setTagText(event.target.value)} onKeyDown={onKeyDown}/>
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