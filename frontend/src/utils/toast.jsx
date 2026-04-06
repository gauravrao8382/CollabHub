// src/utils/toast.js
import toast from 'react-hot-toast';

const toastStyles = {
  style: {
    background: '#1f2937',      // gray-800
    color: '#f3f4f6',           // gray-100
    border: '1px solid #374151', // gray-700
    borderRadius: '12px',
    padding: '14px 16px',
    fontSize: '14px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  },
  duration: 3000,
  position: 'top-right',
};

export const showSuccess = (message) => {
  toast.success(message, {
    ...toastStyles,
    icon: '🎉',
    style: { ...toastStyles.style, border: '1px solid #10b981' }, // emerald-500
  });
};

export const showError = (message) => {
  toast.error(message, {
    ...toastStyles,
    icon: '⚠️',
    style: { ...toastStyles.style, border: '1px solid #f43f5e' }, // rose-500
  });
};

export const showInfo = (message) => {
  toast(message, {
    ...toastStyles,
    icon: '💡',
    style: { ...toastStyles.style, border: '1px solid #3b82f6' }, // blue-500
  });
};

export const showLoading = (message) => {
  return toast.loading(message, {
    ...toastStyles,
    icon: '⏳',
    style: { ...toastStyles.style, border: '1px solid #8b5cf6' }, // violet-500
  });
};

export const updateToastSuccess = (toastId, message) => {
  toast.success(message, {
    id: toastId,
    ...toastStyles,
    icon: '✅',
    style: { ...toastStyles.style, border: '1px solid #10b981' },
  });
};

export const updateToastError = (toastId, message) => {
  toast.error(message, {
    id: toastId,
    ...toastStyles,
    icon: '❌',
    style: { ...toastStyles.style, border: '1px solid #f43f5e' },
  });
};