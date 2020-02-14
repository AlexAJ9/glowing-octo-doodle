import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import userService from '../services/userService'
const UserProfile = props => {

    const [items, setItems] = useState([])
    useEffect(() => {
        const x = userService.getUserInfo(props.user.id).then(res => {
            setItems([...items, ...res.items])
        })
    }, [])

    return (
        <div>
            <em>{props.user.username} is logged in.</em>
            <h2>My entries</h2>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Movie</Table.HeaderCell>
                        <Table.HeaderCell>Date </Table.HeaderCell>
                        <Table.HeaderCell>Rating</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map(item => 
                        <Table.Row>
                            <Table.Cell>{item.item_name}</Table.Cell>
                            <Table.Cell>{item.date}</Table.Cell>
                            <Table.Cell>{item.item_rating}</Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const ConnectedProfile = connect(mapStateToProps, null)(UserProfile)
export default ConnectedProfile