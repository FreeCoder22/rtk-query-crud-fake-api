import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/product/productApi';
import { Button, List, Card } from 'antd';

const ProductList: React.FC = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: error</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <Button type="primary" onClick={() => navigate('/add')}>Add Product</Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={product => (
          <List.Item>
            <Card title={product.title}>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <Button onClick={() => navigate(`/product/${product.id}`)}>View</Button>
              <Button onClick={() => navigate(`/edit/${product.id}`)}>Edit</Button>
              <Button onClick={() => navigate(`/delete/${product.id}`)}>Delete</Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductList;