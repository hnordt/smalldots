import React, { Component, PropTypes, cloneElement } from 'react'
import uniq from 'lodash/uniq'
import Form from '../Form'
import Validator from '../Validator'
import Navigator from '../Navigator'

export default class EnhancedForm extends Component {
  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
      tab: PropTypes.string,
      label: PropTypes.string,
      path: PropTypes.string,
      input: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
      size: PropTypes.number
    })).isRequired,
    initialValues: PropTypes.object,
    validations: PropTypes.object,
    onSubmit: PropTypes.func,
    children: PropTypes.func.isRequired
  }

  static defaultProps = { validations: {} }

  getTabs = () => {
    if (!this.props.fields.find(field => field.tab)) {
      return ['']
    }
    return uniq(this.props.fields.map(field => field.tab))
  }

  getFieldsByTab = tab => {
    return this.props.fields.filter(field => {
      if (tab === '') {
        return !field.tab
      }
      return field.tab === tab
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

  handleSubmit = values => {
    this.props.fields.forEach(field => this.form.setDirty(field.path))
    const errors = this.validator.getErrors()
    if (errors) {
      return
    }
    if (this.props.onSubmit) {
      this.props.onSubmit({
        values,
        isPristine: this.form.isPristine,
        isDirty: this.form.isDirty,
        getValue: this.form.getValue,
        setValue: this.form.setValue,
        setPristine: this.form.setPristine,
        setDirty: this.form.setDirty,
        reset: this.form.reset
      })
    }
  }

  renderInput = (form, field) => {
    // We verify field.path to allow rendering buttons or other elements
    const value = field.path && form.getValue(field.path)
    const setValue = event => form.setValue(field.path, (
      event && event.target ? event.target.value : event
    ))
    if (typeof field.input === 'function') {
      return field.input({ value, setValue })
    }
    return cloneElement(field.input, { value, onChange: setValue })
  }

  render() {
    const tabs = this.getTabs()
    return (
      <Form
        ref={form => this.form = form}
        initialValues={this.props.initialValues}
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
                    tabs: tabs[0] !== '' && tabs.map(tab => ({
                      label: tab,
                      active: tab === navigator.currentScene,
                      errors: this.getErrorsByTab(validator.errors, tab),
                      onClick: () => navigator.setScene(tab)
                    })),
                    fields: this.getFieldsByTab(navigator.currentScene).map(field => ({
                      ...field,
                      input: this.renderInput(form, field),
                      error: validator.errors && validator.errors[field.path]
                    })),
                    values: form.values,
                    errors: validator.errors,
                    isPristine: form.isPristine,
                    isDirty: form.isDirty,
                    getValue: form.getValue,
                    setValue: form.setValue,
                    setPristine: form.setPristine,
                    setDirty: form.setDirty,
                    reset: form.reset
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
