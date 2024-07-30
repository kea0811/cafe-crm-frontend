import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input, Button, Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCafeRequest, saveCafeRequest } from '../store/actions/cafeActions';

import '../styles/CafeForm.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(6, "Minimum 6 characters").max(10, "Maximum 10 characters"),
  description: Yup.string().max(256, "Maximum 256 characters"),
  location: Yup.string().required("Location is required")
});

const CafeForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [displayImage, setDisplayImage] = useState();
  const { cafe } = useSelector(state => state.cafe);
  const { control, handleSubmit, setValue, formState: { errors, isDirty }, watch } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
          name: '',
          description: '',
          location: ''
      }
  });

  const logo = watch('logo');

  // Fetch cafe details for editing
  useEffect(() => {
    if (id) {
      dispatch(fetchCafeRequest(id));
    }
  }, [id, dispatch]);

  // Prefill form when data is loaded
  useEffect(() => {
    if (cafe) {
      setValue('name', cafe.name);
      setValue('description', cafe.description);
      setValue('location', cafe.location);
      setValue('logo', cafe.logo);
    }
  }, [cafe, setValue]);

  const onSubmit = data => {
    dispatch(saveCafeRequest(data, id));
    window.location.href = '/cafes';
  };

  const handleFileChange = info => {
    if (info.file.status === 'removed') {
        URL.revokeObjectURL(logo); // Clean up the old URL
        setValue('logo', undefined);
    } else {
        const file = info.file.originFileObj;
        const fileUrl = URL.createObjectURL(file);
        setValue('logo', fileUrl); // Set URL to react-hook-form
    }
  };

  const onError = (errors) => {
    console.error('Form errors:', errors);
    message.error('Please correct the form errors and try again.');
  };

  return (
    <Form onFinish={handleSubmit(onSubmit, onError)} layout="vertical">
      <Form.Item label="Name" error={errors.name?.message}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Description" error={errors.description?.message}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>
      <Form.Item label="Logo" error={errors.logo?.message}>
        {
          logo ? (
            <div className="cafe-image-container">
              <img src={logo || displayImage} />
              <span onClick={() => handleFileChange({ file: { status: 'removed' } })} className="close-button">X</span>
            </div>
          ) : (
            <Controller
              name="logo"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          )
        }
        
      </Form.Item>
      <Form.Item label="Location" error={errors.location?.message}>
        <Controller
          name="location"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Button type="primary" className="submitButton" htmlType="submit">{id ? 'Update' : 'Submit'}</Button>
      <Button onClick={() => window.location.href = '/cafes'}>Cancel</Button>
    </Form>
  );
};

export default CafeForm;
