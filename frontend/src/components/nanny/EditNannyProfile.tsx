import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNannyProfile } from "../../redux/nanny/operations";
import {
  selectLoading,
  selectMyNannyProfile,
} from "../../redux/nanny/selectors";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";

interface EditNannyProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditNannyProfile: React.FC<EditNannyProfileProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);
  const myNannyProfile = useSelector(selectMyNannyProfile);

  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    experience: "",
    education: "",
    kids_age: "",
    price_per_hour: 5,
    location: "",
    about: "",
    characters: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (myNannyProfile) {
      setFormData({
        name: myNannyProfile.name,
        birthday: Array.isArray(myNannyProfile.birthday)
          ? myNannyProfile.birthday[0]
          : myNannyProfile.birthday,
        experience: myNannyProfile.experience,
        education: myNannyProfile.education,
        kids_age: myNannyProfile.kids_age,
        price_per_hour: myNannyProfile.price_per_hour,
        location: myNannyProfile.location,
        about: myNannyProfile.about,
        characters: Array.isArray(myNannyProfile.characters)
          ? myNannyProfile.characters.join(", ")
          : myNannyProfile.characters,
      });
    }
  }, [myNannyProfile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price_per_hour" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      data: { ...formData },
      file: avatarFile || undefined,
    };

    try {
      await dispatch(updateNannyProfile(payload)).unwrap();
      toast.success("Profile updated successfully!");
      onClose();
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="w-full max-w-[700px] max-h-[95vh] bg-white rounded-2xl mx-auto p-6 sm:p-8 flex flex-col">
      <h2 className="text-title pb-3 sm:pb-4 text-center">
        Edit Nanny Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full input input-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full input input-text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full input input-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full input input-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full input input-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Kids Age</label>
            <input
              type="text"
              name="kids_age"
              value={formData.kids_age}
              onChange={handleChange}
              className="w-full input input-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Price per Hour</label>
            <input
              type="number"
              name="price_per_hour"
              value={formData.price_per_hour}
              onChange={handleChange}
              className="w-full input input-text"
              required
              min={5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full input input-text"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full input input-text resize-none h-24"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Characters</label>
          <input
            type="text"
            name="characters"
            value={formData.characters}
            onChange={handleChange}
            className="w-full input input-text"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-64 bg-main text-white py-2 rounded-lg hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditNannyProfile;
