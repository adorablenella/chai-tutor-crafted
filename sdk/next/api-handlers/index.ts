/* eslint-disable object-shorthand */
import { NextApiRequest, NextApiResponse } from "next";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { first } from "lodash";

export const config = {
  api: {
    bodyParser: true,
  },
};

const ENDPOINTS: { [key: string]: string } = {
  PROJECT: "project",
  PAGES: "pages",
  STORAGE: "storage",
  AUTH_LOGIN: "auth/login",
  AUTH_VERIFY: "auth/verify",
};

const handleProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const supabase = createRouteHandlerClient({ cookies });
  const body = JSON.parse(req.body || `{}`);
  const projects = supabase.from("projects");

  const uuid = body.uuid || process.env.NEXT_PUBLIC_PROJECT_UUID;
  if (body.uuid) delete body.uuid;

  if (method === "GET") {
    const { data, error } = await projects.select("*").eq("uuid", uuid).single();
    if (error) return res.status(500).send(error);
    return res.status(200).send(data || {});
  }

  if (method === "POST") {
    return res.send({ body: body });
  }

  if (method === "PUT") {
    const { data, error } = await projects.update(body).eq("uuid", uuid).select();
    if (error || data.length === 0) return res.status(500).send(error);
    return res.send(data[0]);
  }

  if (method === "DELETE") {
    return res.send({ body: body });
  }

  return res.status(400).send({ error: "Invalid request method" });
};

const handlePages = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const supabase = createRouteHandlerClient({ cookies });
  const body = JSON.parse(req.body || `{}`);
  const pages = supabase.from("pages");
  const pageUuid: string | null = query.page_uuid as string;
  const projectUuid: string | null = query.project_uuid as string;
  const pageSlug: string | null = query.revalidate as string;
  const fields = "uuid, page_name, project, slug, type, custom_code, seo_data";

  if (body.uuid) delete body.uuid;

  if (pageSlug) {
    try {
      await res.revalidate(`/${pageSlug === "_home" ? "" : pageSlug}`);
      return res.json({ revalidated: true });
    } catch (er) {
      return res.status(500).send("Error revalidating");
    }
  }

  if (method === "GET") {
    if (pageUuid) {
      const { data, error } = await pages.select("*").eq("uuid", pageUuid).single();
      if (error) return res.status(500).send(error);
      return res.status(200).send(data || []);
    }
    const { data, error } = await pages.select(fields).eq("project", projectUuid).order("created_at");
    if (error) return res.status(500).send(error);
    return res.status(200).send(data || []);
  }

  if (method === "POST") {
    const { data, error } = await pages.insert(body).select(fields);
    if (error) return res.status(500).send(error);
    return res.send(data[0]);
  }

  if (method === "PUT") {
    // generate CSS file using page blocks and used global blocks
    // about.css
    // upload to supabase. Overwrite the existing one
    const { data, error } = await pages.update(body).eq("uuid", pageUuid).select(fields);
    if (error) return res.status(500).send(error);
    return res.send(data[0]);
  }

  if (method === "DELETE") {
    const { error } = await pages.delete(body).eq("uuid", pageUuid);
    if (error) return res.status(500).send(error);
    return res.send({ deleted: true, message: "Page deleted successfully" });
  }

  return res.status(400).send({ error: "Invalid request method" });
};

