"use client";
import { useState } from "react";

const tabs = ["Todos", "Drafts", "Sent", "Signed", "Expired", "Cancelled"];

const statusStyles = {
  Draft: "bg-yellow-50 text-yellow-600 border border-yellow-200",
  Tracking: "bg-blue-50 text-blue-600 border border-blue-200",
  Complete: "bg-green-50 text-green-600 border border-green-200",
  Expired: "bg-red-50 text-red-600 border border-red-200",
  Waiting: "bg-orange-50 text-orange-600 border border-orange-200",
};

const statusDot = {
  Draft: "bg-yellow-400",
  Tracking: "bg-blue-400",
  Complete: "bg-green-400",
  Expired: "bg-red-400",
  Waiting: "bg-orange-400",
};

const files = [
  { id: 1, name: "Scann_155.folder", type: "folder", recipient: "Olivia Bennett", avatarColor: "bg-teal-500", modified: "02 Jan 2025", status: "Draft" },
  { id: 2, name: "settlement.from.client.4S folder", type: "folder", recipient: "Grizzlee Lopes", avatarColor: "bg-purple-500", modified: "07 Jan 2025", status: "Tracking" },
  { id: 3, name: "doument_1.zip", type: "zip", recipient: "Sophia Carter", avatarColor: "bg-green-500", modified: "09 Jan 2025", status: "Complete" },
  { id: 4, name: "ATTACHEMENT 838128056.pdf", type: "pdf", recipient: "James Hayes", avatarColor: "bg-yellow-500", modified: "12 Jan 2025", status: "Draft" },
  { id: 5, name: "doument_1.zip", type: "zip", recipient: "Ethan Cooper", avatarColor: "bg-blue-500", modified: "19 Jan 2025", status: "Complete" },
  { id: 6, name: "DF_ASKO_UED.xh...", type: "file", recipient: "Rafael Diez", avatarColor: "bg-pink-500", modified: "21 Jan 2025", status: "Expired" },
  { id: 7, name: "ATTACHEMENT 838128056.pdf", type: "pdf", recipient: "Mia Davis", avatarColor: "bg-indigo-500", modified: "21 Jan 2025", status: "Waiting" },
  { id: 8, name: "legal-tenure.doc", type: "doc", recipient: "Cyrus Frank", avatarColor: "bg-orange-500", modified: "21 Jan 2025", status: "Expired" },
  { id: 9, name: "legal-tenure.doc", type: "doc", recipient: "Yohan Samel", avatarColor: "bg-red-500", modified: "21 Jan 2025", status: "Waiting" },
  { id: 10, name: "ATTACHEMENT 838128056.pdf", type: "pdf", recipient: "Kris Hefner", avatarColor: "bg-teal-600", modified: "21 Jan 2025", status: "Complete" },
];

const fileIcons = {
  folder: (
    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
    </svg>
  ),
  pdf: (
    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 17v-1h8v1H8zm0-3v-1h8v1H8zm0-3V9.5h3V11H8z"/>
    </svg>
  ),
  zip: (
    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM10 12h1v2h-1v-2zm0-2h1v2h-1v-2zm1 4h1v2h-1v-2zm-1 2h1v2h-1v-2z"/>
    </svg>
  ),
  doc: (
    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 17v-1h8v1H8zm0-3v-1h8v1H8zm0-3V9.5h8V11H8z"/>
    </svg>
  ),
  file: (
    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 17v-1h8v1H8zm0-3v-1h8v1H8zm0-3V9.5h8V11H8z"/>
    </svg>
  ),
};

function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
      {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
    </div>
  );
}

export default function MyFiles() {
  const [activeTab, setActiveTab] = useState<string>("Todos");
  const [selected, setSelected] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(files.map(f => f.id));
    }
    setAllSelected(!allSelected);
  };

  const toggleOne = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">My Files</h1>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Create Document</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap text-sm px-4 py-2 rounded-lg font-medium transition-colors flex-shrink-0 ${
                activeTab === tab
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Breadcrumb + Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-gray-100">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500 overflow-x-auto scrollbar-hide">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
              </svg>
              <span className="hover:text-teal-600 cursor-pointer whitespace-nowrap">Documentos</span>
              <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="hover:text-teal-600 cursor-pointer whitespace-nowrap">2025</span>
              <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-400 whitespace-nowrap">Compartilhado com: usatmos mapadhoes</span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filter
              </button>
              <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M6 12h12M9 17h6" />
                </svg>
                <span className="hidden sm:inline">Ordenar</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-lg transition-colors">
                Show signatures
              </button>
              <div className="hidden sm:flex items-center gap-2 ml-2">
                <button className="text-xs text-gray-500 hover:text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-lg">Bulk Actions</button>
                <div className="relative">
                  <svg className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input placeholder="Search..." className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-400 w-32" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-teal-500 focus:ring-teal-400 cursor-pointer"
                    />
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Name</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Recipients</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Last Modified</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Status</th>
                  <th className="w-10 px-3 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {files.map((file) => (
                  <tr
                    key={file.id}
                    className={`hover:bg-gray-50/80 transition-colors group ${selected.includes(file.id) ? "bg-teal-50/40" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(file.id)}
                        onChange={() => toggleOne(file.id)}
                        className="w-3.5 h-3.5 rounded border-gray-300 text-teal-500 focus:ring-teal-400 cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex-shrink-0">{fileIcons[file.type as keyof typeof fileIcons]}</div>
                        <span className="text-sm text-gray-700 truncate max-w-[160px] sm:max-w-xs">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={file.recipient} color={file.avatarColor} />
                        <span className="text-sm text-gray-600 whitespace-nowrap">{file.recipient}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm text-gray-500 whitespace-nowrap">{file.modified}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[file.status as keyof typeof statusStyles]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[file.status as keyof typeof statusDot]}`}></span>
                        {file.status === "Complete" ? "● Comp..." : file.status === "Tracking" ? "● Track..." : `● ${file.status}`}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Showing {files.length} of {files.length} files</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {[1, 2, 3].map(p => (
                <button key={p} className={`w-7 h-7 rounded text-xs font-medium transition-colors ${p === 1 ? "bg-teal-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                  {p}
                </button>
              ))}
              <button className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}