import React, { useEffect, useRef, useState } from "react";
import "./Add.css";
import Swal from "sweetalert2";
import { employeeType } from "../Home/Home";

interface PropTypes {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}
type addEmployeeType = {
  firstName: string;
  lastName: string;
  email: string;
  salary: string;
  date: string;
};
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  salary: "",
  date: "",
};

const Add: React.FC<PropTypes> = ({ setIsAdding }) => {
  const textInput = useRef<any>(null);

  useEffect(() => {
    textInput.current.focus() as FocusEvent;
  }, []);
  const [addEmployee, setAddEmployee] = useState<addEmployeeType>(initialState);
  const onChange = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement;
    setAddEmployee({ ...addEmployee, [name]: value });
  };
  const handleAdd = async (e: React.FormEvent) => {
    // e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: addEmployee.firstName,
          lastName: addEmployee.lastName,
          email: addEmployee.email,
          salary: addEmployee.salary,
          date: addEmployee.date,
        }),
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: `${addEmployee.firstName} ${addEmployee.lastName}'s data has been Added.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (!response.ok) throw new Error("something is wrong");
      // console.log(await response.json());
    } catch (err) {
      if (err) {
        return Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something is wrong...",
          showConfirmButton: true,
        });
      }
    }
    setAddEmployee(initialState);
    setIsAdding(false);
  };

  return (
    <div className="AddEmployee">
      <form onSubmit={handleAdd} className="newEmployee" action="">
        <h3 id="add">Add employee</h3>
        <label htmlFor="firstName">
          First Name
          <br />
          <input
            id="firstName"
            type="text"
            ref={textInput}
            name="firstName"
            value={addEmployee.firstName}
            onChange={onChange}
            required={true}
          />
        </label>

        <label htmlFor="lastName">
          Last Name
          <br />
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={addEmployee.lastName}
            onChange={onChange}
            required={true}
          />
        </label>

        <label htmlFor="email">
          Email
          <br />
          <input
            id="email"
            type="text"
            name="email"
            value={addEmployee.email}
            onChange={onChange}
            required={true}
          />
        </label>

        <label htmlFor="salary">
          Salary
          <br />
          <input
            id="salary"
            type="text"
            name="salary"
            value={addEmployee.salary}
            onChange={onChange}
            required={true}
          />
        </label>

        <label htmlFor="firstName">
          Date
          <br />
          <input
            id="date"
            type="date"
            name="date"
            value={addEmployee.date}
            onChange={onChange}
            required={true}
          />
        </label>
        <div>
          <button className="submit-btn" type="submit">
            SUBMIT
          </button>
          <button
            className="submit-btn"
            type="submit"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
