'use client';

import React, { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';

const initialMembers = [
    { id: 1, name: 'Jenny Wilson', role: 'UI/UX Designer', status: 'Absent', note: "Friend's wedding celebration", avatar: 'https://i.pravatar.cc/150?u=jenny' },
    { id: 2, name: 'Courtney Henry', role: 'UI/UX Designer', status: 'Present', inTime: '9:30 AM', break: '9:30 AM', workTime: '9:30 AM', outTime: '-', avatar: 'https://i.pravatar.cc/150?u=courtney' },
    { id: 3, name: 'Brooklyn Simmons', role: 'UX Researcher', status: 'Present', inTime: '9:30 AM', break: '9:30 AM', workTime: '9:30 AM', outTime: '-', avatar: 'https://i.pravatar.cc/150?u=brooklyn' },
    { id: 4, name: 'Guy Hawkins', role: 'UI/UX Designer', status: 'Present', inTime: '9:30 AM', break: '9:30 AM', workTime: '9:30 AM', outTime: '-', avatar: 'https://i.pravatar.cc/150?u=guy' },
];

export default function TeamDashboard() {
    const [members, setMembers] = useState(initialMembers);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');

    const handleAddEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Invitation sent to: ${email}`);
        setShowModal(false);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB] p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-bold text-[#1e1b4b]">Employee Permission</h1>

                </div>

                {/* Add Employee Button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-[#1e1b4b] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-black transition-all shadow-sm"
                >
                    <Plus size={18} />
                    Add Employee
                </button>
            </div>

            {/* Employee Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 relative">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-4">
                                <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <h3 className="font-bold text-[#1e1b4b]">{member.name}</h3>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">{member.role}</p>
                                </div>
                            </div>
                            <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase ${member.status === 'Present' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                                }`}>
                                {member.status}
                            </span>
                        </div>

                        {member.status === 'Absent' ? (
                            <div className="mt-8">
                                <p className="text-xs text-gray-400 mb-1">In Time</p>
                                <p className="font-bold text-[#1e1b4b] text-lg">{member.note}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                <TimeBlock label="In Time" value={member.inTime || '-'} />
                                <TimeBlock label="Break taken for" value={member.break || '-'} />
                                <TimeBlock label="Work Time" value={member.workTime || '-'} />
                                <TimeBlock label="Out Time" value={member.outTime || '-'} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Employee Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-2xl font-bold text-[#1e1b4b] mb-2">Add New Employee</h2>
                        <p className="text-gray-500 mb-8 text-sm">We'll send an invitation email to join the team.</p>

                        <form onSubmit={handleAddEmployee}>
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-[#1e1b4b] mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="w-full h-[56px] px-5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#5D5FEF] outline-none transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 h-[56px] rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 h-[56px] bg-[#FF5F38] text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-200 transition-all"
                                >
                                    Send Invite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function TimeBlock({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-[#F8F9FB] p-3 rounded-xl border border-gray-50/50">
            <p className="text-[10px] text-gray-400 mb-1 leading-tight">{label}</p>
            <p className="font-bold text-[#1e1b4b] text-sm">{value}</p>
        </div>
    );
}