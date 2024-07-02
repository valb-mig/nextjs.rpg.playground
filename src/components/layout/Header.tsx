const Header = () => {
  return (
    <header className="flex flex-row justify-center items-center w-full h-16 bg-background-default px-4 border-b border-shade-4">
      <h1 className="text-3xl font-bold text-foreground-1">
        RPG <span className="text-primary">Playground</span>
        <p className="text-center text-xs text-shade-1">
          {"A playground for Table RPG games"}
        </p>
      </h1>
    </header>
  );
};

export default Header;
