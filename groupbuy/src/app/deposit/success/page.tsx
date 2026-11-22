'use client';

export default function DepositSuccessPage({ searchParams }: { searchParams: Record<string, string> }) {
  const sessionId = searchParams.session_id || '';
  const buyId = searchParams.buy_id || '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border rounded shadow p-8 max-w-md w-full text-center">
        <div className="text-green-600 mb-4 text-5xl">✓</div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Deposit Paid Successfully!</h1>
        <p className="text-gray-700 mb-4">Your $20 deposit has been recorded for the {buyId} group buy.</p>

        <div className="bg-indigo-50 border rounded p-3 text-left mb-4 text-sm">
          <p><span className="font-medium">Buy:</span> {buyId}</p>
          <p><span className="font-medium">Total due (before shipping):</span> $120.00</p>
          <p><span className="font-medium">Deposit credited:</span> -$20.00</p>
          <p><span className="font-medium">Shipping:</span> +$10.00</p>
          <p className="mt-2 font-semibold text-gray-800">Balance due: $110.00</p>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          Final payment is due within the countdown window shown on your dashboard.
        </p>

        <button 
          onClick={() => window.location.href = '/'}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded shadow w-full"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
