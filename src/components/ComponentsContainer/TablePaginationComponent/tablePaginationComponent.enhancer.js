import { compose, withHandlers, withState, withPropsOnChange } from 'recompose'

const CERO = 0
const UNO = 1
const DOS = 2
const PERCENTAGE_LEFT = 0.5
const EMPTY_ARRAY = []
const INITIAL_STATE = {
  values: {
    dataTable: EMPTY_ARRAY,
    dataTableOrdered: EMPTY_ARRAY,
    allButtons: EMPTY_ARRAY,
    tractBuilt: EMPTY_ARRAY,
    activeNumberPag: UNO,
    leftButtons: CERO,
    rightButtons: CERO
  },
}
const _buildOrdereObject = (elem, dataIds) => (
  dataIds.reduce((acc, item) => {
    acc.push(elem[item])

    return acc
  }, [])
)
const _buildDataTable = (columnFields, dataSets) => {
  const dataIds = columnFields.map((elem) => elem.id)
  const finalDataSets = dataSets.map((elem) => (_buildOrdereObject(elem, dataIds)))

  return finalDataSets
}
const _generateDataTableFiltered = (selection, dataSets, maxTableItems) => {
  const selectedPosition = (selection - UNO) * maxTableItems
  const firstSliceData = dataSets.slice(selectedPosition, dataSets.length)
  const finalPosition = firstSliceData.length >= maxTableItems ? maxTableItems : firstSliceData.length

  return firstSliceData.slice(CERO, finalPosition)
}
const _makeTernaryOperation = (isTrueValue, resultA, resultB) => (isTrueValue ? resultA : resultB)
const _calculateGenericRangeButtonsWayAdd = (valueA, valueB, result) => (((result - valueA) / (valueB + UNO)))
const getRightLeftPositions = (params) => {
  const { activeNumber, wayButtons, wayUntilPosition, isRight } = params

  if(isRight){
    const rightLeftA = _calculateGenericRangeButtonsWayAdd(activeNumber, wayButtons, activeNumber + wayButtons)
    const rightLeftB = _calculateGenericRangeButtonsWayAdd(activeNumber, wayUntilPosition, activeNumber + wayUntilPosition)
    
    return [rightLeftA, rightLeftB]
  }

  return [- UNO, - UNO]
}
const getCalculatePositions = (params) => {
  const { activeNumber, wayButtons, wayUntilPosition } = params
  const [rightLeftA, rightLeftB] = getRightLeftPositions(params)
  const calculatePositionA =  activeNumber + rightLeftA + wayButtons * rightLeftA
  const calculatePositionB =  activeNumber + rightLeftB + wayUntilPosition * rightLeftB

  return { calculatePositionA, calculatePositionB }
}
const _validateRangeButtonsWay = (wayUntilPosition, wayButtons, activeNumber, isRight) => {
  const isPositionsGreater = wayUntilPosition >= wayButtons
  const params = { activeNumber, wayButtons, wayUntilPosition, isRight }
  const { calculatePositionA, calculatePositionB } = getCalculatePositions(params)
  const position = _makeTernaryOperation(isPositionsGreater, calculatePositionA, calculatePositionB)
  const need = _makeTernaryOperation(isPositionsGreater, CERO, wayButtons - wayUntilPosition)
  const surPlus = _makeTernaryOperation(isPositionsGreater, wayUntilPosition - wayButtons, CERO)
  
  return { position, need, surPlus }
}
const _isButtonDisabled = (active, number) => (active === number)
const _validateIsWithClass = (active, elem, styleClass) => (active === elem ? styleClass : '')
const _buildStartEndPositions = (start, end) => ({ start, end })
const _analyzePositionWithEnds = (params) => {
  const { rightUntilPosition, rightButtons, leftUntilPosition, leftButtons, activeNumber } = params
  const leftRange = _validateRangeButtonsWay(leftUntilPosition, leftButtons, activeNumber)
  const rightRange = _validateRangeButtonsWay(rightUntilPosition, rightButtons, activeNumber, UNO)
  const { position: posLeft, need: needLeft, surPlus: surLeft } = leftRange
  const { position: posRight, need: needRight, surPlus: surRight } = rightRange
  
  if(!needLeft && needRight) {
    const start = surLeft >= needRight ? posLeft - needRight : posLeft

    return _buildStartEndPositions(start, posRight)
  }
  else if(needLeft && !needRight)
  {
    const end = surRight >= needLeft ? posRight + needLeft : posRight

    return _buildStartEndPositions(posLeft, end)
  }
  
  return _buildStartEndPositions(posLeft, posRight)
}
const _buildTractPositionsArray = (state, activeNumber, allButtonsArray) => {
  const { values: { leftButtons, rightButtons }} = state
  const leftUntilPosition = allButtonsArray.slice(CERO, activeNumber - UNO).length
  const rightUntilPosition = allButtonsArray.slice(activeNumber, allButtonsArray.length).length
  const params = { rightUntilPosition, rightButtons, leftUntilPosition, leftButtons, activeNumber }
  const { start, end } = _analyzePositionWithEnds(params)

  return allButtonsArray.slice(start, end)
}
const _manageLeftRightButtonsPag = (maxItemsPag) => {
  const leftResult = maxItemsPag * PERCENTAGE_LEFT
  const leftButtons = leftResult % DOS !== CERO ? Math.trunc(leftResult) : leftResult
  const rightButtons = maxItemsPag - UNO - leftButtons

  return({ leftButtons, rightButtons })
}
const _buildContentPagination = (lengthItems, tractNumber, selectedButtonStyle, activeNumber) => (
  _calculateQuantityButtons(lengthItems, tractNumber).map((elem) => (
    { label: elem, class: _validateIsWithClass(activeNumber, elem, selectedButtonStyle) }
  ))
)
const _calculateQuantityButtons = (lengthItems, tractNumber) => {
  const modButtonsPagination = lengthItems % tractNumber === CERO ? CERO : UNO
  const entirePartDiv = Math.trunc(lengthItems / tractNumber)

  return [...Array(entirePartDiv + modButtonsPagination + UNO).keys()].slice(UNO)
}
const _includeArrowButtonsPagination = (numberButtons, activeNumber,lengthButtons) => {
  const findArrowInside = numberButtons.find((elem) => elem.label === '<<')
  const newNumberButtons = findArrowInside ? numberButtons.slice(DOS, numberButtons.length - DOS) : numberButtons
  const allButtons = [
    { label: '<<', numberOnclick: UNO, disabled: _isButtonDisabled(activeNumber, UNO)},
    { label: '<', numberOnclick: activeNumber - UNO, disabled: _isButtonDisabled(activeNumber, UNO)},
    { label: '>', numberOnclick: activeNumber + UNO, disabled: _isButtonDisabled(activeNumber, lengthButtons) },
    { label: '>>', numberOnclick: lengthButtons, disabled: _isButtonDisabled(activeNumber, lengthButtons) },    
  ]

  allButtons.splice(DOS, CERO, ...newNumberButtons)

  return allButtons
}
const withInputHandlers = withHandlers({
  onClickPagination: (props) => (number) => {
    const { state: { values }, updateState, dataSets, tractNumber, selectedItemPagStyle } = props
    const newAllButtons = _buildContentPagination(dataSets.length, tractNumber, selectedItemPagStyle, number)
    const dataButtons = _buildTractPositionsArray(props.state, number, newAllButtons)
    const withArrowButtons = _includeArrowButtonsPagination(dataButtons, number, values.allButtons.length)
    const dataTable = _generateDataTableFiltered(number, values.dataTableOrdered, tractNumber)
    const newValues = { ...values, dataTable, activeNumberPag: number, tractBuilt: withArrowButtons }

    updateState({ values: newValues })
  },
})
const _validateItemsQuantityAccepted = (maxItemsPag, lengthItems) => {
  if(lengthItems >= maxItemsPag){
    const leftRightButtons = _manageLeftRightButtonsPag(maxItemsPag)

    return { ...leftRightButtons }
  }

  return {}
}

export default compose(
  withState('state', 'updateState', INITIAL_STATE),
  withPropsOnChange(['dataSets'], (props) => {
    const { columnFields, selectedItemPagStyle, dataSets, tractNumber, updateState, maxItemsPag } = props
    const newAllButtons = _buildContentPagination(dataSets.length, tractNumber, selectedItemPagStyle, UNO)
    const tractBuilt = newAllButtons.length >= maxItemsPag ? newAllButtons.slice(CERO, maxItemsPag) : newAllButtons
    const leftRigthValues = _validateItemsQuantityAccepted(maxItemsPag, tractBuilt.length)
    const withArrowButtons = _includeArrowButtonsPagination(tractBuilt, UNO, newAllButtons.length)
    const dataTableOrdered = _buildDataTable(columnFields, dataSets)
    const dataTable= _generateDataTableFiltered(UNO, dataTableOrdered, tractNumber)
    const values = {
      dataTable,
      dataTableOrdered,
      activeNumberPag: UNO,
      tractBuilt: withArrowButtons,
      allButtons: newAllButtons,
      ...leftRigthValues
    }
    
    updateState({ values })
  }),
  withInputHandlers,
)




