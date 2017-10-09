import { connect } from 'react-redux';

export default connect(
    ({status}) => ({
        alertMessage: status.alertMessage
    })
)
