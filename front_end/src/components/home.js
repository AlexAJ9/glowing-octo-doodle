import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Button, Dropdown, Menu } from 'semantic-ui-react'

const DataList = (props) => {

    const Nav = () => {
        return (
            <Menu size='large'>
                <Menu.Item name='home' as={Link} to='/home' active={activeItem === 'home'} onClick={handleItemClick} />
                <Menu.Item name='create' as={Link} to='/create' active={activeItem === 'messages'} onClick={handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button as={Link} to='/login' onClick={() => handleLogoOut()} primary> Login</Button>
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
        data: state.data
    }
}

const ConnectedList = connect(mapStateToProps, null)(DataList)
export default ConnectedList