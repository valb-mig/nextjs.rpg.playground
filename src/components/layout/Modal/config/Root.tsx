const Root = ({ children }: any) => {
    return (
        <div 
            className="absolute h-screen w-screen flex items-center justify-center backdrop-blur-sm bg-black/50 z-40" 
            popover="auto"
        >
            <section role="modal" className="flex flex-col gap-4 w-full max-w-lg rounded-lg bg-shade-5 border border-shade-4 p-4">
                {children}
            </section>
        </div>
            
    );
};

export default Root;