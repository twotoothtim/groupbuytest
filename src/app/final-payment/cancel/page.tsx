'use client';

export default function FinalPaymentCancelPage({ searchParams }: { searchParams: Record<string, string> }) {
  const depositId = searchParams.deposit_id || '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border rounded shadow p-8 max-w-md w-full text-center">
        <div className="text-red-600 mb-4 text-5xl">✕</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Final Payment Cancelled</h1>
        <p className="text-gray-700 mb-4">You didn't complete your final payment for deposit {depositId}.</p>

        <div className="bg-red-50 border rounded p-3 text-left mb-4 text-sm">
          <p><span className="font-medium">Note:</span></p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>If the buy closes before you pay, your deposit will be forfeited.</li>
            <li>Your order will not ship until final payment is received.</li>
          </ul>
        </div>

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
