import React, { HTMLInputTypeAttribute } from "react";

export default function GridInputGroup({
  labelText,
  inputType,
  dimension = "",
  onChange,
}: {
  labelText: string;
  inputType: HTMLInputTypeAttribute;
  dimension?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = React.useId();

  return (
    <div>
      <label htmlFor={id} className="uppercase font-bold block pb-1">
        {labelText}
      </label>
      <div>
        <input
          type={inputType}
          id={id}
          onChange={onChange}
          autoComplete="off"
          className="border-[1px] border-slate-400 rounded-md px-2 py-1 w-16 text-right focus:border-fuchsia-400 focus-visible:outline-none"
        />
        {dimension && <span className="ml-2">{dimension}</span>}
      </div>
    </div>
  );
}
