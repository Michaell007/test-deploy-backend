import { I18n } from "i18n";
import path from "path";

const i18n = new I18n({
    locales: ['en', 'fr'],
    directory: path.join(__dirname, '/locales'),
    defaultLocale: 'fr'
})

export default i18n