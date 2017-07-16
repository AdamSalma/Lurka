import endpoints from './endpoints'
import Axios from 'axios'
// import getBoard from './getBoard'

const defaultHeaders = {}

export default {
    getBoard: (boardID, headers = defaultHeaders) =>
        Axios.get(endpoints.createBoard(boardID))
}
