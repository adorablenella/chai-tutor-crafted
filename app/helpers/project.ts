import supabase from "./supabase";

type Project = {
  uuid: string;
  name: string;
  subdomain: string;
  description: string;
  userId: string;
  customDomain?: string;
  font?: string;
  logo?: string;
};

export const getSite = async (id: string) => {
  const { data: project = {} } = await supabase.from("projects").select("*").eq("id", id).single();
  return project as Project;
};

export const getSiteByDomain = async (domain: string) => {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;
  const { data: project = {} } = await supabase.from("projects").select("*").eq("subdomain", subdomain).single();
  return project as Project;
};

export const updateSite = async (formData: FormData, siteId: Project, key: string) => {
  const value = formData.get(key);
  const { error } = await supabase
    .from("projects")
    .update({ [key]: value })
    .eq("uuid", siteId);
  if (error) throw error.message;
  return true;
};

export const deleteSite = async (siteId: string) => {
  const { error } = await supabase.from("projects").delete().eq("id", siteId);
  if (error) throw error.message;
  return true;
};
