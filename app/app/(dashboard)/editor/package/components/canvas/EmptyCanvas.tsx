import { useTranslation } from "react-i18next";

export const EmptyCanvas = () => {
  const { t } = useTranslation();
  return (
    <div className="my-auto py-24 text-center text-gray-600 dark:text-white">
      <h1 className="mb-10 text-4xl ">{t("canvas_empty")}</h1>
    </div>
  );
};
