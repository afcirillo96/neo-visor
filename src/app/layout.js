import "./globals.css";
import MapComponent from "./map/MapComponent";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Neo-Visor",
  description: "Visor de Mapas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div>{children}</div>
        <MapComponent />
      </body>
    </html>
  );
}
