import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Add from "../Add/Add";
import Edit from "../Edit/Edit";
import Header from "../Headeer/Header";
import List from "../List/List";
interface PropTypes {}
export type employeeType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  salary: string;
  date: string;
};
const initialState = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  salary: "",
  date: "",
};
const Home: React.FC<PropTypes> = () => {
  const [employees, setEmployees] = useState<employeeType[]>([]);
  const [selectEmployee, setSelectEmployee] =
    useState<employeeType>(initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    const response = async () => {
      const reponse = await fetch("http://localhost:5000/employees");
      const data = await reponse.json();
      setEmployees(data);
    };
    response();
  }, []);

  const handleEdit = (id: string) => {
    employees.map(employee => {
      if (employee._id === id) {
        setSelectEmployee(employee);
        return setIsEditing(true);
      }
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/employees/${id}`, {
        method: "DELETE",
      }).then(res => res.json());

      setEmployees(
        employees.filter(filteredItem => {
          if (filteredItem._id !== id) {
            return true;
          } else return false;
        })
      );
      if (id) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Successfully deleted..",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log("something is wrong", error);
    }
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />
          <List
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && <Add setIsAdding={setIsAdding} />}
      {isEditing && (
        <Edit
          setIsEditing={setIsEditing}
          employees={employees}
          selectEmployee={selectEmployee}
          setSelectEmployee={setSelectEmployee}
          setEmployees={setEmployees}
        />
      )}
    </div>
  );
};

export default Home;
