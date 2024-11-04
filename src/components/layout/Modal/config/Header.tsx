import { Notebook, X } from "lucide-react";

interface headerProps {
    setModal: (modal: boolean) => void,
    modal: boolean,
    title: string
}

const Header = ({ title, modal, setModal }: headerProps) => {
    return (
        <div className="flex justify-between w-full border-b pb-2 border-shade-4">
            <h1 className="flex gap-2 items-center text-foreground-1">
              <Notebook className="bg-shade-4 rounded-lg p-1" />
              <span className="text-lg font-medium">{title}</span>
            </h1>
            <button onClick={() => setModal(!modal)} className="flex items-center justify-center rounded-lg text-foreground-1 text-2xl font-medium size-7 hover:bg-danger">
              <X />
            </button>
        </div>
    );
};

export default Header;