'use client';

export default function FinalPaymentSuccessPage({ searchParams }: { searchParams: Record<string, string> }) {
  const sessionId = searchParams.session_id || '';
  const depositId = searchParams.deposit_id || '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border rounded shadow p-8 max-w-md w-full text-center">
        <div className="text-green-600 mb-4 text-5xl">✓</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Final Payment Complete!</h1>
        <p className="text-gray-700 mb-4">Your order is now confirmed and will ship once the buy closes.</p>

        <div className="bg-indigo-50 border rounded p-3 text-left mb-4 text-sm">
          <p><span className="font-medium">Deposit ID:</span> {depositId}</p>
          <p><span className="font-medium">Total Paid (including deposit):</span> $130.00</p>
          <p><span className="font-medium">Shipping:</span> $10.00 flat fee</p>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          You will receive an email with shipping instructions once the order ships.
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
