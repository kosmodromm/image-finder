import s from './Input.module.scss';

export default function Input({text, onInputChange}) {
    return (
        <div className={s.input}>
            <input className={s.input_field} value={text} onChange={event => onInputChange(event.target.value)}/>
        </div>
    )
}