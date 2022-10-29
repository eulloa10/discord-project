import { useDispatch } from "react-redux";
import './Servers.css'

const ServerCard = ({server}) => {
    const dispatch = useDispatch();
    const initials = server.name.split(" ").map(word => word[0])

    return(
        <div className="servercard-main-div">
            <div className="servercard-icon-div">
                {server.server_img ? (
                    <img src={server.server_img} className="server-icon"></img>
                ): (
                    <p className="server-icon">{initials.join("")}</p>
                )}
            </div>
            <div className="server-name">
                <p>{server.name}</p>
            </div>
        </div>
    )
}

export default ServerCard
