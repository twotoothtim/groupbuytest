import { useEffect, useState } from 'react';

interface GroupBuyCardProps {
  id: string;
  name: string;
  product: string;
  unitPrice: number;
  kitsPerParticipant: number;
  minKitsRequired: number;
  currentCommitment: number;
  status: 'active' | 'closed';
  closeTimeMs: number;
}

export function GroupBuyCard({ 
  id, name, product, unitPrice, kitsPerParticipant, 
  minKitsRequired, currentCommitment, status, closeTimeMs 
}: GroupBuyCardProps) {
  const [countdown, setCountdown] = useState<string>('');

  // Countdown timer that updates every minute
  useEffect(() => {
    if (status !== 'active') return;

    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(now.getTime() + closeTimeMs);
      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCountdown('Closed');
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown(`${hours}h ${minutes}m remaining`);
    }, 60000);

    return () => clearInterval(interval);
  }, [status, closeTimeMs]);

  // Calculate tier price based on current commitment
  let effectivePrice = unitPrice;
  if (currentCommitment >= minKitsRequired) {
    effectivePrice = unitPrice * 0.95; // Example: 5% discount at minimum threshold
  }

  const shippingCost = kitsPerParticipant * 10;
  const totalWithDeposit = (kitsPerParticipant * effectivePrice) + shippingCost - 20;

  return (
    <div className="bg-white border rounded-lg shadow p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-indigo-700 font-semibold">Product: {product}</p>
        </div>
        <span 
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Pricing & Tiers */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <p className="text-sm text-gray-600 mb-1">Current Tier: {currentCommitment} kits committed</p>
        <p className="text-lg font-bold text-green-700">${effectivePrice.toFixed(2)} per kit</p>
      </div>

      {/* Progress bar toward next tier */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Next Tier: {minKitsRequired - currentCommitment} kits remaining</span>
        </div>
        <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
          <div 
            className="bg-indigo-600 h-full text-xs text-white flex items-center justify-center"
            style={{ width: `${Math.min(100, (currentCommitment / minKitsRequired) * 100)}%` }}
          >
            {((currentCommitment / minKitsRequired) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className={`text-center py-2 rounded mb-4 font-medium ${
        status === 'active' ? 'bg-yellow-50 text-yellow-800' : 'bg-red-100 text-red-900'
      }`}>
        {countdown}
      </div>

      {/* Payment Buttons */}
      <div className="flex flex-col gap-2">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded shadow">
          Pay $20 Deposit (Credit Card)
        </button>
        
        <button className="w-full border border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded flex items-center justify-center gap-2">
          💳 Crypto / Cash App
        </button>
      </div>

      {/* Pricing details */}
      <p className="text-xs text-gray-500 mt-4">
        Total: ${(kitsPerParticipant * effectivePrice + shippingCost).toFixed(2)} 
        (Deposit $20 credited) | Shipping: ${shippingCost.toFixed(2)}
      </p>

      {/* RUO notice */}
      <div className="mt-4 p-2 bg-red-50 text-red-800 text-xs rounded">
        ⚠️ RESEARCH USE ONLY — NOT FOR HUMAN CONSUMPTION. FINAL PAYMENT DUE WITHIN COUNTDOWN WINDOW.
      </div>
    </div>
  );
}
