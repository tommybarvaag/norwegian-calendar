import { Flex, Text } from "../ui";

const CalendarDayHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      css={{
        py: "$2",
      }}
    >
      <Text size="1" color="textDark">
        {children}
      </Text>
    </Flex>
  );
};

export { CalendarDayHeading };
