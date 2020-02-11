import React, { useState } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import { Container, Button, Dropdown, Menu } from 'semantic-ui-react'
import { userLogOut } from '../reducers/loginReducer'
const DataList = (props) => {
    const [activeItem, setActiveItem] = useState('home')
    const handleLogoOut = (e) => {
        e.preventDefault()
        window.localStorage.clear()
        props.userLogOut()
        props.history.push('/login')
        props.logOut()
    }
    const handleItemClick = (e, { name }) => setActiveItem(name)

    const Nav = () => {
        return (
            <Menu size='large'>
                <Menu.Item name='home' as={Link} to='/' active={activeItem === 'home'} onClick={handleItemClick} />
                <Menu.Item name='create' as={Link} to='/create' active={activeItem === 'messages'} onClick={handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <form onSubmit={handleLogoOut}><Button type='submit' primary> Login</Button></form>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
    return (
        <div>
            <Nav />
            {props.data.map(x => <Grid>
                <Grid.Column width={4}>
                    {x.item_name}
                </Grid.Column>
                <Grid.Column width={9}>
                    <Image src={x.cloudImage} />
                </Grid.Column>
                <Button as={Link} to={`/edit/${x.id}`} primary>Edit</Button>
            </Grid>)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        user: state.user,
        notification: state.notification
    }
}

const ConnectedList = connect(mapStateToProps, { userLogOut })(DataList)
export default withRouter(ConnectedList)