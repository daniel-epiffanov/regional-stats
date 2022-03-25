import _ from 'lodash'

const removeExtraSpaces = (str: string) => _.trim(str.replace(/\s\s+/g, ' '))

export default removeExtraSpaces
