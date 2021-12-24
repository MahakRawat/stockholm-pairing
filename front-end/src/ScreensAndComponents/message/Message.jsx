import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own, name}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <div className="messageName">{name}</div>
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
