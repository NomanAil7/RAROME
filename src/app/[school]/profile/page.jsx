
// "use client";

// import { useEffect, useState } from "react";
// import "./ProfilePage.css"; // Import CSS

// export default function ProfilePage({ params }) {
//   const { school } = params; // school = id from URL
//   const [schoolData, setSchoolData] = useState(null);

//   useEffect(() => {
//     const fetchSchool = async () => {
//       try {
//         // Call API with the school id
//         const res = await fetch(`/api/school/${school}`);
//         if (!res.ok) {
//           throw new Error("Failed to fetch school data");
//         }
//         const data = await res.json();
//         console.log("Fetched School Data:", data);
//         setSchoolData(data);
//       } catch (error) {
//         console.error("Error fetching school data:", error);
//       }
//     };

//     fetchSchool();
//   }, [school]);

//   if (!schoolData) return <p>Loading...</p>;

//   return (
//     <div className="profile-container">
//       <h1>{schoolData.name}</h1>
//       <p className="description">{schoolData.description}</p>
//       <div className="details">
//         <p><strong>Contact Email:</strong> {schoolData.contact_email}</p>
//         <p><strong>Phone:</strong> {schoolData.contact_phone}</p>
//         <p><strong>Address:</strong> {schoolData.description}</p>
        
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage({ params }) {
  const { school } = params; // school = id from URL
  const [schoolData, setSchoolData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch(`/api/school/${school}`);
        if (!res.ok) throw new Error("Failed to fetch school data");

        const data = await res.json();
        setSchoolData(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };

    fetchSchool();
  }, [school]);

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/school/${school}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updatedData = await res.json();
        setSchoolData(updatedData);
        setIsEditMode(false);
        alert("School information updated successfully!");
      } else {
        alert("Failed to update school info");
      }
    } catch (error) {
      console.error("Error updating school data:", error);
    }
  };

  if (!schoolData) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>{schoolData.name}</h1>
      <p className="description">{schoolData.description}</p>
      <div className="details">
        <label>
          <strong>Contact Email:</strong>
          {isEditMode ? (
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{schoolData.contact_email}</span>
          )}
        </label>
        <label>
          <strong>Phone:</strong>
          {isEditMode ? (
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleInputChange}
            />
          ) : (
            <span>{schoolData.contact_phone}</span>
          )}
        </label>
        <label>
          <strong>Address:</strong>
          {isEditMode ? (
            <input
              type="text"
              name="address"
              value={formData.description}
              onChange={handleInputChange}
            />
          ) : (
            
            <span>{schoolData.description}</span>
          )}
        </label>
      </div>

      <div className="actions">
        {isEditMode ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleEditToggle}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-btn" onClick={handleEditToggle}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
