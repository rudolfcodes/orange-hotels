type InputProps = {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error: string | null;
  required?: boolean;
};

const Input = ({
  label,
  type,
  value,
  name,
  onChange,
  placeholder,
  required,
}: InputProps) => {
  return (
    <div className="custom-input-field-wrapper">
      <label className="custom-input-label">{label}</label>
      <div className="custom-input-container">
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="custom-input"
          required={required}
        />
      </div>
    </div>
  );
};

export default Input;
