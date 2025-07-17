import { useState, useEffect } from "react";
import { transactionService } from "../utils/transactionService.js";
import { FileDown } from "lucide-react";

const TransactionsView = ({ toggleFetch }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page, toggleFetch]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const transactionsData = await transactionService.getTransactions(
        page,
        5
      );
      setTransactions(transactionsData);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      // !coverts timestamp to date
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const generatePDF = async () => {
    try {
      const printWindow = window.open("", "_blank"); // !opens a new window for dsispaying the report
      printWindow.document.write(`
            <html>
                <head>
                    <title>Transaction Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .header { margin-bottom: 30px; text-align: center; }
                        .title { font-size: 24px; font-weight: bold; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                        th { background: #f5f5f5; }
                        .amount { text-align: right; }
                        .timestamp { width: 200px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1 class="title">Transaction Report</h1>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Recipient ID</th>
                                <th>Transaction ID</th>
                                <th class="amount">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${transactions
                              .map(
                                (transaction) => `
                                <tr>
                                    <td class="timestamp">${formatDate(
                                      transaction.timestamp
                                    )}</td>
                                    <td>${transaction.type || "CASHBACK"}</td>
                                    <td>${
                                      transaction.type === "RECHARGE"
                                        ? "SELF"
                                        : transaction.recipientId || "N/A"
                                    }</td>
                                    <td>${transaction.id}</td>
                                    <td class="amount">${transaction.amount.toFixed(
                                      2
                                    )}</td>
                                </tr>
                            `
                              )
                              .join("")}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  return (
    <div className="p-4">
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
            <p>
              <strong>Date:</strong> {formatDate(selectedTransaction.timestamp)}
            </p>
            <p>
              <strong>Type:</strong> {selectedTransaction.type || "CASHBACK"}
            </p>
            <p>
              <strong>Sender ID:</strong> {selectedTransaction.senderId || ""}
            </p>
            <p>
              <strong>Receiver ID:</strong>{" "}
              {selectedTransaction.recipientId || ""}
            </p>
            <p>
              <strong>Transaction ID:</strong> {selectedTransaction.id}
            </p>
            <p>
              <strong>Amount:</strong> ₹{selectedTransaction.amount.toFixed(2)}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Transaction Dashboard
        </h1>
        <button
          onClick={generatePDF}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <FileDown className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border text-center sm:text-left">
          Your Transactions
        </h2>
        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse text-sm sm:text-base"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 10px",
            }}
          >
            <thead>
              <tr className="bg-gray-300 border-b">
                <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase">
                  User Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="border-4 hover:shadow-md hover:bg-gray-100 transform transition-transform hover:scale-100 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      {formatDate(transaction.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      {transaction.type || "CASHBACK"}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {transaction.senderUsername ||
                        transaction.recipientUsername ||
                        ""}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {transaction.type === "RECHARGE" ? (
                        <span className="text-green-600">
                          Recharged to Self
                        </span>
                      ) : transaction.senderUsername ? (
                        <span className="text-green-600">Received from</span>
                      ) : transaction.recipientUsername ? (
                        <span className="text-red-600">Sent to</span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {transaction.type === "TRANSFER" ? (
                        transaction.senderUsername ? (
                          <span className="text-green-600">
                            +₹{transaction.amount.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-red-600">
                            -₹{transaction.amount.toFixed(2)}
                          </span>
                        )
                      ) : transaction.type === "RECHARGE" ? (
                        <span className="text-green-600">
                          +₹{transaction.amount.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-blue-600">
                          ₹{transaction.amount.toFixed(2)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap justify-between items-center p-4 border-t gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
          <span className="text-center">Page {page + 1}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={transactions.length < 10}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;
