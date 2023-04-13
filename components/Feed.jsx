import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";
const Feed = () => {
  let { data: session } = useSession();
  return (
    <div
      className={` ${
        session ? "xl:grid-cols-3 xl:max-w-6xl" : "xl:grid-cols-2 xl:max-w-2xl"
      } max-w-7xl mx-auto grid-cols-1 gap-4 overflow-auto scrollbar-hide pb-60 h-full  my-6 grid md:max-w-3xl md:grid-cols-2  `}
    >
      <section className="col-span-2 flex flex-col gap-2">
        <Stories />
        <Posts />
      </section>
      <section>
        {session && (
          <>
            <MiniProfile />
            <Suggestions />
          </>
        )}
      </section>
    </div>
  );
};

export default Feed;
