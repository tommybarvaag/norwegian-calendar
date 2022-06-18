import { styled } from "stitches.config";

const Card = styled("div", {
  appearance: "none",
  boxShadow: "$card",
  boxSizing: "border-box",
  font: "inherit",
  lineHeight: "1",
  userSelect: "none",
  outline: "none",
  padding: 0,
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  backgroundColor: "$main",
  display: "block",
  textDecoration: "none",
  color: "inherit",
  flexShrink: 0,
  borderRadius: "$2",
  position: "relative",

  variants: {
    padding: {
      small: {
        padding: "$3",
      },
      medium: {
        padding: "$4",
      },
      large: {
        padding: "$6",
      },
      xl: {
        padding: "$8",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    ghost: {
      true: {
        backgroundColor: "transparent",
        boxShadow: "0px 24px 32px rgba(0, 0, 0, 0.08)",
        borderColor: "transparent",
        borderRadius: "6px",
      },
    },
  },
  defaultVariants: {
    padding: "small",
  },
});

export { Card };