const handleStorage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const supabase = createRouteHandlerClient({ cookies });
  const projectUuid: string | null = query.project_uuid as string;
  const BUCKET = "chaibuilder-blob-storage";

  // const form = formidable({});

  if (method === "GET") {
    const mediaParams: Record<any, any> = { sortBy: { column: "name", order: "asc" } };
    mediaParams.limit = (query.limit || 100) as number;
    mediaParams.offset = (query.offset || 0) as number;
    const { data, error } = await supabase.storage.from(BUCKET).list(projectUuid, mediaParams);
    if (error) return res.send([]);

    const validMedia = data?.filter((img: any) => img.name !== ".emptyFolderPlaceholder") || [];
    return res.status(200).send(
      validMedia.map((img: any) => ({
        ...img,
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${projectUuid}/${img.name}`,
      })) || [],
    );
  }

  // let formFiles;
  // try {
  //   [, formFiles] = await form.parse(req);
  // } catch (err) {
  //   return res.status(500).json({ error: "Error uploading files" });
  // }

  // @TODO: @ISSUE: Recieving file object is not looking correct to supabase.
  // if (method === "POST") {
  // const files = formFiles?.file;
  // if (!files || files.length === 0) return res.status(404).send({ error: "File not found" });
  // const file = files[0];

  // file.files.forEach((_file) => {
  //   const newFilepath = `${uploadDir}/${_file.originalFilename}`;
  //   fs.rename(file.filepath, newFilepath, (err) => err);
  // });

  // const filename = `${file.originalFilename}`;
  // const filePath = `website-image/${filename}`;

  // const { data, error } = await supabase.storage.from("chaibuilder-blob-storage").upload(filePath, file, {
  //   cacheControl: "3600",
  //   upsert: false,
  //   contentType: file.mimetype,
  // });

  // if (error) return res.status(500).send(error);

  // const publicURL = supabase.storage.from("chaibuilder-blob-storage").getPublicUrl(data.path);

  // return res.status(200).send({ file });
  // }

  return res.status(400).send({ error: "Invalid request method" });
};

const handleAuthLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { method } = req;
  const body = JSON.parse(req.body || `{}`);

  if (method === "POST") {
    if (!body.email || body.email.length === 0) {
      return res.status(404).send({ ok: false, message: "Please enter email" });
    }
    if (!body.password || body.password.length < 6) {
      return res.status(404).send({ ok: false, message: "Passowrd length should be greater than or equal to 6" });
    }
    const { data, error } = await supabase.auth.signInWithPassword(body);
    if (error) return res.status(401).send(error);
    return res.status(200).send(data.session);
  }
  return res.status(400).send({ ok: false, message: "Invalid request method" });
};

const handleAuthVerify = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { method, query } = req;
  if (method === "GET") {
    const { data, error } = await supabase.auth.getUser(query.access_token as string);
    if (error) return res.status(401).send({ user: null, invalid: true });
    return res.status(200).send(data);
  }
  return res.status(400).send({ ok: false, message: "Invalid request method" });
};

/**
 *
 * @param req
 * @param res
 * @returns Api's
 */
export const chaiBuilderApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  const endpoint = req.url.split("?")[0].replace("/api/chaibuilder/", "");
  switch (endpoint) {
    case ENDPOINTS.PROJECT:
      return handleProject(req, res);
    case ENDPOINTS.PAGES:
      return handlePages(req, res);
    case ENDPOINTS.STORAGE:
      return handleStorage(req, res);
    case ENDPOINTS.AUTH_LOGIN:
      return handleAuthLogin(req, res);
    case ENDPOINTS.AUTH_VERIFY:
      return handleAuthVerify(req, res);
    default:
      return res.status(404).send({ message: "Endpoint not found" });
  }
};

//TODO:
export const chaiBuilderGETHandler = async (request: Request, { params }: { params: { path: string[] } }) => {
  const entity = first(params.path);
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  const projectUuid = searchParams.get("project_uuid") as string;
  const pageUuid = searchParams.get("page_uuid") as string;

  if (entity === ENDPOINTS.PROJECT) {
    // * Fetching Project
    const { data, error } = await supabase.from("projects").select("*").eq("uuid", projectUuid).single();
    if (error) return { response: error, status: 500 };
    return { response: data };
  } else if (entity === ENDPOINTS.PAGES) {
    if (pageUuid) {
      // * Fetching Single Page Detailas
      const { data, error } = await supabase.from("pages").select("*").eq("uuid", pageUuid).single();
      if (error) return { response: error, status: 500 };
      return { response: data };
    }

    // * Fetching list of all pages
    const fields = "uuid, page_name, project, slug, type, custom_code, seo_data";
    const { data, error } = await supabase.from("pages").select(fields).eq("project", projectUuid).order("created_at");
    if (error) return { response: error, status: 500 };
    return { response: data };
  }
  return { status: 400, response: { messsage: "Invalid route" } };
};

export const chaiBuilderPOSTHandler = (request: Request, { params }: { params: { path: string[] } }) => {
  return {};
};

export const chaiBuilderPUTHandler = (request: Request, { params }: { params: { path: string[] } }) => {
  return {};
};

export const chaiBuilderDELETEHandler = (request: Request, { params }: { params: { path: string[] } }) => {
  return {};
};
