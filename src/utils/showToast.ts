import toast from "react-hot-toast";

const showToast = (message: string, type: 'error' | 'success' = 'error') => {
  toast[type](message, {
    duration: 4000,
    style: {
      background: type === 'error' ? '#FEE2E2' : '#DCFCE7',
      color: type === 'error' ? '#991B1B' : '#166534',
      border: `1px solid ${type === 'error' ? '#FCA5A5' : '#86EFAC'}`,
      padding: '16px',
      borderRadius: '8px',
    },
    icon: type === 'error' ? '❌' : '✅',
  });
};

export default showToast;
