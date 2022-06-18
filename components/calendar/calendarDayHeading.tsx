import { mergeCss } from "@/utils/cssUtils";
import { CSS } from "stitches.config";
import { Flex, Text } from "../ui";

const CalendarDayHeading: React.FC<{ children: React.ReactNode; css?: CSS }> = ({ children, css }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      css={mergeCss({
        py: "$2",
      }, css)}
    >
      <Text size="1" color="textDark">
        {children}
      </Text>
    </Flex>
  );
};

export { CalendarDayHeading };
