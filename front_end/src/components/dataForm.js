import React, { useState } from 'react'
import { connect } from 'react-redux'
import { newEntry } from '../reducers/dataReducer'
import { newNotification } from '../reducers/notificationReducer'

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
        <form onSubmit={handleSubmit}>
            <div><input type='text' value={itemName} onChange={({ target }) => setItemName(target.value)} /></div>
            <div><input type='text' value={itemDescription} onChange={({ target }) => setItemDescription(target.value)} /></div>
            <input type="file" onChange={({ target }) => setImage(target.files[0])} />
            <button type='submit'>Sumbit</button>
        </form>
    )
}
const mapDispatchToProps = {
    newEntry,
    newNotification
}

const ConnectedForm = connect(null, mapDispatchToProps)(DataForm)
export default ConnectedForm