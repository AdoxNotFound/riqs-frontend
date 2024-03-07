import { industryReconection } from "../services/IndustryService";

export const handleReconection = async (token, updateIndustrySettings) => {
  try {
    const response = await industryReconection(token);
    // Verifica si la respuesta es válida y actualiza el contexto de la API
    if (response && response.data) {
      const optionNames = response.data.data.options.map(
        (option) => option.short_name
      );

      updateIndustrySettings({
        periodName: response.data.data.period.name,
        year: response.data.data.period.year,
        month: response.data.data.period.month,
        biweekly: response.data.data.period.biweekly,
        startDate: response.data.data.period.date_start,
        endDate: response.data.data.period.deadline,
        limitDate: response.data.data.period.second_deadline,
        today: response.data.data.today,
        periodStatus: {
          daysLeft: response.data.data.period.day_estatus.days_left,
          daysLate: response.data.data.period.day_estatus.days_late,
          dayStatus: response.data.data.period.day_estatus.status,
        },
        status: response.data.data.period.status,
        industryOptions: optionNames,
      });

      console.log(optionNames);
    } else {
      console.error("La respuesta de userReconection no es válida.");
    }
  } catch (error) {
    console.error("Error al realizar la solicitud de userReconection:", error);
  }
};
