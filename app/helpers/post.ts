import { getSiteByDomain } from "./site";
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
  const { data: posts = [] } = await supabase
    .from("post")
    .select("*")
    .eq("siteId", siteId);
  return posts as Post[];
};

export const getPost = async (postId: string) => {
  const { data: site = {} } = await supabase
    .from("post")
    .select("*")
    .eq("id", postId)
    .single();
  return site as Post;
};

export const getPostByDomain = async (domain: string, slug?: string) => {
  const site = await getSiteByDomain(domain as string);
  const posts = await getPosts(site.id as string);
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

export const updatePost = async (id: string, payload: Post) => {
  const post = await getPost(id);
  if (!post) throw "Post not found";

  const body = {
    title: payload.title,
    description: payload.description,
    content: payload.content,
    published: payload.published,
  };
  if (payload.published === post.published) delete body.published;

  const { data, error } = await supabase
    .from("post")
    .update(body)
    .eq("id", id)
    .select();

  if (error) throw error.message;
  return data[0] as Post;
};
