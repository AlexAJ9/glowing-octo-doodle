import { connect } from 'react-redux'
import React, { useState } from 'react'
import { userLogin } from '../reducers/loginReducer'
import { newNotification } from '../reducers/notificationReducer'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'


const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        const credentials = {
            username: username,
            password: password
        }
        props.userLogin(credentials)
    }

    return (
        <div>
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form onSubmit={handleLogin}>
                            <Form.Input icon='user' value={username} onChange={({ target }) => setUsername(target.value)} iconPosition='left' label='Username' placeholder='Username' />
                            <Form.Input icon='lock' type='password' value={password} onChange={({ target }) => setPassword(target.value)} iconPosition='left' label='Password' />
                            <Button type='submit' content='Login' primary />
                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Button as={Link} to='/register' content='Sign up' icon='signup' size='big' />
                    </Grid.Column>
                </Grid>
                <Divider vertical>Or</Divider>
            </Segment>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

const ConnectedLogin = connect(mapStateToProps, { userLogin })(LoginForm)
export default withRouter(ConnectedLogin)