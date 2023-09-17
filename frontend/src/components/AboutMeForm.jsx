/* eslint-disable no-undef */
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateUserAboutMeMutation } from "../apiSlices/userApiSlice";

const AboutMeForm = (user) => {
  //set state
  const [aboutMe, setAboutMe] = useState(user.aboutMe);
  // user id
  const id = user.id;
  // update profile mutation
  const [updateAboutMe, { isLoading }] = useUpdateUserAboutMeMutation();
  const onAboutMeChanged = (e) => setAboutMe(e.target.value);

  // update about me handler
  const updateAboutMeHandler = async () => {
    try {
      const res = await updateAboutMe({
        id,
        aboutMe,
      }).unwrap();
      console.log(res);
      setAboutMe(res.aboutMe);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <table className="col-span-1">
      <tbody>
        <tr className="mt-2">
          <td className="flex card p-5 md:px-5 md:pb-0 md:pt-5 items-start">
            <section className="flex min-h-full flex-1 flex-col px-6 py-6">
              <div className="mx-auto w-full sm:max-w-sm">
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update About Me
                </h2>
              </div>
              <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  id="profileForm"
                  className="space-y-6"
                  action="#"
                  onSubmit={updateAboutMeHandler}
                >
                  <div>
                    <label
                      htmlFor="aboutMe"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      About Me:
                    </label>
                    <textarea
                      className="mt-2 block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-offset-0 ring-gray-300 placeholder:text-gray-400 resize-none focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6 h-48 md:h-24 lg:h-48 caret-indigo-600"
                      id="aboutMe"
                      name="aboutMe"
                      type="text"
                      value={aboutMe}
                      onChange={onAboutMeChanged}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      id="submitProfile"
                      value="submit "
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={isLoading}
                      onClick={updateAboutMeHandler}
                    >
                      {isLoading ? "Loading..." : "Update Profile"}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AboutMeForm;
