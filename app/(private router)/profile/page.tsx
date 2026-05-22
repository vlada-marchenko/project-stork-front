import { Metadata } from "next";
import ProfileClient from "./Profile.client";

export const metadata: Metadata = {
  title: "Ваш профіль — Лелека",
  description:
    "Керуйте своїм профілем, налаштуваннями та особистими даними на шляху до материнства.",
  openGraph: {
    title: "Ваш профіль — Лелека",
    url: "https://project-stork-front.vercel.app",
    description:
      "Налаштовуйте профіль і зберігайте важливу інформацію для своєї подорожі до материнства.",
    siteName: "Лелека",
    images: [
      {
        url: "/image/profile/og_profile.webp",
        width: 1200,
        height: 630,
        alt: "Сторінка профілю користувачки у Лелека",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ваш профіль — Лелека",
    description: "Доступ до вашого профілю та налаштувань у Лелека.",
    images: ["/image/profile/og_profile.webp"],
  },
};

const Profile = () => {
  return <ProfileClient />;
};

export default Profile;
