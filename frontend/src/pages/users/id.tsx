import UserDetails from "@/components/user-details";
import { useParams } from "react-router-dom";

const UserById = () => {
  const { id } = useParams();

  return <UserDetails id={id!} />;
};
export default UserById;
