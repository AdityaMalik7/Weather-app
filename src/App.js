import "./App.css";
import Weather from "./components/Weather";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Weather />
      <Analytics />
    </>
  );
}

export default App;
