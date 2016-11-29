import React, { Component, PropTypes, cloneElement } from 'react'
import uniq from 'lodash/uniq'
import Form from '../Form'
import Validator from '../Validator'
import Navigator from '../Navigator'

export default class EnhancedForm extends Component {
  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
      tab: PropTypes.string,
      label: PropTypes.node,
      path: PropTypes.string.isRequired,
      input: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
      size: PropTypes.number
    })).isRequired,
    initialValues: PropTypes.object,
    validations: PropTypes.object,
    onSubmit: PropTypes.func,
    children: PropTypes.func.isRequired
  }

  getForm() {
    return this.form
  }

  getTabs = () => {
    if (!this.props.fields.find(field => field.tab)) {
      return ['']
    }
    return uniq(this.props.fields.filter(field => field.tab).map(field => field.tab))
  }

  getFieldsByTab = tab => {
    return this.props.fields.filter(field => {
      return !field.tab || field.tab === tab
    })
  }

  getErrorsByTab = (errors, tab) => {
    if (!errors) {
      return null
    }
    const fields = this.getFieldsByTab(tab)
    const fieldsWithError = fields.filter(field => errors[field.path])
    if (!fieldsWithError.length) {
      return null
    }
    return fieldsWithError
  }

  parseForm(form) {
    if (!form) {
      return {}
    }
    return {
      isPristine: form.isPristine,
      isDirty: form.isDirty,
      isSubmitted: form.isSubmitted,
      getValue: form.getValue,
      setValue: form.setValue,
      setPristine: form.setPristine,
      setDirty: form.setDirty,
      submit: form.handleSubmit,
      reset: form.reset
    }
  }

  submit = () => this.form.handleSubmit()

  handleSubmit = values => {
    this.props.fields.forEach(field => this.form.setDirty(field.path))
    const errors = this.validator.getErrors()
    if (errors) {
      return
    }
    if (this.props.onSubmit) {
      this.props.onSubmit({ ...this.parseForm(this.form), values })
    }
  }

  renderInput = (form, field, errors) => {
    const value = form.getValue(field.path)
    const setValue = event => form.setValue(field.path, (
      event && event.target ? event.target.value : event
    ))
    if (typeof field.input === 'function') {
      return field.input({
        form: this.parseForm(form),
        field,
        value,
        setValue,
        errors
      })
    }
    return cloneElement(field.input, { value, onChange: setValue })
  }

  render() {
    const tabs = this.getTabs()
    return (
      <Form
        ref={form => this.form = form}
        initialValues={this.props.initialValues}
        noValidate={true}
        onSubmit={this.handleSubmit}
      >
        {form => (
          <Validator
            ref={validator => this.validator = validator}
            validations={this.props.validations}
            values={form.values}
          >
            {validator => (
              <Navigator initialScene={tabs[0]}>
                {navigator => tabs.reduce((result, tab) => ({
                  ...result,
                  [tab]: this.props.children({
                    ...this.parseForm(form),
                    tabs: tabs[0] !== '' && tabs.map(tab => ({
                      label: tab,
                      active: tab === navigator.currentScene,
                      errors: this.getErrorsByTab(validator.errors, tab),
                      onClick: () => navigator.setScene(tab)
                    })),
                    fields: this.getFieldsByTab(navigator.currentScene).map(field => ({
                      ...field,
                      input: this.renderInput(form, field, validator.errors),
                      error: validator.errors && validator.errors[field.path]
                    })),
                    values: form.values,
                    errors: validator.errors
                  })
                }), {})}
              </Navigator>
            )}
          </Validator>
        )}
      </Form>
    )
  }
}
