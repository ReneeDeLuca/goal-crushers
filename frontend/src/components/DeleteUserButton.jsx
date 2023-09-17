const DeleteUserButton = ({ userId }) => {
  const deleteAllImages = async () => {
    try {
      //You can call an API in your backend if you want to delete images.
      //This is the API you should call:
      //https://cloudinary.com/documentation/image_upload_api_reference#destroy
      // const responseData = await fetch(
      //   "http://localhost:5000/api/photos/delete"
      // );
      setImagesUploadedList([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <button>Delete User</button>;
};

export default DeleteUserButton;
