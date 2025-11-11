import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex-1 overflow-y-scroll no-scrollbar">{children}</body>
    </html>
  );
}
