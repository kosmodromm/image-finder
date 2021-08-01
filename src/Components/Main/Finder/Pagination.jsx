import s from './Pagination.module.scss';

export default function Pagination() {
    return (
        <div className={s.pagination}>
            <button className={s.pagination_back}>Back</button>
            <button className={s.pagination_actual}>1 - 10 / 100</button>
            <button className={s.pagination_forward}>Forward</button>
        </div>
    )
}