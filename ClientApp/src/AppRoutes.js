import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/upload',
    element: <Counter />
  },
  {
    path: '/clean-data',
    element: <FetchData />
  }
];

export default AppRoutes;
