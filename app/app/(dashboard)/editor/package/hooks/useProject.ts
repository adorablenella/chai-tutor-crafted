import { atom, useAtomValue } from "jotai";
import { useCallback } from "react";

export const currentProjectAtom: any = atom("");

export const useProject = () => {
  const currentProject = useAtomValue(currentProjectAtom);

  const deleteProject = useCallback(() => {}, []);
  const updateProject = useCallback(() => {}, []);
  const createProject = useCallback(() => {}, []);

  return { currentProject, createProject, deleteProject, updateProject };
};
