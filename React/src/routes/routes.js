import { path } from '~/utils';

// Layouts


// Pages
import Home from '~/pages/Home';
import Live from '~/pages/Live';

// Public routes
const publicRoutes = [
    { path: path.HONE, component: Home, layout: null  },
    { path: path.SIGNIN, component: Home, layout: null  },
    { path: path.SIGNUP, component: Live, layout: null  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };