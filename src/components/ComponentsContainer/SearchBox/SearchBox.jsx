import React from 'react'

const SearchBox = ({ searchBoxStyle, searchBoxPlaceHolder, onSearchChange }) => (
  <input
    onChange={(context) => onSearchChange(context)}
    className={searchBoxStyle}
    placeholder={searchBoxPlaceHolder}>
  </input>
)

export default SearchBox