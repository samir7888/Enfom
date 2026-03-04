// app/security-settings/page.tsx (or components/SecuritySettings.tsx)
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TwoFactorMethod {
  id: string;
  icon: string;
  label: string;
  description?: string;
  hasButton?: boolean;
}

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true);
  const [recoveryEmail, setRecoveryEmail] = useState<string>('info@pagedone.com');

  const handleSave = (): void => {
    // Handle save functionality
    console.log('Saving settings...');
  };

  const handleCancel = (): void => {
    // Handle cancel functionality
    console.log('Canceling...');
  };

  const twoFactorMethods: TwoFactorMethod[] = [
    {
      id: 'app',
      icon: 'bi-phone',
      label: 'Authentication App',
      hasButton: true
    },
    {
      id: 'key',
      icon: 'bi-key',
      label: 'Security Key',
      description: 'Use physical security key to protect your account'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center px-4 lg:px-[10%] py-5 border-b border-gray-200 bg-white">
        <div>
          <h2 className="font-bold text-xl mb-1 text-gray-900">Security & Privacy</h2>
          <p className="text-gray-500 text-sm">Manage Security & Privacy settings to protect your account</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCancel}
            className="px-6 py-2 rounded-lg font-medium border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 rounded-lg font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid px-4 lg:px-[10%] py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h5 className="font-bold text-gray-900 mb-4">Account Details</h5>
              <hr className="mb-4" />
              
              <div className="space-y-4">
                {/* Verify Email */}
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <h6 className="font-semibold text-sm mb-1">Verify Email Address</h6>
                    <p className="text-gray-400 text-xs">Verify Your email address to confirm the credentials</p>
                  </div>
                  <span className="bg-green-50 text-green-600 font-semibold px-4 py-2 rounded-lg text-sm">
                    Verified
                  </span>
                </div>

                {/* Update Password */}
                <div className="flex justify-between items-center py-3">
                  <div>
                    <h6 className="font-semibold text-sm mb-1">Update Password</h6>
                    <p className="text-gray-400 text-xs">Change your password to update & protect your Account</p>
                  </div>
                  <button className="border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Recovery Settings Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h5 className="font-bold text-gray-900 mb-4">Recovery Settings</h5>
              <hr className="mb-4" />
              
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h6 className="font-semibold text-sm mb-1">Recovery Email Address</h6>
                    <p className="text-gray-400 text-xs">Setup Recovery Email to Secure your Account</p>
                  </div>
                  <button className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                    Save
                  </button>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-bold block mb-2">
                    Another Email Address
                  </label>
                  <input 
                    type="email" 
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h6 className="font-semibold text-sm mb-1">Recovery Phone Number</h6>
                  <p className="text-gray-400 text-xs">Add Phone number to Setup SMS Recovery for your account</p>
                </div>
                <button className="border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Setup
                </button>
              </div>
            </div>

            {/* Deactivate Account Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h6 className="font-semibold text-sm mb-1">Deactivate Account</h6>
                  <p className="text-gray-400 text-xs">This will shut down your account. And it will reactivate with Signing in</p>
                </div>
                <button className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Deactivate
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Two Factor Authentication */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-6">
              <h5 className="font-bold text-gray-900 mb-4">Two-factor Authentication</h5>
              
              {/* Enable Switch */}
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-semibold text-sm">Enable Authentication</h6>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    checked={twoFactorEnabled}
                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className="sr-only"
                    id="twoFactor"
                  />
                  <label
                    htmlFor="twoFactor"
                    className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${
                      twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        twoFactorEnabled ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </label>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Enable Two-factor Authentication to enhance the security
              </p>

              {/* Two Factor Methods */}
              {twoFactorMethods.map((method) => (
                <div key={method.id}>
                  <div className={`flex items-center justify-between p-4 border border-gray-200 rounded-xl ${
                    method.id === 'key' ? 'mb-2' : 'mb-3'
                  }`}>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mr-4">
                        <i className={`${method.icon} text-gray-600`}></i>
                      </div>
                      <span className="text-sm font-semibold">{method.label}</span>
                    </div>
                    {method.hasButton && (
                      <button className="border border-gray-300 bg-white px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                        <i className="bi bi-plus"></i>
                      </button>
                    )}
                  </div>
                  {method.description && (
                    <p className="text-gray-500 text-sm mb-3">{method.description}</p>
                  )}
                </div>
              ))}

              {/* Security Key Button */}
              <button className="w-full border border-gray-300 bg-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors mt-2">
                Use Security Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;