"use client";

import { Show } from "@/components/ui";
import { FC, useEffect, useReducer } from "react";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>
      </Show>
      <Show when={!shareSupported && !clipboardClicked}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
          />
        </svg>
      </Show>
      <Show when={clipboardClicked}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
          />
        </svg>
      </Show>
    </button>
  );
};

export { ShareButton };
