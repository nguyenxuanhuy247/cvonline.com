import { path } from '~/utils';

// Layouts
import { AuthLayout, PersonalLayout } from '~/layouts';

// Public routes
const publicRoutes = [];

// Authenticated routes
const authenticatedRoutes = [
    { path: path.SIGNIN, component: AuthLayout, Authenticated: false },
    { path: path.SIGNUP, component: AuthLayout, Authenticated: false },
    { path: path.HOME, component: PersonalLayout, Authenticated: true },
];

export { publicRoutes, authenticatedRoutes };
