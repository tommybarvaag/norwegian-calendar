"use client";

import { FC, useEffect, useReducer } from "react";
import {
  CheckCircledIcon,
  ClipboardCopyIcon,
  Share2Icon,
} from "@radix-ui/react-icons";

import { Show } from "@/components/ui";

enum ShareActionKind {
  SHARE_SUPPORTED = "SHARE_SUPPORTED",
  INTERACTED_WITH_SHARE = "INTERACTED_WITH_SHARE",
  INTERACTED_WITH_CLIPBOARD = "INTERACTED_WITH_CLIPBOARD",
}

// An interface for our actions
interface ShareAction {
  type: ShareActionKind;
}

type ShareState = {
  shareSupported: boolean;
  shareClicked: boolean;
  clipboardClicked: boolean;
};

const ShareButton: FC<{ url: string }> = ({ url }) => {
  // reducer to keep track of whether the user has interacted with the share
  // api or the clipboard api
  // if the user has interacted with the share api, toggle share = true
  // if the user has interacted with the clipboard api, toggle clipboard = true
  const [{ shareSupported, clipboardClicked }, dispatch] = useReducer(
    (state: ShareState, action: ShareAction) => {
      switch (action.type) {
        case ShareActionKind.SHARE_SUPPORTED:
          return { ...state, shareSupported: true };
        case ShareActionKind.INTERACTED_WITH_SHARE:
          return { ...state, shareClicked: true };
        case ShareActionKind.INTERACTED_WITH_CLIPBOARD:
          return { ...state, clipboardClicked: true };
        default:
          return state;
      }
    },
    { shareSupported: false, shareClicked: false, clipboardClicked: false }
  );

  useEffect(() => {
    if (navigator && "share" in navigator) {
      dispatch({ type: ShareActionKind.SHARE_SUPPORTED });
    }
  }, []);

  return (
    <button
      onClick={() => {
        if (shareSupported) {
          dispatch({ type: ShareActionKind.INTERACTED_WITH_SHARE });
          navigator
            .share({
              title: "dato.im",
              text: "I dag",
              url: url,
            })
            .then(() => {
              // TODO: thanks for sharing
            })
            .catch((error) => {
              navigator.clipboard.writeText(url);
            });
        } else {
          dispatch({ type: ShareActionKind.INTERACTED_WITH_CLIPBOARD });
          navigator.clipboard.writeText(url);
        }
      }}
    >
      <Show when={shareSupported}>
        <Share2Icon />
      </Show>
      <Show when={!shareSupported && !clipboardClicked}>
        <ClipboardCopyIcon />
      </Show>
      <Show when={clipboardClicked}>
        <CheckCircledIcon />
      </Show>
    </button>
  );
};

export { ShareButton };
