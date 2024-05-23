import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);

  const getDisplayedEmployees = () => {
    const startIndex = (currentPage - 1) * employeesPerPage;
    const endIndex = startIndex + employeesPerPage;
    return employeeData.slice(startIndex, endIndex);
  };
  const handlePageChange = (direction) => {
    console.log(direction);
    if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      employeeData.length > currentPage * employeesPerPage
    ) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => setEmployeeData(data))
      .catch((err) => {
        alert("failed to fetch data");
        console.log("failed to fetch data");
      });
  }, [employeeData]);
  return (
    <>
      <header>Employee Data Table</header>
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {getDisplayedEmployees().map((emp) => (
              <>
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                </tr>
                {/* <tr className="table__line">
                  <td colSpan="100%"></td>
                </tr> */}
              </>
            ))}
          </tbody>
        </table>
        {/* <div className="end__line"></div> */}
        <div className="pagination">
          <button
            className="previous"
            // disabled={currentPage === 1}
            onClick={() => handlePageChange("previous")}
          >
            Previous
          </button>
          <span className="page__number">{currentPage}</span>
          <button
            className="next"
            // disabled={
            //   currentPage === Math.ceil(employeeData.length / employeesPerPage)
            // }
            onClick={() => handlePageChange("next")}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;