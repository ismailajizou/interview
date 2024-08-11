import Navbar from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import {
  useCreateDocMutation,
  useDeleteDocMutation,
  useGetDocsQuery,
} from "@/redux/apis/docs.api";
import { selectUser } from "@/redux/features/user.slice";
import { useAppSelector } from "@/redux/hooks";
import { formatRelative } from "date-fns/formatRelative";
import { Trash2Icon } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
// interface HomePageProps {}

const HomePage: FC = () => {
  const { user } = useAppSelector(selectUser);
  const { data, isLoading, isError } = useGetDocsQuery();
  const [create] = useCreateDocMutation();
  const [remove] = useDeleteDocMutation();
  return (
    <div className="">
      <Navbar />
      <div className="container flex mx-auto my-4 justify-between">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <Button
          onClick={() => {
            create({ title: "Untitled Document" });
          }}
        >
          Create New Document
        </Button>
      </div>

      <div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {
              // Show loading spinner
              isLoading ? (
                <div>Loading...</div>
              ) : isError ? (
                <div>Error fetching documents</div>
              ) : !data?.length ? (
                <div className="">No documents were found</div>
              ) : (
                data.map((doc) => (
                  <Link
                    to={`/documents/${doc._id}`}
                    key={doc._id.toString()}
                    className="flex items-center justify-between bg-card border-card shadow-md rounded-md p-4 hover:scale-105 transition-transform"
                  >
                    <div>
                      <h2 className="text-xl font-bold">{doc.title}</h2>
                      <p>
                        Created by{" "}
                        <span className="font-bold">{doc.creatorId.name}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last edited{" "}
                        {formatRelative(new Date(doc.updatedAt), new Date())}
                      </p>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        remove(doc._id);
                      }}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </Link>
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
