import { Alert, Checkbox, FormControlLabel, Snackbar } from "@mui/material";
import { useRef, useState } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../storage/Firebase";
import { setUser } from "../states/userSlice";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";

interface EditProfileProps {
  user: {
    firstName: string;
    lastName: string;
    userName: string;
    location: string;
    profileImage: string;
    coverImage: string;
    isDatePublic: boolean;
    email: string;
    bio: string;
    userPosts: string[];
    userFollowers: string[];
    userFollows: string[];
  };
  onClose: () => void;
  isDialogOpen: boolean;
}

const EditProfile: React.FC<EditProfileProps> = ({
  user,
  onClose,
  isDialogOpen,
}) => {
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newLastName, setNewLastName] = useState(user.lastName);
  const [newUserName, setNewUserName] = useState(user.userName);
  const [newProfileImage, setNewProfileImage] = useState(user.profileImage);
  const [newCoverImage, setNewCoverImage] = useState(user.coverImage);
  const [newLocation, setNewLocation] = useState(user.location);
  const [newBio, setNewBio] = useState(user.bio);
  const [isDatePublic, setIsDatePublic] = useState(user.isDatePublic);

  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(e.target.value);
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastName(e.target.value);
  };
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation(e.target.value);
  };
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  const handlePublicChange = () => {
    setIsDatePublic(!isDatePublic);
  };

  const handleCoverImageUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (coverInputRef.current) {
      coverInputRef.current.click();
    }
  };

  const handleImageUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "profile"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "cover") {
          setNewCoverImage(reader.result as string);
        } else if (type === "profile") {
          setNewProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const dispatch = useDispatch();

  //response logic
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [responseSeverity, setResponseSeverity] = useState<
    "success" | "error"
  >();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  //backend URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  //   update user data
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profileInputRef.current?.files || !coverInputRef.current?.files)
      return;

    const profileFile = profileInputRef.current.files[0];
    const coverFile = coverInputRef.current.files[0];

    // Function to upload image to Firebase and get URL
    const uploadImageAndGetUrl = async (file: File) => {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    };

    try {
      // Upload images and get URLs
      const profileImageUrl = profileFile
        ? await uploadImageAndGetUrl(profileFile)
        : undefined;
      const coverImageUrl = coverFile
        ? await uploadImageAndGetUrl(coverFile)
        : undefined;

      // Prepare user data
      const userData = {
        firstName: newFirstName || user.firstName,
        lastName: newLastName || user.lastName,
        userName: newUserName || user.userName,
        location: newLocation || user.location,
        bio: newBio || user.bio,
        isDatePublic,
        profileImage: profileImageUrl || user.profileImage,
        coverImage: coverImageUrl || user.coverImage,
      };

      const response = await axios.patch(
        `${backendURL}/users/${user._id}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        dispatch(setUser(response.data));
        setOpenSnackbar(true);
        setResponseMessage("User profile updated successfully!");
        setResponseSeverity("success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      // Error handling
      const err = error as AxiosError;
      const errorTextContent: any = err.response?.data;
      setResponseMessage(errorTextContent.message);
      setOpenSnackbar(true);
      setResponseSeverity("error");
    }
  };

  return (
    <div>
      {isDialogOpen && (
        <form
          onSubmit={handleUpdateProfile}
          onClick={onClose}
          data-dialog-backdrop="sign-in-dialog"
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
          <div
            data-dialog="sign-in-dialog"
            className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-black max-h-[80vh]  overflow-y-auto shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4 p-6">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-black">
                Edit Profile
              </h4>

              {/* First name */}
              <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                First Name
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="text"
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder={newFirstName}
                  onChange={handleFirstNameChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>

              {/* Last name */}
              <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                Last Name
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="text"
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder={newLastName}
                  onChange={handleLastNameChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>

              {/* User name */}
              <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                User name
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="text"
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder={newUserName}
                  onChange={handleUserNameChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>

              {/* Location */}
              <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                Location
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="text"
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder={newLocation}
                  onChange={handleLocationChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>

              {/* Bio */}
              <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                Bio
              </h6>
              <div className="relative h-24 w-full min-w-[200px]">
                <textarea
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 resize-none"
                  placeholder={newBio}
                  onChange={handleBioChange}
                />
              </div>

              <div className="mt-[-10px]">
                <FormControlLabel
                  checked={isDatePublic}
                  onChange={handlePublicChange}
                  control={<Checkbox />}
                  label="Make date of birth public"
                />
              </div>

              {/* Cover Image */}
              <h6 className="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                Image
              </h6>
              <div className="relative">
                <div className="relative">
                  <input
                    type="file"
                    ref={coverInputRef}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "cover")}
                  />

                  <img
                    src={newCoverImage}
                    onClick={handleCoverImageUpload}
                    alt="user-cover-image"
                    className="w-[100%] h-[164px] mt-5 object-cover rounded-[10px]"
                  />

                  {/* cover-image button */}
                  <div className="relative">
                    <button
                      className="absolute z-10 left-36 bottom-14"
                      onClick={handleCoverImageUpload}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="20"
                          fill="#000000"
                          fill-opacity="0.5"
                        />
                        <g clip-path="url(#clip0_41_1996)">
                          <path
                            d="M14.1172 17.1328C14.6055 17.6207 15.3969 17.6211 15.8848 17.1329L18.75 14.2695V23.75C18.75 24.4402 19.3098 25 20 25C20.6902 25 21.25 24.4402 21.25 23.75V14.2695L24.1164 17.1359C24.6043 17.6238 25.3957 17.6238 25.884 17.1359C26.3719 16.648 26.3719 15.8566 25.884 15.3683L20.884 10.3683C20.6406 10.1221 20.3203 10 20 10C19.6797 10 19.3594 10.1221 19.1172 10.3662L14.1172 15.3672C13.6281 15.8555 13.6281 16.6445 14.1172 17.1328ZM28.75 23.75H22.5C22.5 25.1309 21.3809 26.25 20 26.25C18.6191 26.25 17.5 25.1309 17.5 23.75H11.25C10.5598 23.75 10 24.3098 10 25V28.75C10 29.4402 10.5598 30 11.25 30H28.75C29.4402 30 30 29.4402 30 28.75V25C30 24.3086 29.4414 23.75 28.75 23.75ZM26.875 27.8125C26.3594 27.8125 25.9375 27.3906 25.9375 26.875C25.9375 26.3594 26.3594 25.9375 26.875 25.9375C27.3906 25.9375 27.8125 26.3594 27.8125 26.875C27.8125 27.3906 27.3906 27.8125 26.875 27.8125Z"
                            fill="#FAFAFA"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_41_1996">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="translate(10 10)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* profile image  */}
                <div className="relative">
                  <input
                    type="file"
                    ref={profileInputRef}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "profile")}
                  />
                  <img
                    onClick={handleImageUpload}
                    className={` ml-[20px] object-cover transform -translate-y-1/2 rounded-full w-[150px] h-[150px] border-[#5D5F63] border-[8px] 
                `}
                    src={newProfileImage}
                    alt="user-profile-image"
                  />

                  {/* image button */}
                  <div className="relative">
                    <button
                      onClick={handleImageUpload}
                      className="absolute z-10 left-20 bottom-32"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="20"
                          fill="#000000"
                          fill-opacity="0.5"
                        />
                        <g clip-path="url(#clip0_41_1996)">
                          <path
                            d="M14.1172 17.1328C14.6055 17.6207 15.3969 17.6211 15.8848 17.1329L18.75 14.2695V23.75C18.75 24.4402 19.3098 25 20 25C20.6902 25 21.25 24.4402 21.25 23.75V14.2695L24.1164 17.1359C24.6043 17.6238 25.3957 17.6238 25.884 17.1359C26.3719 16.648 26.3719 15.8566 25.884 15.3683L20.884 10.3683C20.6406 10.1221 20.3203 10 20 10C19.6797 10 19.3594 10.1221 19.1172 10.3662L14.1172 15.3672C13.6281 15.8555 13.6281 16.6445 14.1172 17.1328ZM28.75 23.75H22.5C22.5 25.1309 21.3809 26.25 20 26.25C18.6191 26.25 17.5 25.1309 17.5 23.75H11.25C10.5598 23.75 10 24.3098 10 25V28.75C10 29.4402 10.5598 30 11.25 30H28.75C29.4402 30 30 29.4402 30 28.75V25C30 24.3086 29.4414 23.75 28.75 23.75ZM26.875 27.8125C26.3594 27.8125 25.9375 27.3906 25.9375 26.875C25.9375 26.3594 26.3594 25.9375 26.875 25.9375C27.3906 25.9375 27.8125 26.3594 27.8125 26.875C27.8125 27.3906 27.3906 27.8125 26.875 27.8125Z"
                            fill="#FAFAFA"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_41_1996">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="translate(10 10)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* submit */}
            <div className="p-6 pt-0 mt-[-50px]">
              <button
                className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-5 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Alert logic */}
          {responseMessage && (
            <Snackbar open={openSnackbar} autoHideDuration={6000}>
              <Alert
                onClose={handleCloseSnackbar}
                variant="filled"
                severity={responseSeverity}
              >
                {responseMessage}
              </Alert>
            </Snackbar>
          )}
        </form>
      )}
    </div>
  );
};

export default EditProfile;
