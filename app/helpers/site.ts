import supabase from "./supabase";

type Site = {
  id?: string;
  name: string;
  subdomain: string;
  description: string;
  userId: string;
  customDomain?: string;
  font?: string;
  logo?: string;
};

export const getSites = async () => {
  const { data: sites = [] } = await supabase.from("site").select("*");
  return sites as Site[];
};

export const getSite = async (id: string) => {
  const { data: site = {} } = await supabase
    .from("site")
    .select("*")
    .eq("id", id)
    .single();
  return site as Site;
};

export const getSiteByDomain = async (domain: string) => {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;
  const { data: site = {} } = await supabase
    .from("site")
    .select("*")
    .eq("subdomain", subdomain)
    .single();
  return site as Site;
};

export const createSite = async (payload: Site) => {
  const { error } = await supabase.from("site").insert(payload);
  if (error) throw error.message;
  return true;
};

export const updateSite = async (
  formData: FormData,
  siteId: Site,
  key: string,
) => {
  const value = formData.get(key);
  const { error } = await supabase
    .from("site")
    .update({ [key]: value })
    .eq("id", siteId);
  if (error) throw error.message;
  return true;
};

export const deleteSite = async (siteId: string) => {
  const { error } = await supabase.from("site").delete().eq("id", siteId);
  if (error) throw error.message;
  return true;
};
