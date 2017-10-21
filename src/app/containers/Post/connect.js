import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    submitThreadPost,
    submitBoardPost
} from '~/redux/actions';

import {
    getCurrentBoardInfo
} from '~/redux/selectors'

function mapStateToProps(state) {
    return {
        currentBoardInfo: getCurrentBoardInfo(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitThreadPost
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
