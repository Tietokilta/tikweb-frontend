type Props = {
  open: boolean
  onClick: () => void
}

const BurgerButton: React.FC<Props> = ({ open, onClick }) => (
  <button
    type="button"
    className="text-white w-8 h-8 relative"
    onClick={onClick}
  >
    <span className="sr-only">Open main menu</span>
    <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span
        aria-hidden="true"
        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
          open ? "rotate-45" : "-translate-y-1.5"
        }`}
      />
      <span
        aria-hidden="true"
        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        aria-hidden="true"
        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
          open ? "-rotate-45" : "translate-y-1.5"
        }`}
      />
    </div>
  </button>
)

export default BurgerButton
