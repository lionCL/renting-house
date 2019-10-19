import React, { Component } from 'react'
import { PickerView } from 'antd-mobile'

//导入子组件
import FilterFooter from '@/views/HouseList/components/FilterFooter'

export default class FilterPicker extends Component {
  constructor(props) {
    super()
    this.state = {
      value: props.defaultValue
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue
    })
  }

  //
  onChange = value => {
    this.setState({
      value
    })
  }

  render() {
    const { data, cols, type, onCancel, onSave } = this.props
    const { value } = this.state

    return (
      <div>
        <PickerView
          data={data}
          cols={cols}
          value={value}
          onChange={this.onChange}
        />
        {/* FilterFooter */}
        <FilterFooter
          onCancel={onCancel}
          onSave={() => {
            onSave(type, value)
          }}
        />
      </div>
    )
  }
}
