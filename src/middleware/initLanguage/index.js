import _ from 'lodash'

export default (i18n) => (req, res, next) => {
  const acceptLangHeader = _.get(req.headers, 'accept-language')
  let locale = 'fr'

  if (acceptLangHeader) {
    const firstLang = acceptLangHeader.split(',')[0]

    if (firstLang) {
      const firstPart = firstLang.split('-')[0]

      if (firstPart) {
        locale = firstPart
      }
    }
  }

  i18n.setLocale(locale)
  req.mylang = locale

  next()
}