import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
const Feed = () => {
  return (
    <div className="max-w-7xl mx-auto grid-cols-1 overflow-auto scrollbar-hide pb-60 h-full  my-6 grid md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3">
      <section className="col-span-2 flex flex-col gap-2">
        <Stories />
        <Posts />
      </section>
      <section></section>
    </div>
  );
};

export default Feed;
