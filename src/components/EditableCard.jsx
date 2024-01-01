import { useState } from "react";

const EditableCard = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleIsEditing = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const TypeText = props.message.type;
  const Content = props.message.content;
  const [updatedMessage, setUpdatedMessage] = useState({
    type: TypeText,
    content: Content,
  });
  const handleUpdate = () => {
    props.handleMessageArr(props.message.id, updatedMessage);
    setIsEditing(false);
  };
  return (
    <div className="flex p-4 content-center align-middle justify-center">
      <div className="w-[80%] bg-white border border-gray-200 rounded-lg shadow p-6 flex flex-col items-center gap-3">
        {/* {isEditing ? (
          <input
            onChange={(e) => {
              setUpdatedMessage((prevState) => ({
                ...prevState,
                type: e.target.value,
              }));
            }}
            type="text"
            defaultValue={TypeText}
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
          />
        ) : ( */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {TypeText}
        </h5>
        {/* )} */}
        {isEditing ? (
          <input
            onChange={(e) => {
              setUpdatedMessage((prevState) => ({
                ...prevState,
                content: e.target.value,
              }));
            }}
            type="text"
            defaultValue={Content}
            id="large-input1"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="mb-3 font-normal text-gray-700">{Content}</p>
        )}
        <div className="flex justify-between gap-4">
          <button
            className={`${
              isEditing ? "visible" : "invisible"
            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
            onClick={handleCancel}
          >
            Cancel
          </button>
          {isEditing ? (
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
              onClick={handleIsEditing}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableCard;
