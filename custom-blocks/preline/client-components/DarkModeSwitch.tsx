"use client";

import { useEffect, useState } from "react";
import { generateUUID } from "@/sdk/package/functions/functions";

const DarkModeSwitch = () => {
  const [idAttr] = useState(generateUUID());
  useEffect(() => {
    const HSThemeAppearance = {
      init() {
        const defaultTheme = "default";
        let theme: string = localStorage.getItem("hs_theme") || defaultTheme;

        // @ts-ignore
        if (document.querySelector("html").classList.contains("dark")) return;
        this.setAppearance(theme);
      },
      _resetStylesOnLoad() {
        const $resetStyles = document.createElement("style");
        $resetStyles.innerText = `*{transition: unset !important;}`;
        $resetStyles.setAttribute("data-hs-appearance-onload-styles", "");
        document.head.appendChild($resetStyles);
        return $resetStyles;
      },
      setAppearance(theme: string, saveInStore = true, dispatchEvent = true) {
        const $resetStylesEl = this._resetStylesOnLoad();

        if (saveInStore) {
          localStorage.setItem("hs_theme", theme);
        }

        if (theme === "auto") {
          theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";
        }

        // @ts-ignore
        document.querySelector("html").classList.remove("dark");
        // @ts-ignore
        document.querySelector("html").classList.remove("c-dark");
        // @ts-ignore
        document.querySelector("html").classList.remove("default");
        // @ts-ignore
        document.querySelector("html").classList.remove("auto");
        // @ts-ignore
        document.querySelector("html").classList.add(this.getOriginalAppearance());
        if (this.getOriginalAppearance() === "dark") {
          // @ts-ignore
          document.querySelector("html").classList.add("c-dark");
        }

        setTimeout(() => {
          $resetStylesEl.remove();
        });

        if (dispatchEvent) {
          window.dispatchEvent(new CustomEvent("on-hs-appearance-change", { detail: theme }));
        }
      },
      getAppearance() {
        let theme = this.getOriginalAppearance();
        if (theme === "auto") {
          theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";
        }
        return theme;
      },
      getOriginalAppearance() {
        const defaultTheme = "default";
        return localStorage.getItem("hs_theme") || defaultTheme;
      },
    };
    HSThemeAppearance.init();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (HSThemeAppearance.getOriginalAppearance() === "auto") {
        HSThemeAppearance.setAppearance("auto", false);
      }
    });

    const handler = () => {
      const $clickableThemes = document.querySelectorAll("[data-hs-theme-click-value]");
      const $switchableThemes = document.querySelectorAll("[data-hs-theme-switch]");

      $clickableThemes.forEach(($item) => {
        $item.addEventListener("click", () =>
          HSThemeAppearance.setAppearance(
            $item.getAttribute("data-hs-theme-click-value") as string,
            true,
            $item as any,
          ),
        );
      });

      $switchableThemes.forEach(($item) => {
        $item.addEventListener("change", (e) => {
          // @ts-ignore
          HSThemeAppearance.setAppearance(e.target.checked ? "dark" : "default");
        });
        // @ts-ignore
        $item.checked = HSThemeAppearance.getAppearance() === "dark";
      });

      window.addEventListener("on-hs-appearance-change", (e) => {
        $switchableThemes.forEach(($item) => {
          // @ts-ignore
          $item.checked = e.detail === "dark";
        });
      });
    };

    if (document.readyState === "complete") {
      handler();
    } else {
      window.addEventListener("load", handler);
      return () => {
        window.removeEventListener("load", handler);
      };
    }
  }, []);
  return (
    <div className="hs-dropdown" data-hs-dropdown-placement="bottom-left" data-hs-dropdown-offset="30">
      <a
        className="hs-dropdown-toggle hs-dark-mode group flex items-center font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500"
        href="javascript:;">
        <svg
          className="hs-dark-mode-active:hidden block h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
        </svg>
        <svg
          className="hs-dark-mode-active:block hidden h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
        </svg>
      </a>

      <div
        id={"dropdown-" + idAttr}
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 z-[999] mb-2 mt-2 hidden origin-bottom-left space-y-1 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[margin,opacity] duration-300 dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800">
        <a
          className="hs-auto-mode-active:bg-gray-100 flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          href="javascript:;"
          data-hs-theme-click-value="auto">
          Auto (system default)
        </a>
        <a
          className="hs-default-mode-active:bg-gray-100 flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          href="javascript:;"
          data-hs-theme-click-value="default">
          Default (light mode)
        </a>
        <a
          className="hs-dark-mode-active:bg-gray-700 flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          href="javascript:;"
          data-hs-theme-click-value="dark">
          Dark
        </a>
      </div>
    </div>
  );
};
export { DarkModeSwitch };
