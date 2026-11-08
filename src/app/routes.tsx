import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { PracticeSetupPage } from '../pages/PracticeSetupPage';
import { PracticePage } from '../pages/PracticePage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProgressPage } from '../pages/ProgressPage';
import { Layout } from './Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'setup',
        element: <PracticeSetupPage />,
      },
      {
        path: 'practice',
        element: <PracticePage />,
      },
      {
        path: 'results',
        element: <ResultsPage />,
      },
      {
        path: 'progress',
        element: <ProgressPage />,
      },
    ],
  },
]);
