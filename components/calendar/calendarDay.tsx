import { mergeCss } from "@/utils/cssUtils";
import type { VariantProps } from "stitches.config";
import { CSS, styled } from "stitches.config";
import { Flex } from "../ui";

const CalendarEntryStyled = styled(Flex, {
  variants: {
    isSunday: {
      true: {
        color: "$green10",
      },
    },
    isHoliday: {
      true: {
        color: "$red10",
      },
    },
    isWeekNumber: {
      true: {
        color: "$gray11",
      },
    },
  },
});

const CalendarEntry: React.FC<VariantProps<typeof CalendarEntryStyled> & { children?: React.ReactNode; isWorkDay?: boolean; css?: CSS }> = ({
  children,
  isWorkDay = false,
  css,
  ...other
}) => {
  return (
    <CalendarEntryStyled
      justifyContent="center"
      css={mergeCss(
        {
          padding: "$1",
        },
        css
      )}
      {...other}
    >
      {children}
    </CalendarEntryStyled>
  );
};

export { CalendarEntry };
