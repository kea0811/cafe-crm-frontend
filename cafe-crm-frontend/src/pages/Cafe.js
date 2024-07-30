import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core AG-Grid styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme
import { Button, Modal, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchLocationsRequest, fetchCafeRequest, deleteItemRequest, fetchCafesByLocation } from '../store/actions/cafeActions';

import '../styles/Cafe.css';

const CafePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locations, loading: locationsLoading } = useSelector(state => state.location);
  const { cafe } = useSelector(state => state.cafe);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchCafeRequest());
    dispatch(fetchLocationsRequest());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit-cafe/${id}`)
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure delete this item?',
      content: 'This action cannot be undone and will permanently delete the item.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, cancel',
      onOk() {
          dispatch(deleteItemRequest(id));
      },
      onCancel() {
          console.log('Cancel delete');
      },
  });
  };

  const handleViewEmployees = (cafeId) => {
    navigate(`/employees?cafe=${cafeId}`);
  };

  const columns = [
    {
      headerName: "Logo",
      field: "logo",
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      cellRenderer: params => <img className="table-logo" src={`${params.value}"`} alt="logo" />
    },
    {
      headerName: "Name",
      field: "name",
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    {
      headerName: "Description", 
      field: "description", 
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      cellRenderer: params => <span>{params.value}</span>
    },
    {
      headerName: "Employees",
      field: "employeesCount",
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      cellRenderer: params => <Button type="link" onClick={() => handleViewEmployees(params.data.id)}>View Employees</Button>
    },
    {
      headerName: "Location", field: "location",
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    {
      headerName: "Actions",
      field: "_id",
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      cellRenderer: params => (
        <div>
          <Button className="mr-1" onClick={() => handleEdit(params.value)}>Edit</Button>
          <Button onClick={() => handleDelete(params.value)}>Delete</Button>
        </div>
      )
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <Button type="primary" className='mr-1' onClick={() => navigate('/add-cafe')} style={{ marginBottom: 16 }}>
        Add New Café
      </Button>
      <Select
        loading={locationsLoading}
        placeholder="Select a location"
        allowClear
        onChange={(value) => {
          if (value) {
            dispatch(fetchCafesByLocation(value));
          } else {
            dispatch(fetchCafeRequest());
          }
        }}
      >
        {locations.map(location => (
            <Select.Option key={location} value={location}>{location}</Select.Option>
        ))}
      </Select>
      <AgGridReact
        rowHeight={60}
        columnDefs={columns}
        rowData={cafe?.filter(cafe => cafe.location.toLowerCase().includes(filter.toLowerCase()))}
        domLayout='autoHeight'>
      </AgGridReact>
    </div>
  );
};

export default CafePage;
