import { path } from '~/utils';

// Layouts
import { AuthLayout, PersonalLayout, JobLayout } from '~/layouts';

// Public routes
const publicRoutes = [
    { path: path.HOME, component: JobLayout },
    { path: path.JOB, component: JobLayout },
];

// Authenticated routes
const authenticatedRoutes = [
    { path: path.SIGNIN, component: AuthLayout, Authenticated: false },
    { path: path.SIGNUP, component: AuthLayout, Authenticated: false },
    { path: path.PERSONAL, component: PersonalLayout, Authenticated: true },
];

export { publicRoutes, authenticatedRoutes };
