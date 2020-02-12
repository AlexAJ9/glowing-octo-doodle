import { connect } from 'react-redux'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Segment } from 'semantic-ui-react'

import { userRegister } from '../reducers/registerReducer'
import { newNotification } from '../reducers/notificationReducer'

import './style.css'


const Register = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = { username: username, password: password }
        props.userRegister(user)
        props.history.push('/login')
    }

    return (
        <div className='dcontainer'>
        <Segment placeholder>
            <Form onSubmit={handleSubmit}>
                <Form.Field className='register'>
                    <label>Username</label>
                    <input placeholder='Username' value={username} onChange={({ target }) => setUsername(target.value)} required />
                </Form.Field>
                <Form.Field className='register'>
                    <label>Password</label>
                    <input placeholder='Password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} required />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Segment>
        </div>
    )

}
const mapDispatchToProps = {
    userRegister,
    newNotification
}
const ConnectedRegister = connect(null, mapDispatchToProps)(Register)
export default withRouter(ConnectedRegister)