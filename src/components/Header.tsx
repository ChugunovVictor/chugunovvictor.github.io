import { useNavigate } from "react-router-dom";
import { navigateWithFade } from "./Fade";
import { ReactComponent as Home } from '../assets/images/Ubuntu/Home.svg'
import { ReactComponent as Add }  from '../assets/images/Ubuntu/Add.svg'
import { ReactComponent as Settings }  from '../assets/images/Ubuntu/Settings.svg'

import { useLocation } from "react-router-dom"
import { memoRoutes } from '../routes'
  
const Header: React.FC = () => {
    const navigate = useNavigate()

    const location = useLocation()   
    const isEdit = location.pathname.startsWith("/edit") ? "/edit/:id" : location.pathname
    const route = memoRoutes.find(e => e.path === isEdit)

    return (
        <div className="Header">
            <span className="Title"> {route?.id} </span>
            { route?.homeButtonShow && <Home className='Button' onClick={()=> navigateWithFade("/", navigate)}/> }
            { route?.addButtonShow && <Add className='Button' onClick={()=> navigateWithFade("/add", navigate)}/> }
            { route?.settingsButtonShow && <Settings className='Button' onClick={()=> navigateWithFade("/settings", navigate)}/> }
        </div>
    );
}

export default Header