import { useFormContext } from '@ui/Form/config/context';
import { FieldError } from 'react-hook-form';

interface InputProps {
    label: string, 
    name: string, 
    type?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, label, name }: InputProps) => {
    
    const { register, errors } = useFormContext();

    return(
        <div className="flex flex-col w-full">
            <div>
                <label htmlFor={name} className="text-foreground-2 text-sm bg-shade-3 p-1 rounded-t">
                    {label}
                </label>
            </div>
           
            <input 
                { ...register(name) }
                className="rounded-b rounded-e bg-transparent border border-shade-3 outline-none text-white p-2"
                name={name}
                type={type}
            />
            
            {errors && (errors[name] as FieldError)?.message && (
              <span className="text-red-500 text-sm">
                {(errors[name] as FieldError).message}
              </span>
            )}
        </div>
    );
}

export default Input;