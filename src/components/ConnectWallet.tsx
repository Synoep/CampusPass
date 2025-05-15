import React from 'react';
import { Shield, ArrowRight, Wallet } from 'lucide-react';

interface ConnectWalletProps {
  onConnect: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Welcome to UniAccess
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Connect your wallet to access university resources with NFT credentials
          </p>
          
          <div className="mt-8">
            <button
              onClick={onConnect}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </button>
          </div>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>BitBadges</span>
                </a>
              </div>
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>University SSO</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    What are NFT credentials?
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      NFT credentials are digital badges that verify your university identity, course enrollment, event participation, and achievements. They provide secure, verifiable access to both digital and physical resources.
                    </p>
                  </div>
                  <div className="mt-3">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
                      Learn more about BitBadges
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-md text-center mt-8 text-sm text-gray-500">
        <p>Built for the BitBadges Hackathon 2024</p>
        <p className="mt-1">🎓 For university students by university students</p>
      </div>
    </div>
  );
};

export default ConnectWallet;