import { checkUser } from '../../../lib/checkUser';

export default async function UserSync() {
  try {
    // This will automatically check if user exists in your Neon DB
    // and create them if they don't exist
    const user = await checkUser();
    
    //: Log for debugging
    if (user) {
      console.log('User synced:', user.name);
    }
    
      } catch (error) {
    console.error('Error in UserSync:', error);
    return null;
  }
} 