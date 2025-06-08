"use client"
import * as React from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import { animate } from 'animejs';
import useLoggedInStore from '@/stores/logInOut-store';
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';
import Dialog from '../lib/Dialog';
import Footer from '../lib/Footer';
import Logo_Black from '../../../public/Logo_Black.png';

export default function SignIn() {
  const router = useRouter();
  const { logIn } = useLoggedInStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [dialog, setDialog] = React.useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    onConfirm: null
  });

  const formRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const inputRefs = React.useRef([]);
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    // Logo 入場動畫
    if (logoRef.current) {
      animate(logoRef.current, {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        ease: 'outElastic(1, .8)',
        delay: 200
      });
    }

    // 標題入場動畫
    if (titleRef.current) {
      animate(titleRef.current, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        ease: 'outQuart',
        delay: 400
      });
    }

    // 表單卡片入場動畫
    if (formRef.current) {
      animate(formRef.current, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        ease: 'outQuart',
        delay: 600
      });
    }

    // 輸入框依序入場
    const validInputs = inputRefs.current.filter(input => input !== null);
    if (validInputs.length > 0) {
      animate(validInputs, {
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 600,
        ease: 'outQuart',
        delay: (el, i) => 800 + (i * 100)
      });
    }

    // 按鈕入場動畫
    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        ease: 'outBack(1.7)',
        delay: 1200
      });
    }
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // 基本驗證
    if (!email || !password) {
      setIsLoading(false);
      showDialog('error', 'Input error', 'Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.SIGNIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password }),
      });

      const result = await response.json();

      if (!response.ok) {
        // 根據狀態碼顯示不同錯誤訊息
        let errorMessage = 'Login failed, please try again later';

        if (response.status === 401) {
          errorMessage = 'Account or password error, please re-enter';
        } else if (response.status === 404) {
          errorMessage = 'Account not found, please confirm the email is correct';
        } else if (response.status >= 500) {
          errorMessage = 'Server error, please try again later';
        } else if (result.message) {
          errorMessage = result.message;
        }

        throw new Error(errorMessage);
      }

      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result));
        logIn();  // 更新 Zustand 状态

        showDialog('success', 'Login success', 'Welcome back! Redirecting to your information page', () => {
          router.push('/info');
        });
      } else {
        throw new Error(result.message || 'Login failed, please try again');
      }
    } catch (error) {
      console.error('login error:', error);

      // 網路錯誤處理
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        showDialog('error', 'Network error', 'Unable to connect to the server, please check your network connection');
      } else {
        showDialog('error', 'Login failed', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 輸入框點擊動畫
  const handleInputFocus = (e) => {
    animate(e.currentTarget, {
      scale: [1, 1.02, 1],
      duration: 300,
      ease: 'outQuart'
    });
  };

  // 按鈕點擊動畫
  const handleButtonClick = (e) => {
    if (!isLoading) {
      animate(e.currentTarget, {
        scale: [1, 0.95, 1],
        duration: 200,
        ease: 'outQuart'
      });
    }
  };

  // Logo 點擊動畫
  const handleLogoClick = () => {
    if (logoRef.current) {
      animate(logoRef.current, {
        rotate: [0, 360],
        scale: [1, 1.1, 1],
        duration: 600,
        ease: 'outBack(1.7)'
      });
    }
  };

  return (
    <>
      <div className="page-container min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
        <div className="max-w-md mx-auto">

          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div
                ref={logoRef}
                className="relative cursor-pointer"
                onClick={handleLogoClick}
              >
                <div className="absolute inset-0 bg-peach-400/30 rounded-3xl blur-md"></div>
                <Image
                  src={Logo_Black}
                  alt="Logo"
                  className="relative h-16 w-16 rounded-3xl shadow-soft transition-transform duration-300 mx-auto"
                />
              </div>
            </Link>
          </div>

          {/* Title */}
          <div
            ref={titleRef}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-redwood-600 mb-2">
              Restaurant login
            </h1>
            <div className="w-16 h-1 bg-peach-500 rounded-full mx-auto"></div>
          </div>

          {/* Login Form */}
          <div
            ref={formRef}
            className="bento-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                  Email
                </label>
                <input
                  ref={el => inputRefs.current[0] = el}
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="off"
                  autoFocus
                  disabled={isLoading}
                  placeholder="Enter your email"
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-mountbatten_pink-700 mb-2">
                  Password
                </label>
                <input
                  ref={el => inputRefs.current[1] = el}
                  type="password"
                  id="password"
                  name="password"
                  required
                  autoComplete="new-password"
                  disabled={isLoading}
                  placeholder="Enter your password"
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-3 bg-white/80 border border-peach-200/60 rounded-capsule text-mountbatten_pink-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-peach-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Submit Button */}
              <button
                ref={buttonRef}
                type="submit"
                disabled={isLoading}
                onClick={handleButtonClick}
                className="w-full bg-peach-500 hover:bg-peach-600 disabled:bg-peach-300 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-capsule transition-all duration-300 shadow-medium hover:shadow-bento transform hover:scale-[1.02] cursor-pointer flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  'Click to login'
                )}
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <Link
                  href="/signup"
                  className="text-sm text-mountbatten_pink-600 hover:text-peach-600 transition-colors duration-300 cursor-pointer"
                >
                  want to be a restaurant that provides free meals? click here to register
                </Link>
              </div>

            </form>
          </div>

        </div>
      </div>

      <Footer />

      {/* Dialog */}
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