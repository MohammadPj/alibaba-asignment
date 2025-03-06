import { FC, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export interface TextFieldProps {
  label?: ReactNode;
  helperText?: string;
  errorText?: string;
  error?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  placeholder?: string;
  size?: "small" | "medium" | "large";
  withoutHelperText?: boolean;
  containerProps?: InputHTMLAttributes<HTMLDivElement>
}

const TextField: FC<TextFieldProps> = ({
  label,
  helperText,
  errorText,
  error,
  startAdornment,
  endAdornment,
  inputProps,
  placeholder,
  size = "medium",
  withoutHelperText,
  containerProps
}) => {
  const normalState = !error && !inputProps?.disabled;

  const inputClasses = clsx(
    "w-full border rounded-lg text-sm focus:outline-none transition bg-white",
    normalState && "border-gray-400 focus:border-gray-800",
    startAdornment && "pl-10",
    endAdornment && "pr-10",
    error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : " focus:ring-blue-500 ",
    {
      small: "px-3 py-2 text-xs",
      medium: "px-4 py-3 text-sm",
      large: "px-5 py-4 text-base",
    }[size],
  );

  return (
    <div className={`w-full ${inputProps?.disabled ? "opacity-50" : ""}`} {...containerProps}>
      {label && (
        <label
          htmlFor={inputProps?.id}
          className={`block text-sm font-medium text-gray-700 mb-1 ${error && "text-red-500"}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {startAdornment && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            {startAdornment}
          </div>
        )}

        <input
          id={inputProps?.id}
          className={inputClasses}
          placeholder={placeholder}
          dir={"rtl"}
          {...inputProps}
        />

        {endAdornment && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {endAdornment}
          </div>
        )}
      </div>

      {!withoutHelperText && (
        <p
          className={clsx(
            "h-4 text-xs mt-1",
            errorText ? "text-red-500" : "text-gray-500",
          )}
        >
          {errorText || helperText}
        </p>
      )}
    </div>
  );
};

export default TextField;
