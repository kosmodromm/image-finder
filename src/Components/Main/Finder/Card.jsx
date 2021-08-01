import s from './Card.module.scss';

export default function Card({img_url}) {
    return (
        <div className={s.card}>
            <div className={s.card_image} style={{background: `url(${img_url}) no-repeat center`}}></div>
            <div className={s.card_footer}>
                <button className={s.card_btn}></button>
                <div className={s.card_tags}>
                    <p>tags here...</p>
                    <input className={s.card_input}/>
                </div>
            </div>
        </div>
    )
}