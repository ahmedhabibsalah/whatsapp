import React from 'react';
import "./Sidebar.css";
import DonutLargeIconOutlinedIcon from '@material-ui/icons/DonutLarge';
import ChatIconOutlinedIcon from '@material-ui/icons/Chat';
import MoreVertIconOutlinedIcon from '@material-ui/icons/MoreVert';
import{Avatar, IconButton} from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChatOutlinedIcon from './SidebarChat';

function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="data:image/jpeg;base64,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" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIconOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIconOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIconOutlinedIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="search or start new chat" type="text" />
                </div>
            </div>

            <div className="sidebar_chats">
                <SidebarChatOutlinedIcon />
            </div> 
        </div>
    )
}

export default SideBar
