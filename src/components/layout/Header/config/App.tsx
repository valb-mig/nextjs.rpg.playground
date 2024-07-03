const AppHeader = () => {
    return (
        <header className="flex flex-row justify-between items-center w-full h-16 bg-background-default px-4 border-b border-shade-4">
            <h1 className="text-lg font-bold text-foreground-1">
                RPG <span className="text-primary">Playground App</span>
            </h1>
        </header>
    );
};

export default AppHeader;
