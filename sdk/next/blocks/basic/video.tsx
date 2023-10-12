import * as React from "react";
import { VideoIcon } from "@radix-ui/react-icons";
import { isEmpty } from "lodash";
import { TBlock } from "@/sdk/package/types/TBlock";
import { registerServerBlock } from "@/sdk/next/server";
import { Checkbox, Model, SingleLineText, Styles } from "@/sdk/package/controls/controls";

const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?youtube\.com\/(watch\?v=|embed\/)([a-zA-Z0-9_-]{11})/;
const VIMEO_REGEX = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)/;
const DAILYMOTION_REGEX = /^(https?:\/\/)?(www\.)?dailymotion\.com\/(video|embed\/video)\/([a-zA-Z0-9_-]+)/;

const getEmbedURL = (url: string): string | null => {
  if (YOUTUBE_REGEX.test(url)) {
    const match = url.match(YOUTUBE_REGEX);
    if (match) {
      const videoId = match[4];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }

  if (VIMEO_REGEX.test(url)) {
    const match = url.match(VIMEO_REGEX);
    if (match) {
      const videoId = match[3];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  }

  if (DAILYMOTION_REGEX.test(url)) {
    const match = url.match(DAILYMOTION_REGEX);
    if (match) {
      const videoId = match[4];
      return `https://www.dailymotion.com/embed/video/${videoId}`;
    }
    return url;
  }

  return null;
};

const VideoBlock = (
  block: TBlock & {
    _controls: Record<string, any>;
    blockProps: Record<string, string>;
    _styles: Record<string, string>;
  },
) => {
  const { blockProps, _styles, _url, _controls } = block;

  const autoplay = _controls.autoPlay;
  const controls = _controls.controls;
  const muted = autoplay || _controls.muted;
  const loop = _controls.loop;

  let embedURL = getEmbedURL(_url);
  if (embedURL) {
    if (!isEmpty(embedURL)) {
      const iframeControls = [];
      iframeControls.push(`autoplay=${autoplay ? 1 : 0}`);
      iframeControls.push(`controls=${controls ? 1 : 0}`);
      iframeControls.push(`mute=${muted ? 1 : 0}&muted=${muted ? 1 : 0}`);
      iframeControls.push(`loop=${loop ? 1 : 0}`);
      embedURL = `${embedURL}?${iframeControls.join("&")}`;
    }
    return React.createElement("iframe", {
      ...blockProps,
      ..._styles,
      src: embedURL,
      allow: "autoplay *; fullscreen *",
      allowFullScreen: true,
      frameBorder: 0,
    });
  }

  return React.createElement("video", {
    ...blockProps,
    ..._styles,
    src: _url,
    controls,
    muted,
    autoPlay: autoplay,
    loop,
  });
};

registerServerBlock(VideoBlock as React.FC<any>, {
  type: "Video",
  label: "Video",
  category: "core",
  icon: VideoIcon,
  group: "basic",
  props: {
    _styles: Styles({ default: "" }),
    _url: SingleLineText({ title: "Video URL", default: "" }),
    _controls: Model({
      title: "Controls",
      properties: {
        autoPlay: Checkbox({ title: "Autoplay", default: true }),
        controls: Checkbox({ title: "Show controls", default: false }),
        loop: Checkbox({ title: "Loop", default: false }),
        muted: Checkbox({ title: "Muted", default: true }),
      },
    }),
  },
});
