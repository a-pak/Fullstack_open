import '../index.css'

const Notification = ({ message }) => {

    if (message === null || message === '') {
        return null
      }
      
    return (
        <div>         
            <div className="notification">
                {message}
            </div>
        </div>
    )
}

export default Notification;