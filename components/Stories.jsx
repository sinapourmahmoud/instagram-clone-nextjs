import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";
const Stories = () => {
  let [story, setStory] = useState([]);
  let { data: session } = useSession();
  useEffect(() => {
    let users = [];

    for (let id = 1; id <= 25; id++) {
      let firstName = faker.name.firstName();
      let avatar = faker.image.avatar();

      users.push({
        id: id,
        userName: firstName,
        avatar,
      });
    }
    setStory(users);
  }, []);
  return (
    <div className="w-full bg-white py-4 px-2 rounded-md flex space-x-2 overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} userName={session.user.name} />
      )}
      {story.map((item) => (
        <Story key={item.id} img={item.avatar} userName={item.userName} />
      ))}
    </div>
  );
};

export default Stories;
