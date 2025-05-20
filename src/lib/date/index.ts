import dayjs from "dayjs";
import ptbr from "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale(ptbr);
dayjs.extend(LocalizedFormat);
dayjs.extend(customParseFormat);
