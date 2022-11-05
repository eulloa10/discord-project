import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useHistory } from "react-router-dom";
import {
  getServers,
  getJoinedServers,
  getOwnedServers,
} from "../../store/servers";
import ServerCard from "./ServerCard";
import ServerBubble from "./ServerBubble";
import CreateSeverForm from "./CreateServerForm";
import Fab from "./Fab";
import "./Servers.css";
import Logout from "../../svgFiles/logout.svg";
import { logout } from "../../store/session";
import Channels from "../Channels/Channels";
import ContextMenu from "./ContextMenu";
import EditSeverForm from "./EditServerForm";
import { clicked } from "./ContextMenu";
import CreateServerModal from "./CreateServerModal/CreateServerModal";
import EditServerModal from "./EditServerModal/EditServerModal";

const ListOwnedServers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showContext, setShowContext] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [contextedServerId, setContextedServerId] = useState("");
  // const [ownedServers, setOwnedServers] = useState(useSelector((state)=> {return Object.values(state.servers.owned)}))

  let serverLinks;

  let myServers = useSelector((state) => {
    const serversArr = Object.values(state.servers.owned);
    const spreadArr = Object.values(state.servers.joined);

    return [...serversArr, ...spreadArr];
  });

  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    dispatch(getServers());
    dispatch(getJoinedServers());
    dispatch(getOwnedServers());
  }, [dispatch, showForm, editForm, contextedServerId, clicked]);

  useEffect(() => {
    const handleClick = () => setShowContext(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  serverLinks = (
    <div className="server-link-bubbles">
      {myServers.map((server, i) => {
        return (
          <NavLink key={server.id} to={`/servers/${server.id}`}>
            <div
              className={`servers-container ${server.id}`}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextedServerId(e.target.className.split(" ")[1]);
                setShowContext(true);
                setPoints({ x: e.pageX, y: e.pageY });
              }}
            >
              <ServerBubble server={server}></ServerBubble>
            </div>
          </NavLink>
        );
      })}
    </div>
  );

  const handleLogOut = () => {
    history.push("/");
    dispatch(logout());
  };

  return (
    <main className="owned-servers-container">
      <nav className="servers-nav-bar">
        <div>
          <NavLink
            to="/direct-messages"
            className="direct-server-icon-div dm server-icon"
          >
            <i class="fa-brands fa-discord direct-message-icon"></i>
          </NavLink>
        </div>
        <div className="direct-server-divider"></div>
        {serverLinks}
        <Fab hidden={showForm} onClick={() => setShowForm(true)} />
        <div>
          <NavLink to={`/servers`} className="explore-icon-div">
            <i className="fa-solid fa-compass"></i>
          </NavLink>
        </div>
        <div className="direct-server-divider"></div>

        <div className="logout-icon-div" onClick={handleLogOut}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
      </nav>
      {/* {showForm && <CreateSeverForm hideForm={() => setShowForm(false)} />} */}
      {showForm && <CreateServerModal hideForm={() => setShowForm(false)} />}

      {editForm && (
        // <EditSeverForm
        //   hideForm={() => setEditForm(false)}
        //   contextedServerId={contextedServerId}
        // ></EditSeverForm>
        <EditServerModal
          hideForm={() => setEditForm(false)}
          contextedServerId={contextedServerId}
        ></EditServerModal>
      )}
      {showContext && (
        <ContextMenu
          className="context-menu"
          top={points.y}
          left={points.x}
          contextedServerId={contextedServerId}
          setEditForm={setEditForm}
        ></ContextMenu>
      )}
    </main>
  );
};

export default ListOwnedServers;
