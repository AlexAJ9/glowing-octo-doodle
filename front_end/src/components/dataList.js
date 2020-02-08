import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Button, Dropdown, Menu } from 'semantic-ui-react'

const DataList = (props) => {

    return (
        <div>
            {props.data.map(x => <Grid>
                <Grid.Column width={4}>
                    {x.item_name}
                </Grid.Column>
                <Grid.Column width={9}>
                    <Image src={x.cloudImage} />
                </Grid.Column>
                <Button as={Link} to={`/edit/${x.id}`}  primary>Edit</Button>
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