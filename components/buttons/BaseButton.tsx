interface BaseButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

const BaseButton = ({ children, onClick, className }: BaseButtonProps) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

export default BaseButton;
