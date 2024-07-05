const Header = ({ children }: any) => {
    return (
        <div className="flex justify-between w-full p-4">
            {children}
        </div>
    );
};

export default Header;