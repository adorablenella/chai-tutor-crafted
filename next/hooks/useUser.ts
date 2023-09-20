import { atom, useAtom } from "jotai";
import { TUser } from "../types";

const userAtom = atom<any>(null);
userAtom.debugLabel = "userAtom";

export const verifyUser = async () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return null;

  const response = await fetch(`/api/chaibuilder/auth/verify?access_token=${accessToken}`).then((res) => res.json());
  if (response.invalid) localStorage.removeItem("access_token");
  if (!response?.user || response.invalid) return null;
  return response?.user;
};

export const useUser = (): [TUser, any] => useAtom(userAtom);
