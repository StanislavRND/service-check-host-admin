interface EyeIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const EyeIcon = ({ isOpen, onClick, className }: EyeIconProps) => {
  return (
    <div className={`${className}`} onClick={onClick} tabIndex={-1}>
      {isOpen ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5C5 5 2 12 2 12C2 12 5 19 12 19C19 19 22 12 22 12C22 12 19 5 12 5Z"
            stroke="#98A2B3"
            strokeWidth="2"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="#98A2B3"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 2L22 22" stroke="#98A2B3" strokeWidth="2" />
          <path
            d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5 19 12 19C14.0505 19 15.8174 18.2734 17.2711 17.2884"
            stroke="#98A2B3"
            strokeWidth="2"
          />
          <path
            d="M11 5.05822C11.3254 5.02013 11.6588 5 12 5C19 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
            stroke="#98A2B3"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
};
