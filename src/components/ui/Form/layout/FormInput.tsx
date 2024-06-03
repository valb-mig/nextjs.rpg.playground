import { useFormContext } from '@ui/Form/config/context';
import { FieldError } from 'react-hook-form';

interface InputProps {
    label: string, 
    name: string, 
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name }: InputProps) => {
    
    const { register, errors } = useFormContext();

    return(
        <div className="flex flex-col w-full">
            <div>
                <label htmlFor={name} className="text-white text-sm bg-neutral-700 p-1 rounded-t">
                    {label}
                </label>
            </div>
           
            <input 
                {...register(name)}
                className="rounded-b rounded-e bg-neutral-800 border border-neutral-700 outline-none text-white p-2"
                name={name}
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