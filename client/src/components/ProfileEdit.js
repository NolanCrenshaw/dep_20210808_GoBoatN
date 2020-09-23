import React, { useEffect, useState } from 'react';
import { BASE_URL, IMG_KEY } from '../config';
import '../styles/profile.css';
import '../styles/profileedit.css';



// React Component
const ProfileEdit = props => {

    // DOM Ref
    const imgFile = React.createRef();
    const token = window.localStorage.getItem("auth_token");

    // State
    const [user, setUser] = useState(props.user)

    // Listen

    // Function
    const uploadImg = async () => {
        if (imgFile.current.files[0] !== undefined) {
            const formData = new FormData();
            formData.append('file', imgFile.current.files[0])

            const res = await fetch(`${BASE_URL}/api/bucket/upload`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
            if (!res.ok) {
                // -- TODO -- Handling
                console.log("uploadImg res failure")
            } else {
                const json = await res.json()
                setUser(props.user.profile_pic = json.sprite)
            }
            const newres = await fetch(`${BASE_URL}/api/users/token/update`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(props.user.profile_pic)
            })
            if (!newres.ok) {
                // -- TODO -- Handling
                console.log("NewRes User update failed");
            } else {
                // -- TODO -- Handling
                const newjson = await newres.json()
                console.log(newjson.message)
            }
        };
    };

    useEffect(() => {
        setUser(props.user);
    },[])


// ---- Component Render ---- //

    // Render
    return (
        <div className="profile-root--container">
            <div className="profile">
                <div className="profile-card">
                    <div className="profile-card__img-body">
                        <div className="profile-card__img--container">
                            <div className="profile-card__img">
                                <img src={`${IMG_KEY}${props.user.profile_pic}`} />
                            </div>
                        </div>
                        <div className="profile-card__upload-img">
                            <span>Upload a profile picture</span>
                            <input
                                className=""
                                type="file"
                                accept="image/*"
                                name="file"
                                ref={imgFile} />
                            <div
                                className="profile-card__upload--button"
                                onClick={uploadImg}>
                                <span>Submit</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-card__bio--container">
                        <div className="profile-card__text-box">
                            <div
                                className="profile-card__field"
                                id="profile-card__username">
                                { props.user.username }
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__email">
                                { props.user.email }
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__firstname">
                                { props.user.firstname }
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__lastname">
                                { props.user.lastname }
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__skill">
                                { props.user.skill }
                            </div>
                        </div>
                        <div className="profile-card__about--container">
                            <div
                                className="profile-card__field"
                                id="profile-card__about">
                                { props.user.about }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-bottom"></div>
            </div>
        </div>
    )

};
export default ProfileEdit;
