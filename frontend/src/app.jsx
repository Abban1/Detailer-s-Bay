
import { useState } from 'react';
import axios from 'axios';

function App() {
  const initialProduct = {
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  };

  const [product, setProduct] = useState(initialProduct);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: value,
    }));
  };

  // Send product data to Express backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/products',
        {
          ...product,
          price: Number(product.price),
          quantity: Number(product.quantity),
        }
      );

      console.log('Backend response:', response.data);

      setMessage(response.data.message || 'Product added successfully!');

      setProduct({ ...initialProduct });
    } catch (err) {
      console.error(
        'Error adding product:',
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          'Failed to add product. Make sure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Clear the form
  const handleClear = () => {
    setProduct({ ...initialProduct });
    setMessage('');
    setError('');
  };

  return (
    <div className="container mt-5 mb-5">
      <h2>Add Product</h2>
      <p>Enter product details below.</p>

      {message && (
        <div className="alert alert-success" role="status">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>

          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>

          <select
            className="form-select"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Car Wash">Car Wash</option>
            <option value="Polish">Polish</option>
            <option value="Wax">Wax</option>
            <option value="Accessories">Accessories</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>

          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Enter price"
            min="0"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>

          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            placeholder="Enter quantity"
            min="0"
            step="1"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClear}
          disabled={loading}
        >
          Clear
        </button>
      </form>
    </div>
  );
}

export default App;
