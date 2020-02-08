import React, { useState, useEffect } from 'react';
import Login from './components/login'
import Register from './components/register'
import dataService from './services/dataService'
import Form from './components/dataForm'
import List from './components/dataList'
import UpdateForm from './components/updateForm'
import { initAll } from './reducers/dataReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Button, Dropdown, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';
const App = (props) => {


    const [activeItem, setActiveItem] = useState('home')
    const [user, setUser] = useState(null)

    useEffect(() => {
        props.initAll()
        const loggedUserJSON = window.localStorage.getItem('loggedappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            dataService.setToken(user.token)
        }
    }, [])

    const matchId = (id) => props.data.find(x => x.id === id.toString())

    const handleLogoOut = () => {
        window.localStorage.clear()
    }
    const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <Container>
            <Router>
                <Menu size='large'>
                    <Menu.Item name='home' as={Link} to='/home' active={activeItem === 'home'} onClick={handleItemClick} />
                    <Menu.Item name='create' as={Link} to='/create' active={activeItem === 'messages'} onClick={handleItemClick} />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button as={Link} to='/login' onClick={handleLogoOut} primary>Logout</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Route exact path='/edit/:id' render={({ match }) => <UpdateForm item={ matchId(match.params.id)} />} />
                < Route exact path='/home' render={() => <List />} />
                <Route path='/' render={() => <Login />} />
                <Route path='/register' render={() => <Register />} />
                <Route path='/create' render={() => <Form />} />
            </Router>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}
const ConnectedApp = connect(mapStateToProps, { initAll })(App)
export default ConnectedApp
