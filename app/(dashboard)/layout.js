import { auth } from "@/auth";
import "../globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Next gen Admin Dashboard",
};

const RootLayout = async ({ children }) => {
  const session = await auth();
  //console.log(session);
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/djrwougmx/image/upload/v1733326312/E0Aik10_azlclg.jpg"
          sizes="any"
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
