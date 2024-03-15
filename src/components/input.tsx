import { ChangeEvent } from "react";

interface IInputProps {
    label: string;
    onChangeValue?: (e: any) => void;
    value: string;
    numericOnly?: boolean;
    maxLength?: number;
    isDisabled?: boolean;
}


export function Input({label, onChangeValue, value, numericOnly, maxLength, isDisabled}: IInputProps) {

    function handleChangeValue(e: ChangeEvent<HTMLInputElement>){
        if(onChangeValue){
            if(maxLength && e.target.value.length > maxLength) return;
            if(numericOnly){
                onChangeValue(e.target.value?.replace(/\D/g, ""))
            }
            else {
                onChangeValue(e.target.value)
            }
        }
    }

  return (
    <div className="flex flex-col w-full mt-2">
        <label className="mb-1">{label}</label>
        <input disabled={isDisabled} onChange={e => handleChangeValue(e)} className="p-2 rounded-md text-slate-800 bg-slate-200" type="text" value={value} />
    </div>
  )
}
