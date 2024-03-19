import {
  reviewAcopio,
  reviewPriceClosing,
} from "../../services/IndustryService";

export const rowConfig = {
  acopio: {
    simpleDialog: true,
    reviewFunction: reviewAcopio,
    columns: [
      { field: "id", headerName: "ID", width: 50, sortable: false },
      {
        field: "date_reception",
        headerName: "Fecha de Recepción",
        width: 180,
        sortable: false,
      },
      {
        field: "resume_tm_bruto",
        headerName: "Resumen TM Bruto",
        width: 180,
        type: "number",
        sortable: false,
      },
      {
        field: "resume_tm_liquido",
        headerName: "Resumen TM Líquido",
        width: 180,
        type: "number",
        sortable: false,
      },
    ],
  },
  priceclosing: {
    simpleDialog: true,
    reviewFunction: reviewPriceClosing,
    columns: [
      { field: "id", headerName: "ID", width: 50, sortable: false },
      { field: "regimen", headerName: "Régimen", width: 180, sortable: false },
      {
        field: "date_close",
        headerName: "Fecha de cierre",
        width: 180,
        sortable: false,
      },
      {
        field: "vendor_document",
        headerName: "CI o RAU",
        width: 180,
        sortable: false,
      },
      {
        field: "vendor",
        headerName: "Nombre vendedor",
        width: 180,
        sortable: false,
      },
      {
        field: "month_reception",
        headerName: "Mes de recepción",
        width: 180,
        sortable: false,
      },
      {
        field: "received_tm",
        headerName: "TM recibida",
        width: 180,
        type: "number",
        sortable: false,
      },
      {
        field: "price_close_tm",
        headerName: "TM precio cerrado",
        width: 180,
        sortable: false,
        type: "number",
      },
      {
        field: "amount_total_sus",
        headerName: "Total dolares",
        width: 180,
        sortable: false,
        type: "number",
      },
    ],
  },
  production: {
    simpleDialog: false,
    reviewFunction: reviewAcopio,
    columns: [{ field: "id", headerName: "ID", width: 50, sortable: false }],
  },
  stock: {
    simpleDialog: false,
    reviewFunction: reviewAcopio,
    columns: [{ field: "id", headerName: "ID", width: 50, sortable: false }],
  },

  /*
  falta:
  -hss
  -his
  -cs
  -acs
  -ars
  -exp
  */
};
