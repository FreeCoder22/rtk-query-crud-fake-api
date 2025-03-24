import type React from 'react';
import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { useCreateProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from '../../api/product/productApi';
import type { Product } from '../../api/model/Product';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: productUpdate } = useGetProductByIdQuery(id!, { skip: !id });
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (productUpdate) {
      form.setFieldsValue(productUpdate);
    }
  }, [productUpdate, form]);

  const handleFinish = async (values: Product) => {
    try {
      if (id) {
        await updateProduct({ ...values, id });
      } else {
        const newProduct = { ...values, id: uuidv4() };
        await createProduct(newProduct);
      }
      form.resetFields();
      navigate('/');
    } catch (error) {
      console.error('Failed to save the product:', error);
    }
  };

  return (
    <>
      <Button onClick={() => navigate(-1)}>Return</Button>
      <Form
        form={form}
        initialValues={form.getFieldsValue()}
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          label="Product Title"
          name="title"
          rules={[{ required: true, message: 'Please input the product title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: 'Please input the product price!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: 'Please input the product description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="category"
          rules={[{ required: true, message: 'Please input the product category!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Image URL"
          name="image"
          rules={[{ required: true, message: 'Please input the product image URL!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? 'Update Product' : 'Create Product'}
          </Button>
          <Button type="default" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductForm;