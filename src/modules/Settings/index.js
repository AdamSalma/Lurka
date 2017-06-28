import Drawer from './Drawer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    setSetting
} from '~/redux/actions';

import {
    getUserSettings,
    getUserSettingsDetails,
    getInternalSetting
} from '~/redux/selectors'

function mapStateToProps(state) {
    return {
        settings: getUserSettings(state),
        settingDetails: getUserSettingsDetails(state),
        internalSettings: getInternalSetting(state),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSetting
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
