import { useParams } from "react-router-dom";
import ProfileBanner from "../components/ProfileBanner";

const ProfileScreen = () => {
  let userId = useParams();
  userId = userId.id.slice(1);
  return (
    <div>
      <ProfileBanner userId={userId} />
    </div>
  );
};

export default ProfileScreen;
