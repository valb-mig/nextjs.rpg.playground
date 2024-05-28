interface InputProps {
    label: string, 
    name: string, 
    errors: any, 
    register: any
}

const Input = ({ label, name, errors, register }: InputProps) => {
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
            />
            {errors[name] && (
              <span className="text-red-500 text-sm">
                {errors[name].message}
              </span>
            )}
        </div>
    );
}

export default Input;