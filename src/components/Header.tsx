import { ReactComponent as Cards } from '../assets/images/Ubuntu/Cards.svg';
import { ReactComponent as Home } from '../assets/images/Ubuntu/Home.svg';
import { ReactComponent as Settings } from '../assets/images/Ubuntu/Settings.svg';

import { useLocation } from "react-router-dom";
import { memoRoutes } from '../routes';
import Button from "./Button";

const Header: React.FC = () => {

    const location = useLocation()
    const isEdit = location.pathname.startsWith("/edit") ? "/edit/:id" : location.pathname
    const route = memoRoutes.find(e => e.path === isEdit)

    return (
        <div className="Header">
            {/* <span className="Title"> {route?.id} </span> */}
            <Button path="/">
                <Home className='Button' />
                <span>Home</span>
            </Button>
            <Button path="/cards">
                <Cards className='Button' />
                <span>Cards</span>
            </Button>
            <Button path="/settings">
                <Settings className='Button' />
                <span>Settings</span>
            </Button>
        </div>
    );
}

export default Header