import { connect } from 'react-redux'
import React, { useState } from 'react'
import { newEntry } from '../reducers/dataReducer'
import { Button, Form, TextArea } from 'semantic-ui-react'
import { newNotification } from '../reducers/notificationReducer'

import './style.css'

const DataForm = (props) => {

    const [itemName, setItemName] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [image, setImage] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const item = new FormData()
        item.append('item_name', itemName)
        item.append('item_description', itemDescription)
        item.append('clodImage', image)
        props.newEntry(item)
    }

    return (
        <div className='dataForm'>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <input type='text' value={itemName} onChange={({ target }) => setItemName(target.value)} required placeholder='Movie title' width={9} />
                </Form.Field>
                <Form.Field>
                    <TextArea style={{ minHeight: 100 }} value={itemDescription} onChange={({ target }) => setItemDescription(target.value)} placeholder='Description' />
                </Form.Field>
                <input type="file" onChange={({ target }) => setImage(target.files[0])} />
                <Button type='submit'>submit</Button>
            </Form>
        </div>
    )
}
const mapDispatchToProps = {
    newEntry,
    newNotification
}

const ConnectedForm = connect(null, mapDispatchToProps)(DataForm)
export default ConnectedForm


