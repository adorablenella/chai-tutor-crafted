import { usePages } from "@/sdk/next/hooks/usePages";
import { FieldProps } from "@rjsf/utils";
import { TPageData } from "../../types";
import { map } from "lodash";

const LinkField = ({ schema, formData, onChange }: FieldProps) => {
  const { data: pages } = usePages();
  const { type = "page", href = "", target = "self" } = formData;

  return (
    <div>
      <span className="text-xs font-medium">{schema?.title ?? "Link"}</span>
      <div className="flex flex-col gap-y-1.5">
        <select
          name="type"
          defaultValue="page"
          value={type}
          onChange={(e) => onChange({ ...formData, href: "", type: e.target.value })}>
          {[
            { const: "page", title: "Open Page" },
            { const: "url", title: "Open URL" },
            { const: "email", title: "Compose Email" },
            { const: "telephone", title: "Call Phone" },
            { const: "scroll", title: "Scroll to element" },
          ].map((opt) => (
            <option key={opt.const} value={opt.const}>
              {opt.title}
            </option>
          ))}
        </select>
        {type === "page" ? (
          <select
            name="href"
            defaultValue=""
            placeholder="Choose Page"
            value={href}
            onChange={(e) => onChange({ ...formData, href: e.target.value })}>
            {map(pages, (page: TPageData) => (
              <option key={page.uuid} value={page.slug}>
                {page.page_name}
              </option>
            ))}
          </select>
        ) : (
          <input
            name="href"
            type="text"
            value={href}
            onChange={(e) => onChange({ ...formData, href: e.target.value })}
            placeholder={
              type === "page" || type === "url" ? "Enter URL" : type === "scroll" ? "#ElementID" : "Enter detail"
            }
          />
        )}
        {(type === "page" || type === "url") && (
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={target === "_blank"}
              className="cursor-pointer rounded-md border border-border"
              onChange={() => onChange({ ...formData, target: target === "_blank" ? "_self" : "_blank" })}
            />
            <span className="pt-1 text-xs">Open in new tab</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkField;
