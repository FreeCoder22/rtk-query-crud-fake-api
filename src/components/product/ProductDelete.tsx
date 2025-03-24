import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProductMutation } from '../../api/product/productApi';
import { Modal } from 'antd';

const ProductDelete: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    await deleteProduct(id!);
    navigate('/');
  };

  return (
    <Modal
      title="Delete Product"
      visible={true}
      onOk={handleDelete}
      confirmLoading={isLoading}
      onCancel={() => navigate('/')}
    >
      <p>Are you sure you want to delete this product?</p>
    </Modal>
  );
};

export default ProductDelete;