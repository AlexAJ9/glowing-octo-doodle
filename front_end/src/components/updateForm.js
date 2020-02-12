import { connect } from 'react-redux'
import React, { useState } from 'react'
import { edit } from '../reducers/dataReducer'
import { remove } from '../reducers/dataReducer'
import { withRouter } from 'react-router-dom'
import { Button, Form, TextArea } from 'semantic-ui-react'

const DataForm = (props) => {

    const [itemName, setItemName] = useState(props.item.item_name)
    const [itemDescription, setItemDescription] = useState(props.item.item_description)
    const [image, setImage] = useState(null)

    const handleTitleChange = (event) => {
        setItemName(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setItemDescription(event.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const item = new FormData()
        item.append('item_name', itemName)
        item.append('item_description', itemDescription)
        item.append('clodImage', image)
        const id = props.item.id
        props.edit(item, id)
    }
    const deleteItem = () => {
        props.remove(props.item.id)
        props.history.push('/')
    }

    return (
        <div className='dataForm'>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <input type='text' value={itemName} onChange={handleTitleChange} required placeholder='Movie title' width={9} />
                </Form.Field>
                <Form.Field>
                    <TextArea style={{ minHeight: 100 }} value={itemDescription} onChange={handleDescriptionChange} placeholder='Description' />
                </Form.Field>
                <input type="file" onChange={({ target }) => setImage(target.files[0])} />
                <Button type='submit'>Update</Button>
            </Form>
            <div><Button onClick={deleteItem}>Delete</Button></div>
        </div>
    )
}
const mapDispatchToProps = {
    edit,
    remove
}
const ConnectedUpdateForm = connect(null, mapDispatchToProps)(DataForm)
export default withRouter(ConnectedUpdateForm)


