import { useFetchUser } from "@/hooks/use-fetch-user.hook";

const UserDetails = ({ id }: { id: string }) => {
  const { data, error, loading, refresh } = useFetchUser(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="space-y-4">
      <div>
        <label className="block" htmlFor="name">
          Name
        </label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2"
          type="text"
          id="name"
          value={data!.user.name}
          readOnly
        />
      </div>
      <div>
        <label className="block" htmlFor="email">
          Email
        </label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2"
          type="email"
          id="email"
          value={data!.user.email}
          readOnly
        />
      </div>
      <div>
        <label className="block" htmlFor="joined">
          Joined
        </label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2"
          type="text"
          id="joined"
          value={new Date(data!.user.createdAt).toLocaleDateString()}
          readOnly
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={refresh}
      >
        Refresh
      </button>
    </div>
  );
};
export default UserDetails;
