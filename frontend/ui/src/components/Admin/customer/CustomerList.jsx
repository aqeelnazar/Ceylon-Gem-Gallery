import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./update.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/customer");
        setCustomers(res.data);
      } catch (error) {
        console.log("Error fetching customer details", error);
      }
    };

    fetchCustomers();
  }, []);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:3000/api/customer/${id}`)
      .then(() => {
        setCustomers(customers.filter((customer) => customer._id !== id));
      })
      .catch((err) => {
        console.log("Delete error", err);
      });
  };

  // Function to export the table data to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
  
    // Add Company Logo
    const logoURL = "../../assets/logo.png"; // Placeholder logo, replace with your actual logo path
    doc.addImage(logoURL, "PNG", 170, 10, 20, 20); // Adjust logo position and size
  
    // Add Invoice Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Customer List", 14, 22);
  
    // Add Date and Invoice ID
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Invoice ID: ${Math.floor(Math.random() * 100000)}`, 14, 36);
  
    // Add Divider
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 40, 196, 40); // Horizontal line
  
    // Company Details Section
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Company Name: Ceylon Gem Gallery", 14, 50);
    doc.text("Address: 123 Gem Street, Colombo, Sri Lanka", 14, 56);
    doc.text("Email: info@ceylongemgallery.com", 14, 62);
    doc.text("Phone: +94 76 039 4961", 14, 68);
  
    // Add Table Header
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Customer Details", 14, 80);
  
    // Table Columns and Rows
    const tableColumn = ["#", "First Name", "Last Name", "Email", "Password"];
    const tableRows = [];
  
    customers.forEach((customer, index) => {
      const customerData = [
        index + 1, // Row index
        customer.Fname || "N/A",
        customer.Lname || "N/A",
        customer.Email || "N/A",
        customer.Password || "N/A",
      ];
      tableRows.push(customerData);
    });
  
    // Table Style
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 90, // Start position for the table
      styles: {
        fontSize: 10,
        cellPadding: 4,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [65, 117, 88],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [220, 220, 220],
      },
      margin: { top: 90 },
    });
  
    // Save the PDF
    doc.save("customer-list.pdf");
  };
  
  

  return (
    <div className="con">
      <div className="customer-container">
        {/* Back link */}
        <div>
          <br />
          <Link to="/" className="back-link">
            Back to main
          </Link>
        </div>

        {/* Customers Details */}
        <br />
        <div>
          <h1 className="customer-title">Customer Details</h1>
          <button
            className="btn btn-outline-choose"
            onClick={() => navigate("/admin/addCustomer")}
          >
            Add Customers
          </button>
          <button className="btn btn-outline-choose" onClick={exportPDF}>
            Export to PDF
          </button>{" "}
          {/* Export button */}
          <p className="customer-description">
            This is the full list of customers:
          </p>
          <hr className="customer-divider" />
          <br />
        </div>

        {/* Table displaying customer details */}
        <div>
          <table className="customer-table">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="6">No customers found!</td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={customer._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{customer.Fname || "N/A"}</td>
                    <td>{customer.Lname || "N/A"}</td>
                    <td>{customer.Email || "N/A"}</td>
                    <td>{customer.Password || "N/A"}</td>
                    <td>
                      <Link
                        to={`/Admin/updatecustomerdetails/${customer._id}`}
                        className="edit-link"
                      >
                        Edit
                      </Link>
                      <button
                        className="edit-link"
                        onClick={() => onDeleteClick(customer._id)}
                        style={{
                          border: "none",
                          background: "none",
                          color: "red",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
