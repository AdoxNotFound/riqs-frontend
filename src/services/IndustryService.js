import axiosInstance from "./axiosInstance";

export const industryReconection = async (userToken) => {
  try {
    const response = await axiosInstance.get("/auth/reconection", {
      headers: {
        Authorization: userToken,
      },
    });
    return response;
  } catch (error) {
    // Verifica si el error es debido a un límite de solicitudes (status 429)
    if (error.response && error.response.status === 429) {
      // Espera un tiempo antes de reintentar
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos antes de reintentar
      // Reintenta la solicitud
      return industryReconection(userToken);
    } else {
      // Si no es un error de límite de solicitudes, relanza el error
      console.error("Error al realizar la solicitud Axios:", error);
      throw error;
    }
  }
};

export const getIndustrySettings = async (userToken) => {
  try {
    const response = await axiosInstance.get("/industry/settings", {
      headers: {
        Authorization: userToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al enviar la solicitud de revisión:", error);
  }
};

export const uploadWeeklyFile = async (userToken, file, setFileInfo) => {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: userToken,
    },
  };

  try {
    const response = await axiosInstance.post(
      "/industry/upload-xls",
      formData,
      config
    );

    //console.log("Archivo enviado correctamente:", response.data);
    setFileInfo(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al enviar el archivo:", error);
    throw error;
  }
};

export const reviewAcopio = async (
  userToken,
  fileName,
  //worksheet,
  setRows,
  setTotal
) => {
  try {
    const headers = {
      Authorization: userToken,
    };
    const data = {
      name_file: fileName,
      //worksheet: worksheet,
    };
    const response = await axiosInstance.post("/industry/import-acopio", data, {
      headers,
    });
    //console.log("Solicitud de revisión enviada con éxito:", response.data);

    // Formatear los datos para que coincidan con el formato del Data Grid
    const formattedRows = response.data.data.map((item, index) => ({
      id: index + 1,
      date_reception: item.date_reception,
      resume_tm_bruto: item.resume_tm_bruto,
      resume_tm_liquido: item.resume_tm_liquido,
    }));

    setRows(formattedRows);
    setTotal(Number(response.data.total[0].total_tm_liquido));
  } catch (error) {
    console.error("Error al enviar la solicitud de revisión:", error);
  }
};

export const reviewPriceClosing = async (
  userToken,
  fileName,
  worksheet,
  setRows,
  setTotal
) => {
  try {
    const headers = {
      Authorization: userToken,
    };
    const data = {
      name_file: fileName,
      worksheet: worksheet,
    };
    const response = await axiosInstance.post(
      "/industry/import-priceclosing",
      data,
      {
        headers,
      }
    );
    //console.log("Solicitud de revisión enviada con éxito:", response.data);

    // Formatear los datos para que coincidan con el formato del Data Grid
    const formattedRows = response.data.data.map((item, index) => ({
      id: index + 1,
      regimen: item.regimen,
      date_close: item.date_close,
      vendor_document: item.vendor_document,
      vendor: item.vendor,
      month_reception: item.month_reception,
      received_tm: item.received_tm,
      price_close_tm: item.price_close_tm,
      amount_total_sus: item.amount_total_sus,
    }));

    setRows(formattedRows);
    setTotal([
      Number(response.data.total[0].total_received_tm),
      Number(response.data.total[0].total_amount_total_sus),
    ]);
  } catch (error) {
    console.error("Error al enviar la solicitud de revisión:", error);
  }
};

// /industry/save-stock
export const saveProductStocks = async (userToken, productList) => {
  try {
    const headers = {
      Authorization: userToken,
    };
    const data = {
      stocks: productList,
    };
    await axiosInstance.post("/industry/save-stock", data, {
      headers,
    });
    //console.log(response.data);
  } catch (error) {
    console.error("Error al enviar la solicitud de revisión:", error);
  }
};

export const saveEmptyPeriod = async (userToken) => {
  try {
    const headers = {
      Authorization: userToken,
    };

    await axiosInstance.post("/industry/save-not-transaction-all", null, {
      headers,
    });
    //console.log(response.data);
  } catch (error) {
    console.error("Error al enviar la solicitud de revisión:", error);
  }
};

export const saveEmptyOption = async (userToken, option) => {
  try {
    const headers = {
      Authorization: userToken,
    };

    const data = {
      option_type: option,
    };

    await axiosInstance.post("/industry/save-not-transaction", data, {
      headers,
    });
  } catch (error) {
    console.error("Error al enviar la solicitud de revisión:", error);
  }
};
