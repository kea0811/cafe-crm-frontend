import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Input, Radio, message, Form, Select } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { fetchEmployeeRequest, saveEmployeeRequest } from '../store/actions/employeeActions';
import { fetchCafeRequest } from '../store/actions/cafeActions';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(6, "Minimum 6 characters").max(10, "Maximum 10 characters"),
  email: Yup.string().required("Email is required").email("Invalid email format"),
  phone_number: Yup.string().required("Phone number is required").matches(/^[89]\d{7}$/, "Invalid phone number"),
  gender: Yup.string().required("Gender is required"),
});

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the ID from URL if it exists

  // Fetch the employee state from Redux store
  const { employee, loading, error } = useSelector(state => state.employee);
  const { cafe } = useSelector(state => state.cafe);

  // Initialize react-hook-form
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      gender: '',
    }
  });

  // Load employee data into the form when data is fetched
  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeRequest(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (employee && id) {
      reset(employee); // Resets the form with fetched employee data
    }
  }, [employee, reset]);

  useEffect(() => {
    dispatch(fetchCafeRequest());
  }, [dispatch])

  const onSubmit = data => {
    dispatch(saveEmployeeRequest({...data, start_date: new Date().toISOString().slice(0, 10)}, id));
    reset(employee);
    window.location.href = '/employees';
  };

  const onError = (errors) => {
    console.error('Form errors:', errors);
    message.error('Please correct the form errors and try again.');
  };

  return (
    <Form onFinish={handleSubmit(onSubmit, onError)} layout="vertical">
      <Form.Item label="Name" help={errors.name?.message}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Email Address" help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Phone Number" help={errors.phone_number?.message}>
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Gender" help={errors.gender?.message}>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field}>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          )}
        />
      </Form.Item>
      <Form.Item label="Café" help={errors.cafe?.message}>
        <Controller
          name="cafe"
          control={control}
          render={({ field }) => (
              <Select {...field} placeholder="Select a café">
                  {cafe?.map(item => (
                      <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                  ))}
              </Select>
          )}
        />
      </Form.Item>
      <Button type="primary" className="submitButton" htmlType="submit" loading={loading}>Submit</Button>
      <Button onClick={() => window.location.href = '/employees'}>Cancel</Button>
    </Form>
  );
};

export default EmployeeForm;
