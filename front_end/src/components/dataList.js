import { connect } from 'react-redux'
import React, { useState } from 'react'
import { rateItem } from '../reducers/dataReducer'
import { Grid, Image, Rating } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'

import './style.css'

const DataList = (props) => {

    const [rating, setRating] = useState(0)

    const handleRate = (e, { rating, maxRating, id }) => {
        const item = {item_rating:rating.toString()}
        props.rateItem(item, id)
    }

    return (
        <div className='dataGrid'>
            {props.data.map(x => <div> <Grid>
                <Grid.Column width={7}>
                    <div><h2>{x.item_name}</h2> <em>Added on: {x.date}</em></div>
                    <p>{x.item_description}</p>
                    <p><em>Rating: {x.item_rating}</em></p>
                    <div>
                        <Rating icon='star' id={x.id} maxRating={10} onRate={handleRate} />
                    </div>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Image src={x.cloudImage} />
                </Grid.Column>
            </Grid>
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

const ConnectedList = connect(mapStateToProps, { rateItem })(DataList)
export default withRouter(ConnectedList)