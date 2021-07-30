import s from './Main.module.scss';
import SideBar from "./Main/SideBar";
import Finder from "./Main/Finder";
import {Switch, Route} from 'react-router-dom';
import Bookmarks from "./Main/Bookmarks";

export default function Main() {

    return (
        <div className={s.main}>
            <SideBar />
            <Switch>
                <Route exact path='/' component={Finder}/>
                <Route exact path='/finder' component={Finder}/>
                <Route exact path='/bookmarks' component={Bookmarks}/>
            </Switch>
        </div>
    )
}