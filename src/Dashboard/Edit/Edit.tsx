import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { employeeType } from "../Home/Home";

interface PropTypes {
  employees: employeeType[];
  selectEmployee: employeeType;
  setSelectEmployee: React.Dispatch<React.SetStateAction<employeeType>>;
  setEmployees: React.Dispatch<React.SetStateAction<employeeType[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit: React.FC<PropTypes> = ({
  employees,
  selectEmployee,
  setEmployees,
  setIsEditing,
}) => {
  const textInput = useRef<any>(null);

  useEffect(() => {
    textInput.current.focus() as FocusEvent;
  }, []);

  const [editEmployee, setEditEmployee] = useState<employeeType>({
    _id: selectEmployee._id,
    firstName: selectEmployee.firstName,
    lastName: selectEmployee.lastName,
    email: selectEmployee.email,
    salary: selectEmployee.salary,
    date: selectEmployee.date,
  });
  const onChange = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement;
    setEditEmployee({ ...editEmployee, [name]: value });
  };
  const handleUpdate = async (id: string) => {
    try {
      if (editEmployee._id === id) {
        // console.log("hello");
        const response = await fetch(`http://localhost:5000/employees/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            firstName: editEmployee.firstName,
            lastName: editEmployee.lastName,
            email: editEmployee.email,
            salary: editEmployee.salary,
            date: editEmployee.date,
          }),
        });
        if (!response.ok) throw new Error("something is wrong");
        // console.log(await response.json());
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `${editEmployee.firstName} ${editEmployee.lastName}'s data has been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
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
    setEmployees(employees);
  };
  return (
    <div className="AddEmployee">
      <form
        onSubmit={() => handleUpdate(editEmployee._id)}
        className="newEmployee"
        action=""
      >
        <h3 id="add">Edit employee</h3>
        <label htmlFor="firstName">
          First Name
          <br />
          <input
            id="firstName"
            type="text"
            ref={textInput}
            name="firstName"
            onChange={onChange}
            value={editEmployee.firstName}
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
            value={editEmployee.lastName}
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
            value={editEmployee.email}
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
            value={editEmployee.salary}
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
            value={editEmployee.date}
            onChange={onChange}
            required={true}
          />
        </label>
        <div>
          <button className="submit-btn" type="submit">
            UPDATE
          </button>
          <button
            className="submit-btn"
            type="submit"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;

// import React, { useEffect, useRef, useState } from "react";
// import Swal from "sweetalert2";
// import { employeeType } from "../Home/Home";

// interface PropTypes {
//   employees: employeeType[];
//   setEmployees: React.Dispatch<React.SetStateAction<employeeType[]>>;
//   setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Edit: React.FC<PropTypes> = ({
//   employees,
//   setEmployees,
//   setIsEditing,
// }) => {
//   const textInput = useRef<any>(null);

//   useEffect(() => {
//     textInput.current.focus() as FocusEvent;
//   }, []);
//   const [editEmployee, setEditEmployee] = useState<employeeType>({
//     _id: employee._id,
//     firstName: employee.firstName,
//     lastName: employee.lastName,
//     email: employee.email,
//     salary: employee.salary,
//     date: employee.date,
//   });
//   const onChange = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { name, value } = e.target as HTMLInputElement;
//     setEditEmployee({ ...editEmployee, [name]: value });
//   };

//   return (
//
//   );
// };

// export default Edit;
