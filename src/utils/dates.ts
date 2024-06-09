import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: string) => {
  const data = new Date(date);

  const option: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("pt-BR", option).format(data);

  return formattedDate;
};

export const formatExtendedDateTime = (date: string) => {
  const formatString = "d LLL y '-' HH:mm";
  return format(new Date(date), formatString, {
    locale: ptBR,
  });
};
