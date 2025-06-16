// ChooseAvatarCard.js
import { useState } from "react";
import LogoAndText from "../LogoAndText/LogoAndText";
import avatars from "../../avatars/avatars";
import "../RegisterCard.css";
import "./ChooseAvatarCard.css";

function ChooseAvatarCard({ theme }) {
  //left column text
  const header = "Choose Your Avatar";
  const msg = "Pick one below or upload your own";

  //avatar states
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  //existing avatars array
  const existingAvatars = avatars;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setSelectedAvatar(null);
    }
  };

  const handleNext = () => {
    // TODO: submit avatarFile or selectedAvatar
    console.log({ selectedAvatar, avatarFile });
  };

  const btnClass =
    theme === "dark" ? "btn btn-secondary" : "btn btn-primary";

  return (
    <div
      data-bs-theme={theme}
      className="card register-card border shadow p-3 mb-5 bg-body-tertiary rounded"
    >
      <div className="row align-items-start g-2">

        {/*left column*/}
        <LogoAndText
          header={header}
          msg={msg}
        />

        {/* right column */}
        <div className="col-6 ms-5 align-self-center">
          <div className="d-flex flex-wrap align-items-center">
            {existingAvatars.map((url) => (
              <img
                key={url}
                src={url}
                alt="avatar"
                className={
                  "avatar-choice me-3 mb-3" +
                  (selectedAvatar === url ? " selected" : "")
                }
                onClick={() => {
                  setSelectedAvatar(url);
                  setAvatarFile(null);
                  setAvatarPreview(null);
                }}
              />
            ))}

            <label
              htmlFor="avatarUpload"
              className="btn btn-outline-secondary mb-3"
            >
              Upload
            </label>
            <input
              type="file"
              id="avatarUpload"
              className="d-none"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {avatarPreview && (
            <div className="mt-3">
              <p className="small mb-2 text-muted">Preview:</p>
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="avatar-preview"
              />
            </div>
          )}

          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              className={btnClass}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseAvatarCard;
