import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("0");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState("0");

  const [employeeList, setEmployeeList] = useState([]);

  const [newWage, setNewWage] = useState(0);

  const AddEmployee = () => {
    Axios.post("http://localhost:3002/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3002/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3002/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  position: val.position,
                  age: val.age,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployees = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name</label>
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          type="text"
        />
        <label>Age</label>
        <input
          onChange={(event) => {
            setAge(event.target.value);
          }}
          type="number"
        />
        <label>Country</label>
        <input
          onChange={(event) => {
            setCountry(event.target.value);
          }}
          type="text"
        />
        <label>Position</label>
        <input
          onChange={(event) => {
            setPosition(event.target.value);
          }}
          type="text"
        />
        <label>Wage(Year)</label>
        <input
          onChange={(event) => {
            setWage(event.target.value);
          }}
          type="number"
        />
        <button onClick={AddEmployee}>Add Employee</button>
      </div>

      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>
        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name:{val.name}</h3>
                <h3>Age:{val.age}</h3>
                <h3>Position:{val.position}</h3>
                <h3>Country:{val.country}</h3>
                <h3>Wage:{val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}>
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteEmployees(val.id);
                  }}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
