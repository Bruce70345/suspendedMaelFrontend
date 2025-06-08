'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { animate } from 'animejs';
import useProductStore from '@/stores/product-store';
import Dialog from '../lib/Dialog';

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
      className="bento-card p-6 hover:shadow-bento-hover transition-all duration-500 cursor-pointer"
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
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [initError, setInitError] = useState(null);
  const { products, fetchProducts, addProduct, updateProduct, deleteProduct, isLoading, error } = useProductStore();
  const [newProductName, setNewProductName] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState('');
  const [newProductExpiration, setNewProductExpiration] = useState('');
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    onConfirm: null
  });

  const titleRef = React.useRef(null);
  const addFormRef = React.useRef(null);

  const showDialog = (type, title, message, onConfirm = null) => {
    setDialog({
      isOpen: true,
      type,
      title,
      message,
      onConfirm
    });
  };

  const closeDialog = () => {
    setDialog(prev => ({ ...prev, isOpen: false }));
  };

  // 安全的用戶資料獲取
  const getUserData = useCallback(() => {
    try {
      const userDataString = localStorage.getItem('user');

      if (!userDataString) {
        throw new Error('No login information found');
      }

      const userData = JSON.parse(userDataString);

      if (!userData || !userData.user || !userData.user.userId) {
        throw new Error('Login information format error');
      }

      return userData.user;
    } catch (error) {
      console.error('Failed to get user data:', error);
      throw new Error('Failed to get user information, please sign in again');
    }
  }, []);

  useEffect(() => {
    try {
      const user = getUserData();
      setUserInfo(user);
      setUserId(user.userId);
      fetchProducts(user.userId);
    } catch (error) {
      setInitError(error.message);
      showDialog('error', 'Login error', error.message, () => {
        // 清除本地儲存並跳轉到登入頁面
        localStorage.removeItem('user');
        router.push('/signin');
      });
    }
  }, [fetchProducts, getUserData, router]);

  // 初始動畫效果
  React.useEffect(() => {
    if (initError) return; // 如果有初始化錯誤，不執行動畫

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
  }, [initError]);

  // 表單驗證
  const validateProductForm = () => {
    if (!newProductName.trim()) {
      return 'Please enter a product name';
    }
    if (!newProductQuantity || parseInt(newProductQuantity) <= 0) {
      return 'Please enter a valid quantity (greater than 0)';
    }
    if (!newProductExpiration) {
      return 'Please select the campaign expiration date';
    }

    const expirationDate = new Date(newProductExpiration);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (expirationDate < today) {
      return 'Expiration date cannot be earlier than today';
    }

    return null;
  };

  // 使用 useCallback 避免子組件重新渲染
  const handleAddProduct = useCallback(() => {
    const validationError = validateProductForm();
    if (validationError) {
      showDialog('error', 'Input error', validationError);
      return;
    }

    try {
      const newProduct = {
        userId,
        productName: newProductName.trim(),
        dailyQuantity: parseInt(newProductQuantity, 10),
        campaignExpiration: new Date(newProductExpiration).toISOString(),
      };

      addProduct(userId, newProduct);
      setNewProductName('');
      setNewProductQuantity('');
      setNewProductExpiration('');

      showDialog('success', 'Add success', 'Product added successfully!');
    } catch (error) {
      showDialog('error', 'Add failed', 'Error adding product, please try again later');
    }
  }, [userId, newProductName, newProductQuantity, newProductExpiration, addProduct]);

  const handleIncrementProduct = useCallback((productId, currentQuantity) => {
    try {
      const updatedFields = {
        dailyQuantity: currentQuantity + 1,
      };
      updateProduct(userId, productId, updatedFields);
    } catch (error) {
      showDialog('error', 'Update failed', 'Error updating product quantity');
    }
  }, [userId, updateProduct]);

  const handleDecrementProduct = useCallback((productId, currentQuantity) => {
    if (currentQuantity > 0) {
      try {
        const updatedFields = {
          dailyQuantity: currentQuantity - 1,
        };
        updateProduct(userId, productId, updatedFields);
      } catch (error) {
        showDialog('error', 'Update failed', 'Error updating product quantity');
      }
    } else {
      showDialog('warning', 'Cannot decrease', 'Quantity is already 0, cannot decrease further');
    }
  }, [userId, updateProduct]);

  const handleDeleteProduct = useCallback((productId) => {
    showDialog('warning', 'Confirm delete', 'Are you sure you want to delete this product? This action cannot be undone', () => {
      try {
        deleteProduct(userId, productId);
        showDialog('success', 'Delete success', 'Product deleted successfully');
      } catch (error) {
        showDialog('error', 'Delete failed', 'Error deleting product');
      }
    });
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

  // 如果有初始化錯誤，顯示錯誤頁面
  if (initError) {
    return (
      <>
        <div className="page-container min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="bg-red-50 rounded-6xl p-8 shadow-bento border border-red-200">
                <div className="text-center">
                  <div className="text-red-600 font-medium mb-4">Login status abnormal</div>
                  <div className="text-red-500 text-sm">{initError}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          isOpen={dialog.isOpen}
          onClose={closeDialog}
          type={dialog.type}
          title={dialog.title}
          message={dialog.message}
          onConfirm={dialog.onConfirm}
        />
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="page-container min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
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
      <>
        <div className="page-container min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="bg-red-50 rounded-6xl p-8 shadow-bento border border-red-200">
                <div className="text-center">
                  <div className="text-red-600 font-medium mb-4">Error loading product data</div>
                  <div className="text-red-500 text-sm mb-4">{error}</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-capsule transition-colors duration-300"
                  >
                    Reload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          isOpen={dialog.isOpen}
          onClose={closeDialog}
          type={dialog.type}
          title={dialog.title}
          message={dialog.message}
          onConfirm={dialog.onConfirm}
        />
      </>
    );
  }

  return (
    <>
      <div className="page-container min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
        <div className="max-w-4xl mx-auto">

          {/* Page Title */}
          <div
            ref={titleRef}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-redwood-600 mb-4">
              Product Management
            </h1>
            {userInfo && (
              <p className="text-mountbatten_pink-600 mb-4">
                Welcome back, {userInfo.name || userInfo.email}!
              </p>
            )}
            <div className="w-24 h-1 bg-peach-500 rounded-full mx-auto"></div>
          </div>

          {/* Add New Product Form */}
          <div
            ref={addFormRef}
            className="bento-card p-8 mb-8"
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
                    min="1"
                    placeholder="Enter quantity"
                    value={newProductQuantity}
                    onChange={(e) => setNewProductQuantity(e.target.value)}
                    onFocus={handleInputFocus}
                    className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-mountbatten_pink-600 focus:outline-none focus:ring-2 focus:ring-peach-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="productExpiration" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                    Campaign expiration
                  </label>
                  <input
                    id="productExpiration"
                    type="date"
                    value={newProductExpiration}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewProductExpiration(e.target.value)}
                    onFocus={handleInputFocus}
                    className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-mountbatten_pink-600 focus:outline-none focus:ring-2 focus:ring-peach-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={(e) => {
                    handleButtonClick(e);
                    handleAddProduct();
                  }}
                  disabled={!newProductName || !newProductQuantity || !newProductExpiration}
                  className="bg-peach-500 hover:bg-peach-600 disabled:bg-mountbatten_pink-300 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-capsule transition-all duration-300 shadow-soft hover:shadow-medium cursor-pointer"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="bg-white/90 backdrop-blur-md rounded-6xl p-8 shadow-soft border border-desert_sand-200/40">
                <div className="text-mountbatten_pink-600 text-lg mb-4">
                  No products yet
                </div>
                <div className="text-mountbatten_pink-500 text-sm">
                  Use the form above to add your first product
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Dialog */}
      <Dialog
        isOpen={dialog.isOpen}
        onClose={closeDialog}
        type={dialog.type}
        title={dialog.title}
        message={dialog.message}
        onConfirm={dialog.onConfirm}
        confirmText={dialog.type === 'warning' ? 'Confirm' : 'OK'}
      />
    </>
  );
};

export default Info;