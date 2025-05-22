import { useState, useEffect } from "react";
import axios from "../api/axios";

const networkOptions = {
  btc: ["Bitcoin Mainnet", "Lightning Network"],
  eth: ["Ethereum Mainnet", "Arbitrum", "Polygon"],
  usdt: ["Ethereum", "Tron", "BNB Smart Chain"],
  bnb: ["BNB Smart Chain", "BNB Beacon Chain"],
  xrp: ["Ripple Mainnet"],
};

const randomAddresses = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  eth: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
  usdt: "TYy2m7DdE2kUQABpLoByRmkiHBaXYGqF2R",
  bnb: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
  xrp: "rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh",
};

const formatCurrency = (value) => {
  const number = parseFloat(value.replace(/[^\d]/g, "")) / 100;
  if (isNaN(number)) return "";
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const CryptoTab = () => {
  // SEND crypto state
  const [sendCrypto, setSendCrypto] = useState("btc");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [cryptoBalance, setCryptoBalance] = useState(0);
  const [message, setMessage] = useState("");

  // RECEIVE crypto state
  const [receiveCrypto, setReceiveCrypto] = useState("btc");
  const [receiveNetwork, setReceiveNetwork] = useState("");

  useEffect(() => {
    const fetchCryptoBalance = async () => {
      try {
        const res = await axios.get(`/api/account/crypto-balance/${sendCrypto}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCryptoBalance(res.data.balance);
      } catch {
        setCryptoBalance(0);
      }
    };

    fetchCryptoBalance();
  }, [sendCrypto]);

  const handleSend = async (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount) / 100;

    if (numericAmount > cryptoBalance) {
      setMessage(
        `Insufficient ${sendCrypto.toUpperCase()} balance. Your current balance is ${cryptoBalance} ${sendCrypto.toUpperCase()}.`
      );
      return;
    }

    try {
      const res = await axios.post(
        "/api/account/send-crypto",
        { amount: numericAmount, crypto: sendCrypto, network, walletAddress },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage(res.data.message);
      setAmount("");
      setWalletAddress("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Crypto transaction failed");
    }
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setAmount(raw);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Crypto Transfer</h2>

      {/* Send Crypto */}
      <form onSubmit={handleSend} className="space-y-4">
        <select
          value={sendCrypto}
          onChange={(e) => {
            setSendCrypto(e.target.value);
            setNetwork("");
            setMessage("");
          }}
          className="w-full p-2 border rounded"
        >
          <option value="btc">Bitcoin (BTC)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="usdt">Tether (USDT)</option>
          <option value="bnb">Binance Coin (BNB)</option>
          <option value="xrp">Ripple (XRP)</option>
        </select>

        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Network</option>
          {networkOptions[sendCrypto]?.map((net, idx) => (
            <option key={idx} value={net}>
              {net}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Recipient Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          inputMode="numeric"
          placeholder="$0.00"
          value={formatCurrency(amount)}
          onChange={handleAmountChange}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">
          Send Crypto
        </button>

        <div className="text-sm text-gray-600 mt-2">
          Balance: {cryptoBalance} {sendCrypto.toUpperCase()}
        </div>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.includes("Insufficient") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      <hr className="my-6" />

      {/* Receive Crypto */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Receive Crypto</h3>
        <div className="space-y-4">
          <select
            value={receiveCrypto}
            onChange={(e) => {
              setReceiveCrypto(e.target.value);
              setReceiveNetwork("");
            }}
            className="w-full p-2 border rounded"
          >
            <option value="btc">Bitcoin (BTC)</option>
            <option value="eth">Ethereum (ETH)</option>
            <option value="usdt">Tether (USDT)</option>
            <option value="bnb">Binance Coin (BNB)</option>
            <option value="xrp">Ripple (XRP)</option>
          </select>

          <select
            value={receiveNetwork}
            onChange={(e) => setReceiveNetwork(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Network</option>
            {networkOptions[receiveCrypto]?.map((net, idx) => (
              <option key={idx} value={net}>
                {net}
              </option>
            ))}
          </select>

          {receiveNetwork && (
            <div className="bg-gray-100 p-4 rounded text-sm break-all">
              <p className="text-gray-700 font-medium mb-1">
                Your {receiveCrypto.toUpperCase()} Address:
              </p>
              <p>{randomAddresses[receiveCrypto]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoTab;
