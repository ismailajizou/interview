import { useFetchAllUsers } from "@/hooks/use-fetch-user.hook";
import { Link } from "react-router-dom";

const AllUsersPage = () => {
  const { data, error, loading } = useFetchAllUsers();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  return (
    <div>
      <ul>
        {data!.users.map((user) => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AllUsersPage;
