import React from 'react';
import { animate } from 'animejs';

const Dialog = ({ isOpen, onClose, type = 'info', title, message, confirmText = 'OK', onConfirm }) => {
    const dialogRef = React.useRef(null);
    const overlayRef = React.useRef(null);

    React.useEffect(() => {
        if (isOpen && dialogRef.current && overlayRef.current) {
            // 背景遮罩淡入
            animate(overlayRef.current, {
                opacity: [0, 1],
                duration: 300,
                ease: 'outQuart'
            });

            // 對話框彈出動畫
            animate(dialogRef.current, {
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 400,
                ease: 'outBack(1.7)',
                delay: 100
            });
        }
    }, [isOpen]);

    const handleClose = () => {
        if (dialogRef.current && overlayRef.current) {
            // 對話框縮小動畫
            animate(dialogRef.current, {
                scale: [1, 0.8],
                opacity: [1, 0],
                duration: 300,
                ease: 'inQuart'
            });

            // 背景遮罩淡出
            animate(overlayRef.current, {
                opacity: [1, 0],
                duration: 300,
                ease: 'inQuart',
                complete: onClose
            });
        } else {
            onClose();
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        handleClose();
    };

    const handleButtonClick = (e) => {
        animate(e.currentTarget, {
            scale: [1, 0.95, 1],
            duration: 200,
            ease: 'outQuart'
        });
    };

    if (!isOpen) return null;

    // 根據類型設定樣式
    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return {
                    icon: '✅',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    buttonBg: 'bg-green-500 hover:bg-green-600',
                    borderColor: 'border-green-200'
                };
            case 'error':
                return {
                    icon: '❌',
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    buttonBg: 'bg-red-500 hover:bg-red-600',
                    borderColor: 'border-red-200'
                };
            case 'warning':
                return {
                    icon: '⚠️',
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
                    borderColor: 'border-yellow-200'
                };
            default:
                return {
                    icon: 'ℹ️',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    buttonBg: 'bg-blue-500 hover:bg-blue-600',
                    borderColor: 'border-blue-200'
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 背景遮罩 */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            ></div>

            {/* 對話框 */}
            <div
                ref={dialogRef}
                className={`relative bg-white/95 backdrop-blur-xl rounded-6xl p-8 shadow-bento border ${styles.borderColor} max-w-md w-full mx-4`}
            >
                {/* 圖示 */}
                <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${styles.iconBg} rounded-full mb-4`}>
                        <span className="text-2xl">{styles.icon}</span>
                    </div>

                    {/* 標題 */}
                    {title && (
                        <h3 className="text-xl font-bold text-redwood-600 mb-2">
                            {title}
                        </h3>
                    )}
                </div>

                {/* 訊息內容 */}
                <div className="text-center mb-8">
                    <p className="text-mountbatten_pink-700 leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* 按鈕 */}
                <div className="flex justify-center">
                    <button
                        onClick={(e) => {
                            handleButtonClick(e);
                            handleConfirm();
                        }}
                        className={`px-8 py-3 ${styles.buttonBg} text-white font-medium rounded-capsule transition-all duration-300 shadow-soft hover:shadow-medium cursor-pointer`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog; 