"use client";
import css from "./page.module.css";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import { getUser } from "@/lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";

export default function ProfileClient() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) return <Loader />;
  if (!user) return null;

  return (
    <div className={css.profileCard}>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </div>
  );
}
