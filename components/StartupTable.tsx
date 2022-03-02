import React, { useEffect, useState } from "react";
import { Startup } from "../types/startup";

export default function Component() {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const fetchStartups = async () => {
      const response = await fetch("/api/startup");
      if (response.status !== 200) return;
      const data = await response.json();
      setStartups(data);
    };
    fetchStartups();
  }, []);

  return (
    <div className="">
      <table className="border border-gray-900">
        <thead className="border-b border-gray-900">
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">description</th>
            <th scope="col">categories</th>
          </tr>
        </thead>
        <tbody>
          {startups.map((startup) => (
            <tr
              onDoubleClick={() => console.log("open the modal")}
              key={startup.id}
              className="odd:bg-slate-100 cursor-pointer hover:bg-slate-300"
            >
              <th scope="row">{startup.id}</th>
              <th scope="row" className="text-left">
                {startup.name}
              </th>
              <td>{startup.description}</td>
              <td>{startup.category.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
