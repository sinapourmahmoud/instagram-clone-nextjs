import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
const Stories = () => {
  let [story, setStory] = useState([]);
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
      {story.map((item) => (
        <Story key={item.id} img={item.avatar} userName={item.userName} />
      ))}
    </div>
  );
};

export default Stories;
