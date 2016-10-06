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
      path: PropTypes.string.isRequired,
      input: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
      size: PropTypes.number
    })).isRequired,
    initialValues: PropTypes.object,
    validations: PropTypes.object,
    renderTabs: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFields: PropTypes.func,
    renderFooter: PropTypes.func,
    onSubmit: PropTypes.func
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
      this.props.onSubmit({ ...this.form, values, errors })
    }
  }

  renderInput = (form, field) => {
    const value = form.getValue(field.path)
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
                  [tab]: (
                    <div>
                      {tabs[0] !== '' && this.props.renderTabs && this.props.renderTabs({
                        ...form,
                        tabs: tabs.map(tab => ({
                          label: tab,
                          active: tab === navigator.currentScene,
                          errors: this.getErrorsByTab(validator.errors, tab),
                          onClick: () => navigator.setScene(tab)
                        }))
                      })}
                      {this.props.renderHeader && this.props.renderHeader({
                        ...form,
                        errors: validator.errors
                      })}
                      {this.props.renderFields && this.props.renderFields({
                        ...form,
                        fields: this.getFieldsByTab(navigator.currentScene).map(field => ({
                          ...field,
                          input: this.renderInput(form, field),
                          error: validator.errors && validator.errors[field.path]
                        }))
                      })}
                      {this.props.renderFooter && this.props.renderFooter({
                        ...form,
                        errors: validator.errors
                      })}
                    </div>
                  )
                }), {})}
              </Navigator>
            )}
          </Validator>
        )}
      </Form>
    )
  }
}
