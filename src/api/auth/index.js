import AuthContext, { useAuth } from './FirebaseContext';
import AuthInstance from './firebase';
import { useCurrentUser } from './FirebaseUser';

export default AuthInstance;
export { AuthContext, useCurrentUser, useAuth };