const ButtonToTop = ({ onClick, isVisible }) => (
    <button className={`button ${isVisible ? 'visible' : ''}`} onClick={onClick}>
        Вернуться вверх
    </button>
);
export default ButtonToTop;