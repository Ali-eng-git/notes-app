import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div className="border rounded bg-white p-4 hover:shadow-xl transition-all ease-in">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? `text-primary` : `text-slate-300`}`}
          onClick={onPinNote}
        />
      </div>
      {/* content section */}
      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex justify-between items-center mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) =><span key={item}>#{ item }</span> )}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
