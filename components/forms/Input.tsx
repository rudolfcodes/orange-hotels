type InputProps = {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error: string | null;
  required?: boolean;
  min?: number;
  max?: number;
};

const Input = ({
  label,
  type,
  value,
  name,
  onChange,
  placeholder,
  required,
  min,
  max,
}: InputProps) => {
  return (
    <div className="custom-input-field-wrapper flex-1 border-r border-gray-200 p-4">
      <label className="custom-input-label text-sm text-gray-600 mb-1 block">
        {label}
      </label>
      <div className="custom-input-container">
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="custom-input text-gray-800"
          required={required}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};

export default Input;
