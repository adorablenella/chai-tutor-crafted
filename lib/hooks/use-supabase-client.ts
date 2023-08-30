import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const useSupabaseClient = () => {
  return createClientComponentClient();
};
