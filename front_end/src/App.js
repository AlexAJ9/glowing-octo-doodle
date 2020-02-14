import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { Container, Button, Menu } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

import Login from './components/login'
import Register from './components/register'
import dataService from './services/dataService'
import Form from './components/dataForm'
import List from './components/dataList'
import Notification from './components/notification'
import UpdateForm from './components/updateForm'
import Profile from './components/profile'

import { initAll } from './reducers/dataReducer'
import { userLogOut } from './reducers/loginReducer'

import './components/style.css'

const App = (props) => {

    const [user, setUser] = useState(null)
    const [activeItem, setActiveItem] = useState('home')
   

    const logOut = () => setUser(null)
    const matchId = (id) => props.data.find(x => x.id === id.toString())
    const handleItemClick = (e, { name }) => setActiveItem(name)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedappUser')
        if (loggedUserJSON) {
            const currentUser = JSON.parse(loggedUserJSON)
            setUser(JSON.parse(loggedUserJSON))
            dataService.setToken(currentUser.token)
        }
    }, [props])

    

    useEffect(() => {
        props.initAll()
    }, [])

    const handleLogoOut = (e) => {
        e.preventDefault()
        window.localStorage.clear()
        props.userLogOut()
        logOut()

    }

    const Nav = () => {
        return (
            <Menu size='large'>
                <Menu.Item name='home' as={Link} to='/' active={activeItem === 'home'} onClick={handleItemClick} />
                <Menu.Item name='create' as={Link} to='/create' active={activeItem === 'create'} onClick={handleItemClick} />
                <Menu.Item name='profile' as={Link} to='/profile' active={activeItem === 'profile'} onClick={handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <form onSubmit={handleLogoOut}><Button type='submit' primary> Sign out</Button></form>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }

    return (
        <Container>
            <Router>
                {user ? Nav() : null}
                <Route exact path='/edit/:id' render={({ match }) => user ? <UpdateForm item={matchId(match.params.id)} /> : <Redirect to='/login' />} />
                <Route exact path='/' render={() => user ? <List /> : <Redirect to='/login' />} />
                <Route path='/profile' render={() => user ? <Profile  /> : <Redirect to='/login' />} />
                <Route path='/login' render={() => user === null ? <Login /> : <Redirect to='/' />} />
                <Route path='/register' render={() => <Register />} />
                <Route path='/create' render={() => user ? <Form /> : <Redirect to='/login' />} />
                <Notification />
            </Router>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        user: state.user,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    initAll,
    userLogOut
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
