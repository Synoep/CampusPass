import React from 'react';
import { X, Download } from 'lucide-react';
import { AccessPoint } from '../types';

interface QRCodeModalProps {
  accessPoint: AccessPoint;
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ accessPoint, isOpen, onClose }) => {
  if (!isOpen) return null;

  // This would normally be generated based on the user's credentials and the access point
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=uniaccess:${accessPoint.id}`;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" onClick={onClose}></div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Your Access QR Code
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Present this QR code at the entrance of {accessPoint.name} to gain access. 
                    This code is unique to you and valid for today only.
                  </p>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                    <img src={qrCodeUrl} alt="Access QR Code" className="w-48 h-48" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="mt-1 text-sm text-gray-900">{accessPoint.location || 'Online'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Valid Until</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date().toLocaleDateString()} 11:59 PM
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Required Badges</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {accessPoint.requiredBadges.length > 0 ? accessPoint.requiredBadges.join(', ') : 'None'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <Download size={16} className="mr-2" />
              Download QR Code
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;