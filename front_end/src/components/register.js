import React, { useState } from 'react'
import { userRegister } from '../reducers/registerReducer'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
const Register = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = { username: username, password: password }
        props.userRegister(user)

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' value={username} onChange={({ target }) => setUsername(target.value)} required />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input placeholder='Password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} required />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    )

}
const ConnectedRegister = connect(null, { userRegister })(Register)
export default ConnectedRegister