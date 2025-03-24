import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../api/product/productApi';
import { Card, Spin } from 'antd';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id!);

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <div>Error fetching product details.</div>;
  }

  return (
    <Card title={product?.title}>
      <img src={product?.image} alt={product?.title} style={{ width: '100%' }} />
      <p>{product?.description}</p>
      <p>Price: ${product?.price}</p>
      <p>Category: {product?.category}</p>
    </Card>
  );
};

export default ProductDetail;