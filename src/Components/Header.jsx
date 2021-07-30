import s from './Header.module.scss';

export default function Header() {
return (
    <div className={s.header}>
        <div className={s.header_title}>Image Finder</div>
        <div className={s.header_user}>userPic</div>
    </div>
)
}