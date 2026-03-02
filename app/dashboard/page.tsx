
export default function CapitalDashboard() {
  return (
    <main className="grow mb-16 md:mb-0 bg-gray-100 overflow-scroll h-screen">
      <div className="max-w-[1300px] mx-auto my-8 px-6">
        
        {/* Header */}
        <header className="mb-5 flex justify-between items-end">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="flex items-center gap-1 mb-1 text-sm text-gray-500">
                <li>
                  <a href="#" className="no-underline text-gray-500 hover:text-gray-700">Organization</a>
                </li>
                <li className="before:content-['/'] before:mx-1 text-gray-700 font-medium">Finances</li>
              </ol>
            </nav>
            <h2 className="text-2xl font-bold m-0 text-gray-900">Capital Dashboard</h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-gray-500 text-sm">Last updated: 12 mins ago</span>
            <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
              </svg>
              Export
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-6">
          
          {/* Left Column */}
          <div>
            
            {/* Portfolio Overview */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all duration-200">
              <div className="flex justify-between mb-6">
                <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">Portfolio Overview</span>
                <span className="text-gray-400 text-sm">Updated Jan 2023</span>
              </div>
              <div className="grid grid-cols-3">
                <div className="border-r border-gray-200">
                  <div className="text-xs uppercase tracking-wide font-semibold text-gray-500">Total Forms</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">24</div>
                </div>
                <div className="border-r border-gray-200 pl-4 md:pl-6">
                  <div className="text-xs uppercase tracking-wide font-semibold text-gray-500">Submissions</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">1,284</div>
                </div>
                <div className="pl-4 md:pl-6">
                  <div className="text-xs uppercase tracking-wide font-semibold text-gray-500">Team Size</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">8</div>
                </div>
              </div>
            </div>

            {/* Credit Rating + Active Draws */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Credit Rating */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all duration-200">
                <div className="flex items-center mb-3">
                  <div className="bg-indigo-50 p-2 rounded-xl mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6366f1" viewBox="0 0 16 16">
                      <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                      <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                    </svg>
                  </div>
                  <span className="font-bold text-gray-900">Credit Rating</span>
                </div>
                <p className="text-gray-500 text-sm">Target 1,000 for 8% discount rates.</p>
                
                <div className="my-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs uppercase tracking-wide font-semibold text-gray-500">Current Score</span>
                    <span className="text-4xl font-extrabold bg-linear-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">690</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "69%" }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-white border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all">Optimize</button>
                  <button className="bg-white border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all">Analytics</button>
                </div>
              </div>

              {/* Active Draws */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all duration-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-900 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1"/>
                    </svg>
                    Active Draws
                  </span>
                  <button className="bg-indigo-500 text-white border-none rounded-lg px-4 py-2 font-medium text-sm hover:bg-indigo-600 transition-colors">New Draw</button>
                </div>

                {/* Draw #005 */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h6 className="mb-0 font-bold text-gray-900">Draw #005</h6>
                      <small className="text-gray-500">Limit: $100k</small>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-semibold">ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-bold text-gray-900">$12,000</span>
                    <span className="font-bold text-indigo-500">12.0%</span>
                  </div>
                </div>

                {/* Draw #004 */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h6 className="mb-0 font-bold text-gray-900">Draw #004</h6>
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-semibold">ACTIVE</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">$8,450</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            
            {/* Upcoming Schedule */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all duration-200">
              <h6 className="font-bold text-gray-900 mb-6">Upcoming Schedule</h6>
              
              <div className="flex flex-col gap-3">
                {[
                  { amount: "$143,258.12", date: "Aug 05, 2023" },
                  { amount: "$143,258.12", date: "Aug 12, 2023" },
                  { amount: "$143,258.12", date: "Aug 19, 2023" },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2 ${i < arr.length - 1 ? "border-b border-gray-200" : ""}`}
                  >
                    <div>
                      <div className="font-bold text-gray-900">{item.amount}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="bg-white border border-gray-200 rounded-lg w-full mt-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all">
                Full Payment History
              </button>
            </div>

            {/* Upgrade Banner */}
            <div className="bg-gray-900 rounded-xl p-8 text-white relative overflow-hidden">
              <div className="absolute -top-8 -right-4 w-36 h-36 bg-indigo-500/10 rounded-full pointer-events-none" />
              <span className="text-xs uppercase tracking-wide font-semibold text-white/50">Enterprise Tier</span>
              <h3 className="font-bold text-3xl my-2">
                $250<span className="text-lg opacity-75">/mo</span>
              </h3>
              <p className="text-sm opacity-75 mb-6">Unlock 1-1 financial coaching and advanced liquidity management tools.</p>
              <button className="bg-white text-gray-900 w-full py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}