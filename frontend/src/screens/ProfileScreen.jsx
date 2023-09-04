import { useParams } from "react-router-dom";
import ProfileBanner from "../components/ProfileBanner";

const ProfileScreen = () => {
  let userId = useParams();
  userId = userId.id.slice(1);
  return (
    <section className="container mx-auto p-4">
      <section className="flex flex-col flex-1 mt-4 mx-auto md:flex-row items-start">
        <ProfileBanner userId={userId} />
      </section>
    </section>
  );
};

export default ProfileScreen;
