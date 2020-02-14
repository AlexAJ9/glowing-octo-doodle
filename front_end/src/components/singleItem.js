import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const Item = (props) => {

    return (
        <div>
            <Grid>
                <Grid.Column width={4}>
                    <h2>{props.item.item_name}</h2> <p>Added on: {props.item.date}</p>
                    <p> {props.item.item_description}</p>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Image src={props.item.cloudImage} />
                </Grid.Column>
            </Grid>
        </div>
    )
}
export default Item