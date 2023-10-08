const Notification = ({message, type}) => {
    if (!message) {
        return ''
    }

    const messageStyle = {
        color: type === 'success' ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message) {
        return (
            <div style={messageStyle}>
                {message}
            </div>
        )
    }
}

export default Notification