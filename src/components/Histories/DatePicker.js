import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import './date-picker.css'

function DatePicker({id, date, onSetDate}) {
	return (
		<ReactDatePicker
			id={id}
			selected={date}
			onChange={(dateValue) => onSetDate(dateValue)}
			dateFormat="yyyy/MM/dd"
		/>
	)
}

export default DatePicker
