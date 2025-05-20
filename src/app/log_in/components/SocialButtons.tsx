import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa6';

const handleGoogleAuth = () => {
  console.log('google');
};

const handleFacebookAuth = () => {
  console.log('facebook');
};

const handleAppleAuth = () => {
  console.log('apple');
};

const SocialButtons = () => (
  <div className="flex flex-col gap-4 mb-8">
    <div
      className="w-full border border-[#E50609] rounded-xl py-3 flex items-center justify-center bg-gradient-to-r from-white to-gray-50 font-bold shadow hover:shadow-md hover:bg-[#e50609]/30 transition-colors duration-200 cursor-pointer select-none active:bg-[#e50609]/20 active:scale-95"
      onClick={handleGoogleAuth}
    >
      <FaGoogle className="text-xl mr-2" style={{ color: '#E50609' }} />
      <span className="text-black">Continue with Google</span>
    </div>
    <div
      className="w-full border border-[#E50609] rounded-xl py-3 flex items-center justify-center bg-gradient-to-r from-white to-gray-50 font-bold shadow hover:shadow-md hover:bg-[#e50609]/30 transition-colors duration-200 cursor-pointer select-none active:bg-[#e50609]/20 active:scale-95"
      onClick={handleFacebookAuth}
    >
      <FaFacebookF className="text-xl mr-2" style={{ color: '#E50609' }} />
      <span className="text-black">Continue with Facebook</span>
    </div>
    <div
      className="w-full border border-[#E50609] rounded-xl py-3 flex items-center justify-center bg-gradient-to-r from-white to-gray-50 font-bold shadow hover:shadow-md hover:bg-[#e50609]/30 transition-colors duration-200 cursor-pointer select-none active:bg-[#e50609]/20 active:scale-95"
      onClick={handleAppleAuth}
    >
      <FaApple className="text-xl mr-2" style={{ color: '#E50609' }} />
      <span className="text-black">Continue with Apple</span>
    </div>
  </div>
);

export default SocialButtons;
