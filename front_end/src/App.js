import React, { useState, useEffect } from 'react';
import Login from './components/login'
import Register from './components/register'
import dataService from './services/dataService'
import Form from './components/dataForm'
import List from './components/dataList'
import Notification from './components/notification'
import UpdateForm from './components/updateForm'
import { initAll } from './reducers/dataReducer'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Container, Button, Dropdown, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';
const App = (props) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        props.initAll()
        const loggedUserJSON = window.localStorage.getItem('loggedappUser')
        if (loggedUserJSON) {
            console.log(loggedUserJSON)
            const currentUser = JSON.parse(loggedUserJSON)
            console.log(currentUser)
            setUser(JSON.parse(loggedUserJSON))
            dataService.setToken(currentUser.token)
        }
    }, [props.user])


    // useEffect(() => {
    //     if (props.user) {
    //         setUser(props.user)
    //         dataService.setToken(user.token)
    //     }
    //     props.initAll()

    // }, [])

    const matchId = (id) => props.data.find(x => x.id === id.toString())

    // const handleLogoOut = () => {
    //     window.localStorage.clear()
    // }
    // const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <Container>
            <Router>

                <Route exact path='/edit/:id' render={({ match }) => <UpdateForm item={matchId(match.params.id)} />} />
                <Route exact path='/' render={() => user ? <List /> : <Redirect to='/login' />} />
                <Route path='/login' render={() => user === null ? <Login /> : <Redirect to='/' />} />
                <Route path='/register' render={() => <Register />} />
                <Route path='/create' render={() => <Form />} />
                <Notification />
            </Router>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        user: state.loggedUser
    }
}
const ConnectedApp = connect(mapStateToProps, { initAll })(App)
export default ConnectedApp
