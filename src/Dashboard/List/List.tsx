import React from "react";
import { Table, Button } from "react-bootstrap";
import { employeeType } from "../Home/Home";
import "./List.css";

interface PropTypes {
  employees: employeeType[];
  handleEdit: any;
  handleDelete: any;
}

const List: React.FC<PropTypes> = ({ employees, handleDelete, handleEdit }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
          </tr>
        </thead>
        {employees.map(employee => (
          <tbody>
            <tr>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.salary}</td>
              <td>{employee.date}</td>
              <td className="text-right">
                <Button
                  onClick={() => handleEdit(employee._id)}
                  variant="outline-info"
                >
                  Edit
                </Button>
              </td>
              <td className="text-left">
                <Button
                  onClick={() => handleDelete(employee._id)}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default List;
