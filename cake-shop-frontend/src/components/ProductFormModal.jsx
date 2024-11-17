import { useForm } from 'react-hook-form';
import { X, Loader } from 'lucide-react';

const ProductFormModal = ({ onClose, onSubmit, initialData, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      category: '',
      description: '',
      basePrice: '',
      sizes: [],
      flavors: [],
      customizable: false
    }
  });

  const categories = ['Birthday', 'Wedding', 'Custom', 'Cupcakes'];
  const availableSizes = ['Small', 'Medium', 'Large', 'Extra Large', '6 Pack', '12 Pack'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              {...register('name', { 
                required: 'Name is required',
                maxLength: {
                  value: 100,
                  message: 'Name must be less than 100 characters'
                }
              })}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category.message}</span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description', { 
                required: 'Description is required',
                maxLength: {
                  value: 500,
                  message: 'Description must be less than 500 characters'
                }
              })}
              rows={4}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          {/* Base Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register('basePrice', { 
                required: 'Base price is required',
                min: {
                  value: 0,
                  message: 'Price must be greater than 0'
                }
              })}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
            />
            {errors.basePrice && (
              <span className="text-red-500 text-sm">{errors.basePrice.message}</span>
            )}
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Sizes
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableSizes.map(size => (
                <label key={size} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={size}
                    {...register('sizes')}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Flavors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Flavors (comma-separated)
            </label>
            <input
              {...register('flavors')}
              placeholder="e.g., Vanilla, Chocolate, Strawberry"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
            />
          </div>

          {/* Customizable */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('customizable')}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span>Customizable</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 disabled:bg-pink-300 flex items-center"
            >
              {isLoading && <Loader className="animate-spin mr-2" size={20} />}
              {initialData ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;