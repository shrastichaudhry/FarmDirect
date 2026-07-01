import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profileApi";
import { toast } from "react-toastify";

function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await getProfile();

      setProfile(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateProfile({
        name: profile.name,
        email: profile.email,
      });

      toast.success("Profile Updated Successfully");

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          name: profile.name,
          email: profile.email,
        })
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-header bg-success text-white">

              <h3 className="mb-0">
                My Profile
              </h3>

            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label>Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-3">

                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-3">

                  <label>Role</label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.role}
                    disabled
                  />

                </div>

                <button
                  className="btn btn-success w-100"
                  type="submit"
                >
                  Update Profile
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;