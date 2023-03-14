import "./globals.css";

export const metadata = {
  title: "Motivate AI",
  description: "Quote generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
