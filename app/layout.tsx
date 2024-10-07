import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" data-theme="winter">
        <body>
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}