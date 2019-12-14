import { required, email, confirmed } from 'vee-validate/dist/rules'
import { extend, configure } from 'vee-validate'
import i18n from '../i18n'

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`vee-field.${field}`)
    if (values._target_) values._target_ = i18n.t(`vee-field.${values._target_}`)

    return i18n.t(`vee-validation.${values._rule_}`, values)
  }
})

extend('required', required)

extend('email', email)

extend('confirmed', confirmed)
