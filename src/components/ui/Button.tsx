interface ButtonProps {
    type: "submit" | "reset" | "button",
    onClick?: () => void,
    className?: string,
    children: React.ReactNode
}

const Button = ({ type, children, onClick, className }: ButtonProps) => {
    return(
        <button type={type} className={`flex items-center gap-2 border-2 border-blue-300 bg-blue-300 hover:bg-transparent hover:text-blue-300 p-1 px-2 rounded-full transition ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;