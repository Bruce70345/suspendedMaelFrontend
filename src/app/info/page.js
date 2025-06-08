'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { animate } from 'animejs';
import useProductStore from '@/stores/product-store';

// 產品卡片組件 - 使用 memo 避免不必要的重新渲染
const ProductCard = React.memo(({ product, index, userId, onIncrement, onDecrement, onDelete, onCardClick, onButtonClick }) => {
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    if (cardRef.current) {
      animate(cardRef.current, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 600,
        ease: 'outQuart',
        delay: 600 + (index * 100)
      });
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-white/95 backdrop-blur-xl rounded-6xl p-6 shadow-bento border border-desert_sand-200/40 hover:shadow-bento-hover transition-all duration-500 cursor-pointer"
      onClick={onCardClick}
    >
      <div className="relative">
        <h3 className="text-xl font-bold text-redwood-600 mb-4">{product.productName}</h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-mountbatten_pink-600 text-sm">Supply quantity:</span>
            <span className="text-peach-600 font-semibold text-lg">{product.dailyQuantity}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-mountbatten_pink-600 text-sm">Campaign expiration:</span>
            <span className="text-mountbatten_pink-700 font-medium">
              {new Date(product.campaignExpiration).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick(e);
              onIncrement(product._id, product.dailyQuantity);
            }}
            disabled={!userId}
            className="bg-light_coral-500 hover:bg-light_coral-600 disabled:bg-mountbatten_pink-300 text-white font-medium py-2 px-4 rounded-capsule transition-all duration-300 shadow-soft hover:shadow-medium cursor-pointer disabled:cursor-not-allowed"
          >
            + 1
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick(e);
              onDecrement(product._id, product.dailyQuantity);
            }}
            disabled={!userId}
            className="bg-old_rose-500 hover:bg-old_rose-600 disabled:bg-mountbatten_pink-300 text-white font-medium py-2 px-4 rounded-capsule transition-all duration-300 shadow-soft hover:shadow-medium cursor-pointer disabled:cursor-not-allowed"
          >
            - 1
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick(e);
              onDelete(product._id);
            }}
            disabled={!userId}
            className="bg-redwood-500 hover:bg-redwood-600 disabled:bg-mountbatten_pink-300 text-white font-medium py-2 px-4 rounded-capsule transition-all duration-300 shadow-soft hover:shadow-medium cursor-pointer disabled:cursor-not-allowed border border-redwood-400"
          >
            Delete item
          </button>
        </div>

      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

