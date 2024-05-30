interface ButtonProps {
    onClick?: () => void,
    className?: string,
    children: React.ReactNode
}

const Button = ({ children, onClick, className }: ButtonProps) => {
    return(
        <button className={`flex items-center gap-2 ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;