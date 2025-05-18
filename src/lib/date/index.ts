import dayjs from 'dayjs';
import ptbr from 'dayjs/locale/pt-br';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale(ptbr);
dayjs.extend(LocalizedFormat)