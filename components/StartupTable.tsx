import React from "react";
import { Startup } from "../types/startup";

export default function Component({
  handleOnRowClick,
  startups,
}: {
  handleOnRowClick: (startup: Startup) => void;
  startups: any;
}) {
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
          {startups.map((startup: any) => (
            <tr
              onDoubleClick={() => {
                handleOnRowClick(startup);
                console.log("open the modal", startup);
              }}
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
