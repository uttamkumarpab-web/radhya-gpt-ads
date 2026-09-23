import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mbaonlineinfo.com"),
  title: {
    default: "Online MBA | Fees, Specialisations, Eligibility & University Comparison",
    template: "%s | MBA Online Info",
  },
  description:
    "Compare Online MBA programmes from top universities in India - fees, specialisations, eligibility, duration and admissions guidance.",
  alternates: {
    canonical: "/",
  },
};

const openAiPixelId = process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID?.trim();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        {children}
        {openAiPixelId ? (
          <Script id="openai-ads-pixel" strategy="beforeInteractive">
            {`
              (function(w,d,s,u){
                if(w.oaiq) return;
                var q=function(){q.q.push(arguments);};
                q.q=[];
                w.oaiq=q;
                var j=d.createElement(s);
                j.async=1;
                j.src=u;
                var f=d.getElementsByTagName(s)[0];
                f.parentNode.insertBefore(j,f);
              })(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
              oaiq("init", { pixelId: ${JSON.stringify(openAiPixelId)} });
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
