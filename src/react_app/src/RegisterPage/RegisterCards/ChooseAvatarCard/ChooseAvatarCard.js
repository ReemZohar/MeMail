import React, { useState } from "react";
import LogoAndText from "../LogoAndText/LogoAndText";
import "../RegisterCard.css";
import "./ChooseAvatarCard.css";

function ChooseAvatarCard({
  theme,
  existingAvatars,
  selectedAvatar,
  onSelectAvatar,
  onNext
}) {
  //left column text
  const header = "Choose Your Avatar";
  const msg = "Pick one below or upload your own";

  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  //validation state
  const [avatarValid, setAvatarValid] = useState(null);
  const [avatarFb, setAvatarFb] = useState("");

  React.useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    return () => {
      URL.revokeObjectURL(url);
      setAvatarPreview(null);
    };
  }, [file]);

  const handleFileChange = (e) => {
    const pickedFile = e.target.files[0];
    
    if (!pickedFile) return;
    setFile(pickedFile);
    const url = URL.createObjectURL(pickedFile);
    setAvatarPreview(url);
    onSelectAvatar(pickedFile);
  };

  const handleAvatarClick = (url) => {
    setFile(null);
    setAvatarPreview(null);
    onSelectAvatar(selectedAvatar === url ? null : url);
  };

  const handleNext = () => {
    //no avatar was chosen scenario
    if (!selectedAvatar && !avatarPreview) {
      setAvatarValid(false);
      setAvatarFb("Please select or upload an avatar");
      return;
    }
    //valid choice scenario
    else {
      setAvatarValid(true);
      setAvatarFb("");
      onNext();
    }
  };

  const btnClass =
    theme === "dark" ? "btn btn-secondary" : "btn btn-primary";

  return (
    <div data-bs-theme={theme}
      className="card register-card border shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="row align-items-start g-2">

        {/* left column */}
        <LogoAndText header={header} msg={msg} />

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
                onClick={() => handleAvatarClick(url)}
              />
            ))}

            <label
              htmlFor="avatarUpload"
              className={btnClass + " mt-4 mb-3 w-100"}
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
            <div className="preview-container mt-4 text-center">
              <p className="small mb-2 text-muted">Preview:</p>
              <div className="preview-circle">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="avatar-preview"
                />
              </div>
            </div>
          )}

          {/* feedback message */}
          {avatarValid === false && (
            <div className="text-danger mt-2">
              {avatarFb}
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
