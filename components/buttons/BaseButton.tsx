interface BaseButtonProps {
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const BaseButton = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className,
}: BaseButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {children}
  </button>
);

export default BaseButton;
