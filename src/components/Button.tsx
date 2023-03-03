import { useNavigate } from "react-router-dom";
import { navigateWithFade } from "../components/Fade";

type Props = {path: string, children: (JSX.Element | string)[]}

const Button: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate()
    return (
        <div className='Memo-Button' onClick={()=> navigateWithFade(props.path, navigate)}>
            { props.children }
        </div>
    );
}

export default Button