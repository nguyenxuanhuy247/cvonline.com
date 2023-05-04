import { path } from '~/utils';

// Layouts

// Pages
import Auth from '~/layouts/AuthLayout/Auth.js';
import PersonalLayout from '~/layouts/PersonalLayout/PersonalLayout.js';
import ManageUser from '~/containers/ManageUser/ManageUser';

// Public routes
const publicRoutes = [
    { path: path.MANAGEUSER, component: ManageUser },
];

// Private routes
const privateRoutes = [
    { path: path.SIGNIN, component: Auth, Authenticated: false },
    { path: path.SIGNUP, component: Auth, Authenticated: false },
    { path: path.PERSONAL, component: PersonalLayout, Authenticated: true },
];

export { publicRoutes, privateRoutes };
