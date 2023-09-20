import { getSite, getSiteByDomain } from "./project";
import supabase from "./supabase";

export type Post = {
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  slug?: string;
  image?: string | null;
  siteId: string;
  userId: string;
  published?: boolean;
  imageBlurhash?: string | null;
  createdAt?: Date;
};

export const getPosts = async (siteId: string) => {
  const { data: posts = [] } = await supabase.from("post").select("*").eq("project", siteId);

  const site = await getSite(siteId);

  return posts?.map((post) => ({ ...post, site })) as Post[];
};

export const getPost = async (postId: string) => {
  const { data: post = {} } = await supabase.from("post").select("*").eq("id", postId).single();
  const site = await getSite(post.siteId);
  return { ...post, site } as any;
};

export const getPostByDomain = async (domain: string, slug?: string) => {
  const site = await getSiteByDomain(domain as string);
  const posts = await getPosts(site.uuid as string);
  const allPosts = posts.map((post) => ({ ...post, site })) as Post[];
  if (!slug) return allPosts;

  // * With Adjecent Posts
  const slugPost = posts.find((post) => post.slug === slug);
  return {
    ...slugPost,
    adjacentPosts: posts.filter((post) => post.slug !== slug),
  };
};

export const createPost = async (payload: Post) => {
  const { data, error } = await supabase.from("post").insert(payload).select();
  if (error) throw error.message;
  return data[0] as Post;
};
