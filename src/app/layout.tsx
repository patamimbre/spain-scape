import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spain Scape",
  description: "Get unique, tailored recommendations for your next Spanish escape",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        montserrat.className,
        'antialiased',
        'p-8 md:p-12 min-h-screen bg-[#fbfbfb]',

      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
