import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import { Viewer } from './viewer/index';

export const App = (): JSX.Element => {  
  return (
    <main className="font-sans antialiased leading-normal tracking-wider bg-gray-100 dark:bg-gray-700 dark:text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Viewer/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}