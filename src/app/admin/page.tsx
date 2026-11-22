'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'buys' | 'participants'>('buys');

  // Example active group buys (normally fetched from DB)
  const [buys, setBuys] = useState([
    { id: 'buy-001', name: 'Retatrutide Open Buy', status: 'active', participants: 7, kitsCommitted: 8 },
    { id: 'buy-002', name: 'Semaglutide Research Buy', status: 'active', participants: 6, kitsCommitted: 5 },
  ]);

  // Example participant data for a single buy (normally fetched per buy)
  const [selectedBuy, setSelectedBuy] = useState(buys[0]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-900 text-white px-4 py-6 shadow">
        <h1 className="text-2xl font-bold">Admin Panel — Research Group Buy</h1>
        <p className="text-sm opacity-80 mt-1">Manage group buys, deposits, final payments, and shipments.</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-indigo-800 px-4 py-2 flex gap-4 border-b border-indigo-700">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'buys' ? 'text-white bg-indigo-900' : 'text-gray-300 hover:text-white'}`}
          onClick={() => setActiveTab('buys')}
        >
          Active Buys
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'participants' ? 'text-white bg-indigo-900' : 'text-gray-300 hover:text-white'}`}
          onClick={() => setActiveTab('participants')}
        >
          Participants & Payments
        </button>
      </nav>

      <main className="max-w-6xl mx-auto p-4 mt-4">
        {activeTab === 'buys' && (
          <>
            {/* Create New Buy */}
            <section className="bg-white border rounded shadow mb-6 p-6">
              <h2 className="text-xl font-bold mb-3 text-gray-800">Create / Edit Group Buy</h2>
              <form className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buy Name</label>
                  <input type="text" placeholder="e.g., Retatrutide Open Buy" className="w-full border rounded px-3 py-2" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product (Peptide)</label>
                  <input type="text" placeholder="e.g., Retatrutide" className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fulfillment Mode</label>
                  <select className="w-full border rounded px-3 py-2">
                    <option value="direct">Direct Fulfillment (ship to participant)</option>
                    <option value="collection">Collection by Admin (test then distribute)</option>
                  </select>
                </div>

                {selectedBuy?.fulfillmentMode === 'collection' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Collection Address</label>
                    <input type="text" placeholder="Address where kits will be held for pickup/distribution" className="w-full border rounded px-3 py-2" />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price per Kit</label>
                  <input type="number" placeholder="e.g., 120.00" className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Cost per Person</label>
                  <input type="number" placeholder="e.g., 10.00" defaultValue="10.00" className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Countdown Window (hours)</label>
                  <input type="number" defaultValue="24" placeholder="e.g., 24 for 24h final payment window" className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Kits Required</label>
                  <input type="number" defaultValue="50" placeholder="e.g., 50 kits to unlock best tier" className="w-full border rounded px-3 py-2" />
                </div>

                {/* Tier Thresholds */}
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-700 mb-2">Pricing Tiers (Total Kits → Price per Kit)</h3>
                  <table className="w-full border-collapse border bg-gray-50 rounded">
                    <thead>
                      <tr className="bg-indigo-100">
                        <th className="border px-3 py-2 text-left">Min Total Kits</th>
                        <th className="border px-3 py-2 text-left">Price per Kit</th>
                        <th className="border px-3 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-3 py-2">1–9 kits</td>
                        <td className="border px-3 py-2">$<input type="number" defaultValue={120} className="w-24 border rounded p-1" /></td>
                        <td className="border px-3 py-2 text-center"><button type="button" className="bg-red-600 text-white rounded px-2">X</button></td>
                      </tr>
                      <tr>
                        <td className="border px-3 py-2">10–24 kits</td>
                        <td className="border px-3 py-2">$<input type="number" defaultValue={115} className="w-24 border rounded p-1" /></td>
                        <td className="border px-3 py-2 text-center"><button type="button" className="bg-red-600 text-white rounded px-2">X</button></td>
                      </tr>
                      <tr>
                        <td className="border px-3 py-2">25–49 kits</td>
                        <td className="border px-3 py-2">$<input type="number" defaultValue={110} className="w-24 border rounded p-1" /></td>
                        <td className="border px-3 py-2 text-center"><button type="button" className="bg-red-600 text-white rounded px-2">X</button></td>
                      </tr>
                      <tr>
                        <td className="border px-3 py-2">50+ kits</td>
                        <td className="border px-3 py-2">$<input type="number" defaultValue={108} className="w-24 border rounded p-1" /></td>
                        <td className="border px-3 py-2 text-center"><button type="button" className="bg-red-600 text-white rounded px-2">X</button></td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 mt-1">Edit thresholds/prices or remove rows as needed.</p>
                </div>

                <div className="md:col-span-2 flex gap-3 items-end">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded shadow">
                    Save Buy Configuration
                  </button>
                </div>
              </form>
            </section>

            {/* Active Buys List */}
            <section className="bg-white border rounded shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Active Group Buys</h2>
              
              {buys.map((buy) => (
                <div key={buy.id} className="border rounded p-4 mb-4 bg-indigo-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{buy.name}</h3>
                      <p className="text-sm text-gray-700">Participants: {buy.participants} | Kits Committed: {buy.kitsCommitted}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm font-medium">Edit</button>
                      <button 
                        onClick={() => setSelectedBuy(buy)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm font-medium"
                      >
                        View Participants & Payments
                      </button>
                    </div>
                  </div>

                  {/* Status and controls */}
                  <div className="flex flex-wrap gap-3 items-center mt-2">
                    {buy.status === 'active' && (
                      <>
                        <span className="text-green-700 font-medium text-sm">● Active</span>
                        <button 
                          onClick={() => {
                            setBuys(buys.map((b) => b.id === buy.id ? { ...b, status: 'closed' } : b));
                          }}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Close Buy Early (forfeit remaining deposits)
                        </button>
                      </>
                    )}

                    <button 
                      onClick={() => {
                        setBuys(buys.map((b) => b.id === buy.id ? { ...b, status: 'active' } : b));
                      }}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Reopen Buy
                    </button>
                  </div>

                  {/* Metrics */}
                  <div className="mt-4 grid md:grid-cols-3 gap-2 text-xs bg-gray-100 p-3 rounded">
                    <div><span className="font-medium">Next Tier:</span> {buy.minKitsRequired - buy.kitsCommitted} kits remaining</div>
                    <div><span className="font-medium">Deposit:</span> $20 per participant</div>
                    <div><span className="font-medium">Shipping:</span> $10 flat per order</div>
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {buys.length === 0 && (
                <p className="text-gray-600 text-center py-8">No active group buys. Create one above.</p>
              )}
            </section>
          </>
        )}

        {activeTab === 'participants' && selectedBuy && (
          <>
            {/* Participant List */}
            <section className="bg-white border rounded shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Participants — {selectedBuy.name}</h2>

              <table className="w-full border-collapse border bg-white rounded overflow-hidden">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="border px-3 py-2 text-left font-medium text-gray-700">Username</th>
                    <th className="border px-3 py-2 text-left font-medium text-gray-700">Kits</th>
                    <th className="border px-3 py-2 text-left font-medium text-gray-700">Deposit Status</th>
                    <th className="border px-3 py-2 text-left font-medium text-gray-700">Final Payment</th>
                    <th className="border px-3 py-2 text-left font-medium text-gray-700">Shipping Mode</th>
                    <th className="border px-3 py-2 text-left font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example rows */}
                  {[1, 2, 3].map((idx) => (
                    <tr key={idx}>
                      <td className="border px-3 py-2 text-gray-800">user_{idx}</td>
                      <td className="border px-3 py-2">
                        <input type="number" defaultValue={1} className="w-16 border rounded p-1 text-center" />
                      </td>
                      <td className="border px-3 py-2"><span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Paid</span></td>
                      <td className="border px-3 py-2"><span className="text-orange-600 font-medium">$118.00 due in 24h</span></td>
                      <td className="border px-3 py-2 text-gray-700">Direct</td>
                      <td className="border px-3 py-2"><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">Active</span></td>
                    </tr>
                  ))}

                  {/* Add participant row */}
                  <tr className="bg-gray-50">
                    <td className="border px-3 py-2"><input type="text" placeholder="+ New user" className="w-full border rounded p-1" /></td>
                    <td className="border px-3 py-2"><input type="number" defaultValue={1} className="w-16 border rounded p-1 text-center" /></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2">
                      <select className="w-full border rounded p-1 text-sm">
                        <option value="direct">Direct</option>
                        <option value="collection">Collection</option>
                      </select>
                    </td>
                    <td className="border px-3 py-2"></td>
                  </tr>
                </tbody>
              </table>

              {/* Summary */}
              <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
                <p><span className="font-medium">Total committed kits:</span> {selectedBuy.kitsCommitted}</p>
                <p><span className="font-medium">Next tier at:</span> {selectedBuy.minKitsRequired} kits</p>
              </div>
            </section>

            {/* Actions */}
            <section className="bg-white border rounded shadow p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Actions</h3>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <button 
                  onClick={() => {
                    // Export CSV for supplier order (direct fulfillment)
                    console.log('Exporting participant addresses & tracking info to CSV...');
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded shadow"
                >
                  Export Order CSV
                </button>

                <button 
                  onClick={() => {
                    // Process refunds for closed buy that failed minimum commitment
                    console.log('Refunding all deposits due to buy closure');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded shadow"
                >
                  Refund All Deposits (Buy Closed)
                </button>

                <button 
                  onClick={() => {
                    // Extend countdown window for an active buy
                    console.log('Extending countdown window...');
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded shadow"
                >
                  Extend Countdown Window
                </button>

                <button 
                  onClick={() => {
                    // Record shipment tracking for direct fulfillment orders
                    console.log('Opening shipment tracker modal...');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow"
                >
                  Update Shipments & Tracking
                </button>

                <Link 
                  href="/" 
                  className="text-indigo-600 hover:text-indigo-800 underline font-medium ml-auto"
                >
                  ← Back to Home
                </Link>
              </div>
            </section>
          </>
        )}

        {/* Empty state for participants when no buy selected */}
        {activeTab === 'participants' && !selectedBuy && (
          <div className="bg-white border rounded shadow p-6 text-center text-gray-500">
            Select a buy from the Active Buys tab to view its participants.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12 text-center text-sm">
        <p>© 2025 Group Buy Platform — Admin Panel</p>
        <p className="mt-2">Research Use Only. Not for human consumption.</p>
      </footer>
    </div>
  );
}
