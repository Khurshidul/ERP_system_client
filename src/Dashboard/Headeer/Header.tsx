import React from "react";
import "./Header.css";
interface PropTypes {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<PropTypes> = ({ setIsAdding }) => {
  return (
    <header>
      <h1 id="heading">Employee Management System.</h1>
      <button className="addBtn" onClick={() => setIsAdding(true)}>
        ADD EMPLOYEE
      </button>
    </header>
  );
};

export default Header;
