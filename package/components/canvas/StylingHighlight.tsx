import { flip } from "@floating-ui/dom";
import { shift, useFloating } from "@floating-ui/react-dom";

export const StylingHighlight = ({ selectedStyleElement }: { selectedStyleElement: HTMLElement | undefined }) => {
  const { floatingStyles, refs } = useFloating({
    placement: "top-end",
    middleware: [shift(), flip()],
    elements: {
      reference: selectedStyleElement,
    },
  });

  if (!selectedStyleElement) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      ref={refs.setFloating}
      style={floatingStyles}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onKeyDown={(e) => e.stopPropagation()}
      className="z-50 flex h-6 items-center rounded-t-sm bg-orange-500 p-1 text-xs text-white">
      <p className="flex items-center">
        <svg
          data-v-f24af897=""
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide-icon customizable w-3">
          <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
          <path d="m5 2 5 5" />
          <path d="M2 13h15" />
          <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
        </svg>
      </p>
    </div>
  );
};
