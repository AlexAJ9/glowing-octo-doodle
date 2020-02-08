import React, { useState } from 'react'
import { connect } from 'react-redux'
import { edit } from '../reducers/dataReducer'


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
        console.log(itemName);
        const item = new FormData()
        item.append('item_name', itemName)
        item.append('item_description', itemDescription)
        item.append('clodImage', image)
        props.edit(item)
    }


    return (
        <form onSubmit={handleSubmit}>
            <div><input type='text' value={itemName} onChange={handleTitleChange} /></div>
            <div><input type='text' value={itemDescription} onChange={handleDescriptionChange} /></div>
            <input type="file" onChange={({ target }) => setImage(target.files[0])} />
            <button type='submit'>Update</button>
        </form>
    )
}
const ConnectedUpdateForm = connect()(DataForm)
export default ConnectedUpdateForm