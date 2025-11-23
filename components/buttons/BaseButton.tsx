interface BaseButtonProps {
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

const BaseButton = ({
  children,
  type = "button",
  onClick,
  className,
}: BaseButtonProps) => (
  <button type={type} onClick={onClick} className={className}>
    {children}
  </button>
);

export default BaseButton;
