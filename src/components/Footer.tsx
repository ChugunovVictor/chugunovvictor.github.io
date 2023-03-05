
type FooterProps = {
    children: JSX.Element
}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
    return (
        <div className="Footer">
            {props.children}
        </div>
    );
}

export default Footer