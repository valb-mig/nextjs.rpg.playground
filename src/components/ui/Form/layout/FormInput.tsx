import { useFormContext } from '@ui/Form/config/context';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps {
    label: string, 
    name: string, 
    type?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    children?: React.ReactNode,
    value?: any,
    disabled?: boolean
}

const Input = ({ type, label, name, value, disabled, children }: InputProps) => {
    
    const { register, errors } = useFormContext();

    return(
        <div className="flex flex-col w-full">
            <div>
                <label htmlFor={name} className="text-foreground-2 text-sm bg-shade-3 p-1 rounded-t">
                    {label}
                </label>
            </div>
           
            <div className={`flex relative w-full rounded-b rounded-e ${ disabled ? 'bg-shade-3' : 'bg-transparent'} border border-shade-3 text-white`}>
                <input 
                    { ...register(name) }
                    className="w-full p-2 bg-transparent outline-none"
                    name={name}
                    type={type}
                    value={value}
                />
                <span className='absolute right-2 top-1/2 -translate-y-1/2 text-foreground-4 text-sm'>
                    { children }
                </span>
            </div>
            
            {errors && (errors[name] as FieldError)?.message && (
              <span className="text-red-500 text-sm">
                {(errors[name] as FieldError).message}
              </span>
            )}

        </div>
    );
}

export default Input;