import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box } from "@mui/material";
import Header from "../../components/Header";
//import { tokens } from "../../theme";

const Calendar = () => {
  //const theme = useTheme();
  //const colors = tokens(theme.palette.mode);

  // Fechas a resaltar
  const highlightedDates = [
    { date: "2024-03-10", backgroundColor: "red" },
    { date: "2024-03-15", backgroundColor: "blue" },
    { date: "2024-03-20", backgroundColor: "green" },
  ];

  const obtenerNombreDia = (date) => {
    const diasSemana = ["L", "M", "M", "J", "V", "S", "D"];
    return diasSemana[date.getDay()];
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR */}
        <Box width={250} height={300}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={highlightedDates.map(({ date, backgroundColor }) => ({
              title: "",
              date,
              display: "background",
              backgroundColor,
            }))}
            selectable={false}
            editable={false}
            dayMaxEventRows={true}
            dayMaxEvents={true}
            nowIndicator={false}
            headerToolbar={{
              left: "",
              center: "",
              right: "",
            }}
            dayHeaderContent={({ date }) => obtenerNombreDia(date)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
