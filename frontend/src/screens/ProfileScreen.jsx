import { useParams } from "react-router-dom";
import ProfileBanner from "../components/ProfileBanner";

const ProfileScreen = () => {
  let userId = useParams();
  userId = userId.id.slice(1);
  return (
    <section id="profile-banner" className="container mx-auto p-4">
      <ProfileBanner userId={userId} />
    </section>
  );
};

export default ProfileScreen;
