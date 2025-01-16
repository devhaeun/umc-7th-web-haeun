import { ChangeEvent } from "react";

interface ICheckBox {
    id: number;
    label: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ id, label, checked, onChange }:ICheckBox) => {
    return (
        <>
        <input type="checkbox" id={String(id)} checked={checked} onChange={onChange} />
        <label htmlFor={String(id)}>{label}</label>
        </>
    )
}

export default CheckBox;