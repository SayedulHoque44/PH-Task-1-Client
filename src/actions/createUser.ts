import { FieldValues } from "react-hook-form";

export const createUser = async (data: FieldValues) => {
  const res = await fetch(`http://localhost:4000/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const userInfo = await res.json();
  return userInfo;
};