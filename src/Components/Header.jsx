import s from './Header.module.scss';
import {PersonCircle} from "react-bootstrap-icons";
import {useContext} from "react";
import {Context} from "../index";
import firebase from "firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Header() {

    const {auth} = useContext(Context);

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
    }
    const [user] = useAuthState(auth);

return (
    <div className={s.header}>
        <div className={s.header_title}>Image Finder</div>
        <div className={s.header_login}>
            {user ?
                <div className={s.avatar}>
                    <img src={user.photoURL} alt={user.displayName}/>
                </div> :
                <h2>
                    <PersonCircle />
                </h2>
            }
            {user ?
                <p onClick={() => auth.signOut()}>LOGOUT</p>
                :
                <p onClick={login}>LOGIN</p>
            }
        </div>
    </div>
)
}