'use client';

import { useState } from 'react';

export default function CryptoPaymentPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState<'solana' | 'ethereum'>('solana');
  const [amountUsdc, setAmountUsdc] = useState('20.00');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border rounded shadow p-8 max-w-md w-full text-left">
        <h1 className="text-xl font-bold mb-4 text-gray-900">Pay with Crypto (USDC)</h1>

        <p className="text-sm text-gray-600 mb-4">
          Send USDC to our wallet. We will manually credit your deposit once we verify the transaction on-chain.
        </p>

        {/* Network selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Network</label>
          <select 
            value={network}
            onChange={(e) => setNetwork(e.target.value as 'solana' | 'ethereum')}
            className="w-full border rounded px-3 py-2"
          >
            <option value="solana">Solana (USDC on Solana)</option>
            <option value="ethereum">Ethereum (ERC20 USDC)</option>
          </select>
        </div>

        {/* Wallet address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Wallet Address</label>
          <input 
            type="text" 
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your wallet address (optional for now)"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USDC)</label>
          <input 
            type="number" 
            value={amountUsdc}
            onChange={(e) => setAmountUsdc(e.target.value)}
            placeholder="20.00"
            className="w-full border rounded px-3 py-2 text-sm font-semibold text-indigo-700"
          />
        </div>

        {/* Wallet address to send to */}
        <div className="mb-6 p-3 bg-gray-100 rounded">
          <p className="text-xs text-gray-500 mb-1">Send this amount to:</p>
          <code className="block break-all text-sm font-mono">{process.env.NEXT_PUBLIC_CRYPTOWALLET_ADDRESS || 'Wallet address not configured'}</code>
        </div>

        {/* Submit */}
        <button 
          onClick={() => {
            // In production, save walletAddress + amountUsdc to crypto_payments table
            console.log('Processing crypto payment...');
          }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded shadow"
        >
          I&apos;ve Sent the Payment — Confirm & Continue
        </button>

        {/* Fallback options */}
        <div className="mt-4 flex gap-2">
          <a 
            href={`https://cash.app/?$${process.env.NEXT_PUBLIC_CASHAPP_CASHTAG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded text-center flex items-center justify-center gap-2"
          >
            💵 Pay with Cash App ({process.env.NEXT_PUBLIC_CASHAPP_CASHTAG || 'your-cashtag'})
          </a>

          <button 
            onClick={() => window.location.href = '/'}
            className="flex-1 border border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded"
          >
            ← Back
          </button>
        </div>

        {/* RUO notice */}
        <p className="text-xs text-red-600 mt-4">
          ⚠️ RESEARCH USE ONLY — NOT FOR HUMAN CONSUMPTION. MANUAL CREDIT PROCESS MAY DELAY 2–24h.
        </p>
      </div>
    </div>
  );
}
