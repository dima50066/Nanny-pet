import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNannyProfile,
  deleteNannyProfile,
} from "../../redux/nanny/operations";
import {
  selectLoading,
  selectMyNannyProfile,
} from "../../redux/nanny/selectors";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";

interface CreateNannyProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  birthday: string;
  experience: string;
  education: string;
  kids_age: string;
  price_per_hour: number;
  location: string;
  about: string;
  characters: string;
}

const CreateNannyProfile: React.FC<CreateNannyProfileProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);
  const myNannyProfile = useSelector(selectMyNannyProfile);

  const [formData, setFormData] = useState<FormData>({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!avatarFile) {
      toast.error("Please upload an avatar file.");
      return;
    }

    const payload = {
      data: { ...formData },
      file: avatarFile,
    };

    dispatch(createNannyProfile(payload));
    onClose();
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your nanny profile?")) {
      try {
        await dispatch(deleteNannyProfile());
        toast.success("Nanny profile deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete nanny profile.");
        console.error("Failed to delete nanny profile:", error);
      }
    }
  };

  return (
    <div className="w-full  max-w-[700px] max-h-[95vh] bg-white shadow-lg rounded-2xl mx-auto p-6 sm:p-8 flex flex-col">
      {myNannyProfile ? (
        <button
          className="w-full sm:w-64 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          onClick={handleDeleteProfile}
        >
          Delete Nanny Profile
        </button>
      ) : (
        <>
          <h2 className="text-title pb-3 sm:pb-4 text-center">
            Create Nanny Profile
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
                  placeholder="Alexandra"
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
                  placeholder="1 year of experience"
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
                  placeholder="Bachelor of Psychology"
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
                  placeholder="2-4 years old"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Price per Hour
                </label>
                <input
                  type="number"
                  name="price_per_hour"
                  value={formData.price_per_hour}
                  onChange={handleChange}
                  className="w-full input input-text"
                  required
                  placeholder="Enter the price per hour"
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
                  placeholder="Kyiv, Ukraine"
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
                placeholder="Tell us about yourself"
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
                placeholder="Compassionate, Patient, Responsible"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full sm:w-64 bg-main text-white py-2 rounded-lg hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Profile"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateNannyProfile;
