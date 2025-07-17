import { useEffect, useState } from "react";
import { XCircle, X } from "lucide-react";

const ErrorToast = ({ error }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [error]);

  if (!error || !isVisible) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md animate-in fade-in duration-300 z-[100]">
      <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-lg p-4 pr-10 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close error message"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-start gap-3">
          <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 mb-1">
              Error Occurred
            </div>
            <div className="text-gray-600 break-words">{error}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorToast;
