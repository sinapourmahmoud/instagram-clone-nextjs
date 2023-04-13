import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Suggestion from "./Suggestion";
const Suggestions = () => {
  let [suggestions, setSuggestions] = useState([]);
  let [more, setMore] = useState(false);
  useEffect(() => {
    let users = [];
    let num = more ? 10 : 5;
    for (let id = 1; id <= num; id++) {
      let firstName = faker.name.firstName();
      let avatar = faker.image.avatar();
      let email = faker.internet.email();
      users.push({
        id: id,
        userName: firstName,
        avatar,
        email,
      });
    }
    setSuggestions(users);
  }, [more]);
  return (
    <div className="w-full flex flex-col px-3 gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">Suggestions for you</p>
        <a
          href="#"
          className="text-blue-500"
          onClick={(e) => {
            e.preventDefault();
            setMore(!more);
          }}
        >
          {more ? "See less" : "See more"}
        </a>
      </div>
      {suggestions.map((item) => (
        <Suggestion
          key={item.id}
          src={item.avatar}
          email={item.email}
          userName={item.userName}
        />
      ))}
    </div>
  );
};

export default Suggestions;
