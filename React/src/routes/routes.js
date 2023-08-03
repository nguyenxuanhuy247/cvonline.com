import { path } from '~/utils';

// Layouts
import { AuthLayout, PersonalLayout, HomeLayout } from '~/layouts';

// Public routes
const publicRoutes = [];

// Authenticated routes
const authenticatedRoutes = [
    { path: path.SIGNIN, component: AuthLayout, Authenticated: false, isURLParams: false, isChildren: false },
    { path: path.SIGNUP, component: AuthLayout, Authenticated: false, isURLParams: false, isChildren: false },
    { path: path.FORGOTPASSWORD, component: AuthLayout, Authenticated: false, isURLParams: false, isChildren: false },
    { path: path.HOME, component: PersonalLayout, Authenticated: true, isURLParams: true, isChildren: true },
    { path: path.HOME, component: HomeLayout, Authenticated: true, isURLParams: false, isChildren: true },
];

export { publicRoutes, authenticatedRoutes };
