import { useEffect } from "react";

const TransactionEffects = ({ show, onFinish }) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        onFinish();
      }, 800);
    }
  }, [show, onFinish]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-medium">Processing your request...</p>
      </div>
    </div>
  );
};

export default TransactionEffects;
