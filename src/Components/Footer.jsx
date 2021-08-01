import s from './Footer.module.scss';

export default function Footer() {
    return (
        <div className={s.footer}>
            <div className={s.footer_credits}>
                <a href='https://github.com/kosmodromm' style={{background: "wheat", color: "firebrick"}}>kosmodromm</a> for Elinext
            </div>
        </div>
    )
}