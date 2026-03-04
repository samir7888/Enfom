// app/privacy-settings/page.tsx (or components/PrivacySettings.tsx)
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PrivacyOption {
  id: string;
  label: string;
  options: string[];
}

const PrivacySettings = () => {
  const router = useRouter();
  
  // State for switches
  const [privateProfile, setPrivateProfile] = useState<boolean>(false);
  const [dataSharing, setDataSharing] = useState<boolean>(true);
  
  // State for dropdowns
  const [activityStats, setActivityStats] = useState<string>('My Connections');
  const [messagePermission, setMessagePermission] = useState<string>('Everyone');
  
  // Dropdown options
  const activityOptions: string[] = ['Everyone', 'My Connections', 'Only Me'];
  const messageOptions: string[] = ['Everyone', 'My Connections', 'No One'];

  const handleSaveChanges = (): void => {
    // Handle save functionality
    const settings = {
      privateProfile,
      dataSharing,
      activityStats,
      messagePermission
    };
    console.log('Saving settings:', settings);
    // Here you would typically make an API call
  };

  const handleGoBack = (): void => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Back Button */}
      <button 
        onClick={handleGoBack}
        className="absolute top-20 left-4 md:left-8 lg:left-12 bg-transparent border-none px-5 py-3 rounded-lg cursor-pointer flex items-center gap-2 text-sm text-gray-700 transition-all duration-300 hover:bg-gray-100"
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </button>

      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-center mt-4">
          <div className="w-full lg:w-2/3 xl:w-3/5">
            
            {/* Settings Container */}
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
              
              {/* Settings Header */}
              <div className="mb-8">
                <h2 className="font-extrabold text-2xl md:text-3xl text-gray-900 mb-2">
                  Privacy Settings
                </h2>
                <p className="text-gray-500 text-base">
                  Manage how others see your profile and what information you share.
                </p>
              </div>

              {/* Private Profile Toggle */}
              <div className="bg-white rounded-xl shadow-md mb-5 p-5 md:p-6 flex justify-between items-center">
                <div>
                  <h5 className="font-semibold text-base mb-1 text-gray-900">Private Profile</h5>
                  <p className="text-sm text-gray-500">
                    When your profile is private, only connections you approve can see your posts and activity.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => setPrivateProfile(!privateProfile)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      privateProfile ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        privateProfile ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Activity Stats Dropdown */}
              <div className="bg-white rounded-xl shadow-md mb-5 p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-8 h-8 flex items-center justify-center mr-4 text-blue-600">
                      <i className="fas fa-chart-bar text-lg"></i>
                    </div>
                    <div>
                      <h5 className="font-semibold text-base mb-1 text-gray-900">Who can see my activity stats</h5>
                      <p className="text-sm text-gray-500">Control who sees your post engagement, comments, and shares.</p>
                    </div>
                  </div>
                  
                  {/* Custom Dropdown */}
                  <div className="relative ml-auto">
                    <button
                      onClick={() => document.getElementById('activityDropdown')?.classList.toggle('hidden')}
                      className="flex items-center text-gray-900 font-medium cursor-pointer px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      {activityStats}
                      <i className="fas fa-chevron-down ml-2 text-xs"></i>
                    </button>
                    <div 
                      id="activityDropdown"
                      className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10"
                    >
                      <ul className="py-1">
                        {activityOptions.map((option) => (
                          <li key={option}>
                            <button
                              onClick={() => {
                                setActivityStats(option);
                                document.getElementById('activityDropdown')?.classList.add('hidden');
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                activityStats === option ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                              }`}
                            >
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Permission Dropdown */}
              <div className="bg-white rounded-xl shadow-md mb-5 p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-8 h-8 flex items-center justify-center mr-4 text-blue-600">
                      <i className="fas fa-comment text-lg"></i>
                    </div>
                    <div>
                      <h5 className="font-semibold text-base mb-1 text-gray-900">Who can send me messages</h5>
                      <p className="text-sm text-gray-500">Filter who can initiate a conversation with you.</p>
                    </div>
                  </div>

                  {/* Custom Dropdown */}
                  <div className="relative ml-auto">
                    <button
                      onClick={() => document.getElementById('messageDropdown')?.classList.toggle('hidden')}
                      className="flex items-center text-gray-900 font-medium cursor-pointer px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      {messagePermission}
                      <i className="fas fa-chevron-down ml-2 text-xs"></i>
                    </button>
                    <div 
                      id="messageDropdown"
                      className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10"
                    >
                      <ul className="py-1">
                        {messageOptions.map((option) => (
                          <li key={option}>
                            <button
                              onClick={() => {
                                setMessagePermission(option);
                                document.getElementById('messageDropdown')?.classList.add('hidden');
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                messagePermission === option ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                              }`}
                            >
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Sharing Toggle */}
              <div className="bg-white rounded-xl shadow-md p-5 md:p-6 flex justify-between items-center">
                <div>
                  <h5 className="font-semibold text-base mb-1 text-gray-900">Data Sharing Preferences</h5>
                  <p className="text-sm text-gray-500">
                    Allow personalized ads based on your activity on ConnectSphere.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => setDataSharing(!dataSharing)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      dataSharing ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        dataSharing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

            </div>

            {/* Save Changes Button */}
            <div className="mt-10 flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;