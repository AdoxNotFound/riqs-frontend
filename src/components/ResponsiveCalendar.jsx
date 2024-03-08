import { ResponsiveTimeRange } from "@nivo/calendar";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const MyResponsiveCalendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveTimeRange
      data={[
        {
          day: "2024-03-01",
          value: 1,
        },
        {
          day: "2024-03-07",
          value: 7,
        },
        {
          day: "2024-03-12",
          value: 10,
        },
        {
          day: "2024-03-15",
          value: 15,
        },
      ]}
      from="2024-03-01"
      to="2024-03-16"
      emptyColor={colors.primary[400]}
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      dayBorderWidth={2}
      dayBorderColor={colors.grey[100]}
      legends={[]}
      theme={{
        text: {
          fill: colors.grey[100],
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
    />
  );
};

export default MyResponsiveCalendar;
