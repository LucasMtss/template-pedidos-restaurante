import { ChangeEvent } from "react";

interface ITextAreaProps {
    label: string;
    onChangeValue?: (e: any) => void;
    value: string;
    numericOnly?: boolean;
    maxLength?: number;
    isDisabled?: boolean;
}


export function TextArea({label, onChangeValue, value, numericOnly, maxLength, isDisabled}: ITextAreaProps) {

    function handleChangeValue(e: ChangeEvent<HTMLTextAreaElement>){
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
        <textarea disabled={isDisabled} onChange={e => handleChangeValue(e)} className="p-2 rounded-md text-slate-800 bg-slate-200 min-h-[100px]" value={value} />
    </div>
  )
}
