import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'
import { Container, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'

import './style.css'

const DataList = (props) => {

    return (
        <div className='dataGrid'>
            {props.data.map(x => <div> <Grid>
                <Grid.Column width={7}>
                    <div><h2>{x.item_name}</h2> <em>Added on: {x.date}</em></div>
                    <p>{x.item_description}</p>

                </Grid.Column>
                <Grid.Column width={7}>
                    <Image src={x.cloudImage} />
                </Grid.Column>
            </Grid>
                <Button as={Link} to={`/edit/${x.id}`} primary>Edit</Button>
            </div>
            )}
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

const ConnectedList = connect(mapStateToProps, null)(DataList)
export default withRouter(ConnectedList)