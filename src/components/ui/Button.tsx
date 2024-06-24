interface ButtonProps {
    type?: string,
    onClick?: () => void,
    className?: string,
    children: React.ReactNode
}

const Button = ({ children, onClick, className }: ButtonProps) => {
    return(
        <button className={`flex items-center gap-2 border-2 border-blue-300 bg-blue-300 hover:bg-transparent hover:text-blue-300 p-1 px-2 rounded-full transition ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;