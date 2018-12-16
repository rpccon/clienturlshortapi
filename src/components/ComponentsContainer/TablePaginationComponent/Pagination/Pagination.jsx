import React from 'react'

const Pagination = (props) => {
	const { styleClass, tractBuilt, onClickPagination } = props

	return (
		<div className={styleClass}>
			{tractBuilt.map((elem) => (
				<button
					disabled={elem.disabled}
					key={elem.label}
					onClick={() => onClickPagination(isNaN(elem.label) ? elem.numberOnclick : elem.label)}
					className={elem.class}
				>
					{elem.label}
				</button>
			))}
		</div>
	)
}

export default Pagination