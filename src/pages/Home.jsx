import React, { useState, useEffect } from "react";

import Dialogs from "../components/Dialogs/Dialogs";
import Message from "../components/Messages/Message";

import FormOutlined from "@ant-design/icons/FormOutlined";
import TeamOutlined from "@ant-design/icons/TeamOutlined";
import { Input } from "antd";
import classNames from "classnames";

// import dialogsJSON from "../../../src/dialogs.json"

export default function Home(props) {

	useEffect(() => {
		document.title = 'Home'
	}, [])
	
    const [searchValue, setSearchValue] = React.useState("");

    const [userINfo, setUserInfo] = React.useState({
        name: null,
        online: null,
    });

    return (
        <div className="home w-full h-full overflow-hidden">
            <div className="chat h-full flex flex-row ">
                <div className="chat-sidebar w-[320px] h-full flex flex-col gap-8 items-start">
                    <div className="info p-3 pt-4 pb-0 flex w-full flex-col gap-8 items-center">
                        <div className="dialogs-header w-full flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-2 items-center">
                                <TeamOutlined
                                    style={{
                                        fontSize: "18px",
                                        color: "rgb(75 85 99)",
                                    }}
                                    type="team"
                                />
                                <span className="text-gray-500">
                                    Список диалогов
                                </span>
                            </div>
                            <FormOutlined
                                style={{
                                    fontSize: "18px",
                                    color: "rgb(75 85 99)",
                                }}
                            />
                        </div>
                        <div className="search w-full">
                            <Input.Search
                                placeholder="Поиск среди контактов"
                                allowClear
                                onChange={(e) => setSearchValue(e.target.value)}
                                value={searchValue}
                                style={{
                                    width: "100%",
                                }}
                            />
                        </div>
                    </div>
                    <div className="dialogs flex grow overflow-y-hidden overflow-x-hidden">
                        <Dialogs
                            // getUser_Dialog={({ ...info }) => setUserInfo(info)}
                            clearSearchInput={(bool) =>
                                setSearchValue(bool && "")
                            }
                            userId={0}
                            onSearch={searchValue}
                        />
                    </div>
                </div>
                <div
                    className={classNames("chat-dialog h-full w-full flex flex-col", {
                        "items-center justify-center": !userINfo.name,
                        "items-center justify-between flex-col": userINfo.name,
                    })}
                >
					<Message />
                </div>
            </div>
            {/*

			<Message
                date="Sat Apr 15 2023 04:12:59" //now date
                isMe={true}
				isReaded
                avatar="red.jpg"
                attachments={[
                    {url: "red.jpg",},
                    {url: "default.webp",},
					{url: "red.jpg",},
                ]}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maiores, amet.
            </Message>

            <Message
                date="Sat Apr 15 2023 04:32:59"
                isMe={false}
                attachments={[
                    {url: "red.jpg",},
                    {url: "default.webp",},
					{url: "red.jpg",},
                ]}
				audio={'cat.mp3'}
            >
                Lorem ipsum dolor sit amet cMaiores, amet.
            </Message>
            <Message
                date="Sat Apr 15 2023 04:32:59"
                isMe={true}
                attachments={[
                    {url: "red.jpg",},
                    {url: "default.webp",},
					{url: "red.jpg",},
                ]}
				audio={'long.mp3'}
            >
                Lorem ipsum dolor sit amet cMaiores, amet.
            </Message> */}
        </div>
    );
}
