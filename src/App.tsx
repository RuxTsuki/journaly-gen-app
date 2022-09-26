import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "./theme/AppTheme";

function App() {
  return (
    <>
      <AppTheme>
        <BrowserRouter>
          <AppRouter></AppRouter>
        </BrowserRouter>
      </AppTheme>
    </>
  );
}

export default App;
