import { useState, useEffect } from 'react';
import useProposalStore from '../../store/proposalStore';

const PricingQuote = () => {
  const { sectionData, updateSectionData } = useProposalStore();
  const pricingData = sectionData.pricing;

  const [formData, setFormData] = useState({
    pricePerFoot: pricingData.pricePerFoot || 7, // DEFAULT $7/ft
    linearFootage: pricingData.linearFootage || 0,
    taxRate: pricingData.taxRate || 8.25,
    additionalItems: pricingData.additionalItems || [],
  });

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  // Calculate totals
  const calculateTotals = () => {
    const basePrice = (formData.pricePerFoot || 0) * (formData.linearFootage || 0);
    const additionalTotal = formData.additionalItems.reduce(
      (sum, item) => sum + (parseFloat(item.price) || 0),
      0
    );
    const subtotal = basePrice + additionalTotal;
    const tax = subtotal * ((formData.taxRate || 0) / 100);
    const total = subtotal + tax;

    return {
      basePrice,
      additionalTotal,
      subtotal,
      tax,
      total,
    };
  };

  const totals = calculateTotals();

  // Save to store whenever formData changes
  useEffect(() => {
    updateSectionData('pricing', formData);
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    if (!newItemName || !newItemPrice) return;

    const newItem = {
      id: Date.now(),
      name: newItemName,
      price: parseFloat(newItemPrice),
    };

    setFormData((prev) => ({
      ...prev,
      additionalItems: [...prev.additionalItems, newItem],
    }));

    setNewItemName('');
    setNewItemPrice('');
  };

  const removeItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      additionalItems: prev.additionalItems.filter((item) => item.id !== id),
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value || 0);
  };

  return (
    <div className="space-y-6">
      {/* Base Pricing */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Base Pricing
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price per Linear Foot
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.pricePerFoot}
                onChange={(e) =>
                  handleChange('pricePerFoot', parseFloat(e.target.value) || 0)
                }
                className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Linear Footage
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={formData.linearFootage}
              onChange={(e) =>
                handleChange('linearFootage', parseFloat(e.target.value) || 0)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
              placeholder="e.g., 488"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Base Price:</span>
            <span className="text-2xl font-bold text-navy">
              {formatCurrency(totals.basePrice)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {formData.linearFootage} ft × ${formData.pricePerFoot} per ft
          </p>
        </div>
      </div>

      {/* Additional Items */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Additional Items
        </h3>

        {/* Existing Items */}
        {formData.additionalItems.length > 0 && (
          <div className="mb-4 space-y-2">
            {formData.additionalItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-3 rounded border border-gray-200"
              >
                <span className="text-gray-700">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-navy">
                    {formatCurrency(item.price)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Item */}
        <div className="grid grid-cols-12 gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item name"
            className="col-span-7 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
          />
          <div className="col-span-3 relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              placeholder="0.00"
              className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
            />
          </div>
          <button
            onClick={addItem}
            className="col-span-2 bg-navy text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Tax & Total */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Tax & Total
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={formData.taxRate}
            onChange={(e) =>
              handleChange('taxRate', parseFloat(e.target.value) || 0)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy focus:border-transparent"
          />
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-navy">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax ({formData.taxRate}%):</span>
              <span className="font-semibold">{formatCurrency(totals.tax)}</span>
            </div>
            <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-3xl font-bold text-navy">
                {formatCurrency(totals.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <strong>Pricing Summary:</strong> Base price of {formatCurrency(totals.basePrice)}
          {formData.additionalItems.length > 0 &&
            ` + ${formatCurrency(totals.additionalTotal)} in additional items`}
          {' '}+ {formatCurrency(totals.tax)} tax = {formatCurrency(totals.total)} total
        </p>
      </div>
    </div>
  );
};

export default PricingQuote;
