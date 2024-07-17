import { FieldValues } from "react-hook-form";

export const createUser = async (data: FieldValues) => {
  const res = await fetch(`https://ph-task-1-server.vercel.app/api/user`, {
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