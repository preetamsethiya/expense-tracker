import { useState } from "react";

export default function UseFilter(dataList, callback) {
  const [query, setQuery] = useState("");

  const filterData = dataList.filter((data) => {
    return callback(data).toLowerCase().includes(query.toLocaleLowerCase());
  });

  return [filterData, setQuery];
}
