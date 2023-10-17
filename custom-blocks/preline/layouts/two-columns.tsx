import React from "react";

const TwoColumnsLayout: React.FC = ({ _styles, _leftColumn, _rightColumn, blockProps }: any) => {
  return (
    <div {...blockProps} className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
      <div {..._styles}>
        <div>{_leftColumn}</div>
        <div className="relative ml-4">{_rightColumn}</div>
      </div>
    </div>
  );
};

// registerChaiBlock(TwoColumnsLayout, {
//   type: "TwoColumnLayout",
//   label: "Two Column Layout",
//   group: "layout",
//   preview:
//     "https://fldwljgzcktqnysdkxnn.supabase.co/storage/v1/object/public/chaibuilder-blob-storage/block-previews/two-col.png?t=2023-10-17T15%3A57%3A36.882Z",
//   props: {
//     styles: Styles({ default: "grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20" }),
//     leftColumn: Slot({ name: "Left Column", emptyStyles: "h-40" }),
//     rightColumn: Slot({ name: "Right Column", emptyStyles: "h-40" }),
//   },
// });
