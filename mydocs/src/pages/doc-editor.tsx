import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { IUser } from "@/redux/apis/auth.api";
import {
  useGetDocByIdQuery,
  useUpdateDocTitleMutation,
} from "@/redux/apis/docs.api";
import {
  selectDoc,
  editorsChanged,
  setDocContent,
} from "@/redux/features/doc.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});

// interface DocEditorProps {}

const EditorAvatar: FC<{ user: IUser }> = ({ user }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar>
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const DocEditor: FC = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data, isError, isLoading } = useGetDocByIdQuery(id!);
  const [newTitle, setNewTitle] = useState<string>(data?.title ?? "");
  const [updateTitle] = useUpdateDocTitleMutation();
  const { currentEditors, content } = useAppSelector(selectDoc);

  //   const [content, setContent] = useState<string>(data?.content ?? "");

  useEffect(() => {
    socket.emit("join-doc", id);

    return () => {
      socket.emit("leave-doc", id);
    };
  }, [id]);

  useEffect(() => {
    socket.on("editors-changed", (data: { editors: IUser[] }) => {
      console.log("EDITORS CHANGED", data);
      dispatch(editorsChanged(data.editors));
    });
    return () => {
      socket.off("editors-changed");
    };
  }, [dispatch]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    dispatch(setDocContent(newContent));
    socket.emit("doc-change", id, newContent);
  };

  useEffect(() => {
    socket.on("doc-change", (data: { content: string }) => {
      dispatch(setDocContent(data.content));
    });
    return () => {
      socket.off("doc-change");
    };
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An Error has occured !</div>;
  return (
    <div>
      <header className="container mx-auto flex items-center justify-between border-b py-2">
        {isEditingTitle ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              autoFocus
            />
            <Button
              onClick={() => {
                updateTitle({ id: data!._id, title: newTitle })
                  .unwrap()
                  .then(() => {
                    setIsEditingTitle(false);
                  });
              }}
              size={"sm"}
            >
              Save
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => setIsEditingTitle(false)}
              size={"sm"}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <h1 onClick={() => setIsEditingTitle(true)}>{data?.title}</h1>
        )}
        <div className="flex items-center gap-2">
          {currentEditors.map((editor) => (
            <EditorAvatar key={editor._id} user={editor} />
          ))}
        </div>
      </header>
      <div className="bg-slate-100 my-0 py-8">
        {/* <input type="hidden" value={content} /> */}
        <div className="w-[50rem] h-[80rem] mx-auto my-4 bg-white border shadow-md py-4 px-4">
          <textarea
            className="h-full w-full p-8 bg-white focus:outline-none border-none resize-none"
            onChange={handleContentChange}
            value={content}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default DocEditor;
