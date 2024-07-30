import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core AG-Grid styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme
import { Button, Space, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchEmployeeRequest, deleteEmployeeRequest } from '../store/actions/employeeActions';


const EmployeePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employee, loading, error } = useSelector(state => state.employee);

  useEffect(() => {
    dispatch(fetchEmployeeRequest());
  }, [dispatch]);

  const columns = [
    { headerName: "Employee ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email Address", field: "email" },
    { headerName: "Phone Number", field: "phone_number" },
    { headerName: "Days Worked", field: "days_worked" },
    { headerName: "Café Name", field: "cafe" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(params.data)}>Edit</Button>
          <Button onClick={() => handleDelete(params.data._id)}>Delete</Button>
        </Space>
      )
    }
  ];

  const handleEdit = (employee) => {
    navigate(`/edit-employee/${employee._id}`)
  };

  const handleDelete = (employeeId) => {
    Modal.confirm({
      title: 'Are you sure delete this item?',
      content: 'This action cannot be undone and will permanently delete the item.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, cancel',
      onOk() {
          dispatch(deleteEmployeeRequest(employeeId));
      },
      onCancel() {
          console.log('Cancel delete');
      },
  });
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <Button type="primary" onClick={() => navigate('/add-employee')} style={{ marginBottom: 16 }}>
        Add New Employee
      </Button>
      <AgGridReact
        columnDefs={columns}
        rowData={employee || []}
        domLayout='autoHeight'>
      </AgGridReact>
    </div>
  );
};

export default EmployeePage;
