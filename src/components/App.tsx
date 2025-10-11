import { Footer } from "./Footer";
import { GlobalSummary } from "./GlobalSummary";
import { Header } from "./Header";
export function App() {
  return (
    <div className="w-max h-max select-none flex-1 rounded-md">
      <Header />
      <GlobalSummary />
      <Footer />
    </div>
  );
}
