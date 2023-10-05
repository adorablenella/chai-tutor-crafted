import { useMutation } from "@tanstack/react-query";
import { useProject } from "@/sdk/next/hooks/useProject";

// @TODO: File sending to server is not working need to fix it later
import supabase from "@/app/helpers/supabase";

export const useUploadMedia = () => {
  const { data: project } = useProject();
  return useMutation(async (file: File) => {
    const filePath = `${project?.uuid}/${file.name}`;
    const BUCKET = "chaibuilder-blob-storage";
    const { data, error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error || !data) throw error;
    const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`;
    return publicURL || "";
  });
};
