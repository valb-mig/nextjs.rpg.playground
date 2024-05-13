interface FormProps {
    children: React.ReactNode,
    onSubmit: () => {},
    style?: string
}

const Form = ({ children, onSubmit, style }: FormProps) => {
    return(
        <form onSubmit={onSubmit} className={`flex flex-col gap-2 bg-neutral-800 p-2 rounded border-b-2 border-b-neutral-700 ${style ? style : ''}`}>
            { children }
        </form>
    );
}

export default Form;