const Info = () => {
  const [userId, setUserId] = useState(null);
  const { products, fetchProducts, addProduct, updateProduct, deleteProduct, isLoading, error } = useProductStore();
  const [newProductName, setNewProductName] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState('');
  const [newProductExpiration, setNewProductExpiration] = useState('');

  const titleRef = React.useRef(null);
  const addFormRef = React.useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')).user;
    if (user) {
      setUserId(user.userId);
      fetchProducts(user.userId);
    } else {
      console.log("noooo")
    }
  }, [fetchProducts]);

  // 初始動畫效果
  React.useEffect(() => {
    // 標題入場動畫
    if (titleRef.current) {
      animate(titleRef.current, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        ease: 'outQuart',
        delay: 200
      });
    }

    // 新增表單入場動畫
    if (addFormRef.current) {
      animate(addFormRef.current, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        ease: 'outQuart',
        delay: 400
      });
    }
  }, []);

  // 使用 useCallback 避免子組件重新渲染
  const handleAddProduct = useCallback(() => {
    const newProduct = {
      userId,
      productName: newProductName,
      dailyQuantity: parseInt(newProductQuantity, 10),
      campaignExpiration: new Date(newProductExpiration).toISOString(),
    };
    addProduct(userId, newProduct);
    setNewProductName('');
    setNewProductQuantity('');
    setNewProductExpiration('');
  }, [userId, newProductName, newProductQuantity, newProductExpiration, addProduct]);

  const handleIncrementProduct = useCallback((productId, currentQuantity) => {
    const updatedFields = {
      dailyQuantity: currentQuantity + 1,
    };
    updateProduct(userId, productId, updatedFields);
  }, [userId, updateProduct]);

  const handleDecrementProduct = useCallback((productId, currentQuantity) => {
    if (currentQuantity > 0) {
      const updatedFields = {
        dailyQuantity: currentQuantity - 1,
      };
      updateProduct(userId, productId, updatedFields);
    }
  }, [userId, updateProduct]);

  const handleDeleteProduct = useCallback((productId) => {
    deleteProduct(userId, productId);
  }, [userId, deleteProduct]);

  // 按鈕點擊動畫
  const handleButtonClick = useCallback((e) => {
    animate(e.currentTarget, {
      scale: [1, 0.95, 1],
      duration: 200,
      ease: 'outQuart'
    });
  }, []);

  // 卡片點擊動畫
  const handleCardClick = useCallback((e) => {
    animate(e.currentTarget, {
      scale: [1, 0.98, 1],
      duration: 200,
      ease: 'outQuart'
    });
  }, []);

  // 輸入框聚焦動畫
  const handleInputFocus = useCallback((e) => {
    animate(e.currentTarget, {
      scale: [1, 1.02, 1],
      duration: 300,
      ease: 'outQuart'
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="bg-white/90 backdrop-blur-md rounded-capsule px-8 py-6 shadow-soft">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 border-2 border-peach-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-mountbatten_pink-700 font-medium">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="bg-red-50 rounded-6xl p-8 shadow-bento border border-red-200">
              <div className="text-center">
                <div className="text-red-600 font-medium">Error: {error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Page Title */}
        <div
          ref={titleRef}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-redwood-600 mb-4">
            Product Management
          </h1>
          <div className="w-24 h-1 bg-peach-500 rounded-full mx-auto"></div>
        </div>

        {/* Add New Product Form */}
        <div
          ref={addFormRef}
          className="bg-white/95 backdrop-blur-xl rounded-6xl p-8 shadow-bento border border-desert_sand-200/40 mb-8"
          onClick={handleCardClick}
        >
          <div className="relative">
            <h2 className="text-2xl font-bold text-peach-600 mb-6">Add a new product</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                  Supply product name
                </label>
                <input
                  id="productName"
                  type="text"
                  placeholder="Enter product name"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-mountbatten_pink-600 focus:outline-none focus:ring-2 focus:ring-peach-400 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="productQuantity" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                  Daily supply quantity
                </label>
                <input
                  id="productQuantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={newProductQuantity}
                  onChange={(e) => setNewProductQuantity(e.target.value)}
                  onFocus={handleInputFocus}
                  style={{
                    '--placeholder-color': '#9ca3af'
                  }}
                  className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-mountbatten_pink-600 focus:outline-none focus:ring-2 focus:ring-peach-400 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="productExpiration" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                  Campaign expiration date
                </label>
                <input
                  id="productExpiration"
                  type="date"
                  value={newProductExpiration}
                  onChange={(e) => setNewProductExpiration(e.target.value)}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-mountbatten_pink-600 focus:outline-none focus:ring-2 focus:ring-peach-400 focus:border-transparent transition-all duration-300 [&::-webkit-datetime-edit-text]:text-gray-400 [&::-webkit-datetime-edit-month-field]:text-mountbatten_pink-600 [&::-webkit-datetime-edit-day-field]:text-mountbatten_pink-600 [&::-webkit-datetime-edit-year-field]:text-mountbatten_pink-600"
                />
              </div>
            </div>

            <button
              onClick={(e) => {
                handleButtonClick(e);
                handleAddProduct();
              }}
              disabled={!userId}
              className="bg-peach-500 hover:bg-peach-600 disabled:bg-mountbatten_pink-300 text-white font-medium py-3 px-8 rounded-capsule transition-all duration-300 shadow-medium hover:shadow-bento transform hover:scale-[1.02] cursor-pointer disabled:cursor-not-allowed"
            >
              新增
            </button>


          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
              userId={userId}
              onIncrement={handleIncrementProduct}
              onDecrement={handleDecrementProduct}
              onDelete={handleDeleteProduct}
              onCardClick={handleCardClick}
              onButtonClick={handleButtonClick}
            />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/95 backdrop-blur-xl rounded-6xl p-12 shadow-bento border border-desert_sand-200/40">
              <div className="text-mountbatten_pink-600 text-lg font-medium">
                No products added yet. Add your first product above!
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Info;