import { useState, useEffect } from "react";
import { walletService } from "../utils/walletService.js";
import { isAuthenticated } from "../utils/authService.js";
import TransactionEffects from "./TransitionEffect.jsx";
import ErrorToast from "./ErrorMessage.jsx";
import Dropdown from "./DropDown.jsx";
import { fetchSuggestions } from "../utils/autoSuggest.js";
import WalletLogo from "../../media/images/preloader.png";

const BalanceCard = ({ onCompleteFetch }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false); // if app is performing any  operation or not
  const [error, setError] = useState("");
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openRecharge, setOpenRecharge] = useState(false);
  const [amount, setAmount] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // if any transaction is going or not
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchBalance();
    }
  }, []);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const data = await walletService.getBalance();
      setBalance(data);
      onCompleteFetch();
    } catch (err) {
      setError("Failed to fetch balance: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (query.length > 0) {
      //means user has started typing something
      setFetchingSuggestions(true); //show loading spinner , wont b displayed of api load is very light
      timeoutId = setTimeout(async () => {
        const results = await fetchSuggestions(query);
        setSuggestions(results);
        setFetchingSuggestions(false); //loading has been completed
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => clearTimeout(timeoutId); // returning a clearTimeout , u cancel the operation going on [timeoutId]
  }, [query]);

  const showSuccessAnimation = () => {
    setTransactionComplete(true);
    setTimeout(() => {
      setTransactionComplete(false);
    }, 5000);
  };

  const handleTransfer = async () => {
    if (!amount || !recipientUsername) {
      setError("Please fill all fields");
      return;
    }
    if (amount <= 0) {
      setError("Amount should be greater than 0");
      return;
    }

    try {
      setLoading(true);
      setOpenTransfer(false);
      setIsProcessing(true);
      await walletService.transferMoney(recipientUsername, parseFloat(amount));
      await fetchBalance();
      setError("");
      resetForm();
    } catch (err) {
      setError("Transfer failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecharge = async () => {
    if (!amount) {
      setError("Please enter an amount");
      return;
    }
    if (amount <= 0) {
      setError("Amount should be greater than 0");
      return;
    }

    try {
      setLoading(true);
      setOpenRecharge(false);
      setIsProcessing(true);
      await walletService.rechargeWallet(parseFloat(amount));
      await fetchBalance();
      setError("");
      resetForm();
    } catch (err) {
      setError("Recharge failed: " + err.message);
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAmount("");
    setRecipientUsername("");
  };

  return (
    <div className="w-full max-w-[33rem] mx-auto h-auto sm:h-[16rem] bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 text-white flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <img src={WalletLogo} className="w-8" alt="Tuple Paisa Wallet" />
        </div>

        <div className="flex">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#eb001b] opacity-90"></div>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#f79e1b] opacity-90 -ml-3 sm:-ml-4"></div>
        </div>
      </div>
      <div className="text-center flex-grow flex flex-col justify-center">
        <p className="text-xs sm:text-sm text-white/80 mb-1 sm:mb-2 font-extrabold">
          Available Balance
        </p>
        <div className="text-2xl sm:text-4xl font-bold tracking-wider">
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <span>₹{balance.toLocaleString()}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-4">
        <button
          onClick={() => setOpenTransfer(true)}
          className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-600 py-2 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg transition-all duration-200 font-medium text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          Transfer
        </button>
        <button
          onClick={() => setOpenRecharge(true)}
          className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-600 py-2 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg transition-all duration-200 font-medium text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Recharge
        </button>
      </div>
      {openTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden mx-4">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-4">
              <h2 className="text-white text-lg sm:text-xl font-semibold">
                Transfer Money
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <Dropdown
                    value={recipientUsername}
                    onChange={(newValue) => setRecipientUsername(newValue)}
                    options={suggestions}
                    onInputChange={(value) => setQuery(value)}
                    loading={fetchingSuggestions}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-gray-500 text-sm sm:text-base">
                      ₹
                    </span>
                    <style>
                      {`
                        input::-webkit-outer-spin-button,
                        input::-webkit-inner-spin-button {
                         -webkit-appearance: none;
                          margin: 0;
                         }
                                        
                          input[type=number] {
                          -moz-appearance: textfield; 
                         }
                     `}
                    </style>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base "
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setOpenTransfer(false)}
                  className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransfer}
                  disabled={loading || !recipientUsername || amount <= 0}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-xs sm:text-sm"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  ) : (
                    "Transfer"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openRecharge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden mx-4">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-4">
              <h2 className="text-white text-lg sm:text-xl font-semibold">
                Recharge Wallet
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-gray-500 text-sm sm:text-base">
                    ₹
                  </span>
                  <style>
                    {`
                      input::-webkit-outer-spin-button,
                      input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                      }
                      
                      input[type=number] {
                        -moz-appearance: textfield; /* Firefox */
                      }
                    `}
                  </style>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <div className="mt-4 sm:mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setOpenRecharge(false)}
                  className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRecharge}
                  disabled={loading || amount <= 0}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-xs sm:text-sm"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  ) : (
                    "Recharge"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <ErrorToast error={error} />}
      {transactionComplete && !error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-6 sm:p-8 text-center text-white max-w-md w-full mx-4">
            <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">🎉</div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
              Transaction Completed!
            </h2>
            <p className="text-xs sm:text-base mb-4 sm:mb-6 opacity-90">
              Enjoy your rewards and cashback with a smile!
            </p>

            <button
              onClick={() => setTransactionComplete(false)}
              className="px-4 py-2 sm:px-6 sm:py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <TransactionEffects
        show={isProcessing}
        onFinish={() => {
          setIsProcessing(false);
          showSuccessAnimation();
        }}
      />
    </div>
  );
};

export default BalanceCard;
