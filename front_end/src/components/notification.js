import React from 'react'
import { Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'
const Notification = (props) => {
    if (props.notification.message === null) {
        return null
    }

    const type = props.notification.type === 'success' ? 'positive' : 'negative'
    if (props.notification.type === 'success') {
        return (
            <div>
                <Message success >
                    <Message.Header>{props.notification.message}</Message.Header>
                </Message>
                <p style={{ display: 'none'} } > { setTimeout(()=> props.newNotification({message: null, type: null }),3000)}</p>
            </div>
        )
    }
    return (
        <div>
            <Message negative>
                <Message.Header>{props.notification.message}</Message.Header>
                <p>Try again please.</p>
                <p style={{ display: 'none'} } > { setTimeout(()=> props.newNotification({message: null, type: null }),5000)}</p>
        </Message>
        
        </div >
    )

}
const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}
const ConnectedNotification = connect(mapStateToProps, { newNotification })(Notification)
export default ConnectedNotification 