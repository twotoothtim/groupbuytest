import Link from 'next/link';
import { GroupBuyCard } from '@/components/pages/GroupBuyCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Research Use Only Banner */}
      <header className="bg-red-700 text-white text-center py-4 font-bold">
        <p className="text-sm md:text-base">
          ⚠️ RESEARCH USE ONLY — NOT FOR HUMAN CONSUMPTION. NO DOSE INSTRUCTIONS PROVIDED.
        </p>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Tiered Group Buy for Research Peptides
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Join a group buy, unlock lower prices as more participants commit.
            Secure your kit with a $20 deposit and pay the balance before shipping.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admin"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded shadow"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Active Group Buys List */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Active Group Buys
        </h2>
        
        {/* Placeholder for dynamic buy cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Example active buy card - will be populated from DB in production */}
          <GroupBuyCard 
            id="buy-001"
            name="Retatrutide Open Buy"
            product="Retatrutide"
            unitPrice={120}
            kitsPerParticipant={1}
            minKitsRequired={10}
            currentCommitment={7}
            status='active'
            closeTimeMs={86400000} // 24 hours in ms (example)
          />

          {/* Example second active buy */}
          <GroupBuyCard 
            id="buy-002"
            name="Semaglutide Research Buy"
            product="Semaglutide"
            unitPrice={95}
            kitsPerParticipant={1}
            minKitsRequired=15
            currentCommitment=12
            status='active'
            closeTimeMs={86400000} // 24 hours in ms (example)
          />
        </div>

        <p className="mt-8 text-center text-gray-600">
          Deposit: $20 per participant • Shipping: $10 flat per order • Final payment due within countdown window.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12 text-center text-sm">
        <p>© 2025 Group Buy Platform — Research Use Only</p>
        <p className="mt-2">
          All products are for laboratory/research purposes only. Not for human consumption.
        </p>
      </footer>
    </div>
  );
}
