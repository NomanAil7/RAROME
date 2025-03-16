// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import "./AdminPage.css"; // Import the CSS file

// export default function AdminPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [schools, setSchools] = useState([]);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     } else if (status === "authenticated") {
//       fetchSchools();
//     }
//   }, [status]);

//   const fetchSchools = async () => {
//     try {
//       const res = await fetch("/api/school");
//       const data = await res.json();
//       console.log("Schools:", data);
//       setSchools(data[0]);
//     } catch (error) {
//       console.error("Error fetching schools", error);
//     }
//   };

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container">
//       <header className="header">
//         <h1>Welcome, {session?.user?.email}</h1>
//         <button className="logout-btn" onClick={() => signOut()}>
//           Logout
//         </button>
//       </header>

//       <h2 className="section-title">All Schools</h2>
//       <table className="schools-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Contact</th>
//           </tr>
//         </thead>
//         <tbody>
//           {schools.map((school, index) => (
//             <tr key={school.id || index}>
//               <td>{school.id}</td>
//               <td>{school.name}</td>
//               <td>{school.description}</td>
//               <td>{school.contact_email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./AdminPage.css";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchSchools();
    }
  }, [status]);

  const fetchSchools = async () => {
    try {
      const res = await fetch("/api/school");
      const data = await res.json();
      console.log("Schools:", data);
      setSchools(data[0]);
    } catch (error) {
      console.error("Error fetching schools", error);
    }
  };
  const handleView = (school) => {
    router.push(`/${school.id}/profile`);
  };
  

  const handleEdit = (school) => {
    setIsEditMode(true);
    setSelectedSchool(school);
  };

  const handleModalClose = () => {
    setSelectedSchool(null);
  };

  const handleInputChange = (e) => {
    setSelectedSchool({ ...selectedSchool, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/school/${selectedSchool.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedSchool),
      });
      if (res.ok) {
        fetchSchools();
        alert("School updated successfully!");
        setSelectedSchool(null);
      } else {
        alert("Error updating school");
      }
    } catch (error) {
      console.error("Error updating school:", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Welcome, {session?.user?.email}</h1>
        <button className="logout-btn" onClick={() => signOut()}>
          Logout
        </button>
      </header>

      <h2 className="section-title">All Schools</h2>
      <table className="schools-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school, index) => (
            <tr key={school.id || index}>
              <td>{school.id}</td>
              <td>{school.name}</td>
              <td>{school.description}</td>
              <td>{school.contact_email}</td>
              <td>
                <button className="action-btn" onClick={() => handleView(school)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedSchool && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{isEditMode ? "Edit School" : "View School"}</h3>
            <div className="modal-content">
              <label>
                Name:
                {isEditMode ? (
                  <input
                    type="text"
                    name="name"
                    value={selectedSchool.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{selectedSchool.name}</p>
                )}
              </label>
              <label>
                Description:
                {isEditMode ? (
                  <input
                    type="text"
                    name="description"
                    value={selectedSchool.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{selectedSchool.description}</p>
                )}
              </label>
              <label>
                Contact Email:
                {isEditMode ? (
                  <input
                    type="email"
                    name="contact_email"
                    value={selectedSchool.contact_email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{selectedSchool.contact_email}</p>
                )}
              </label>
            </div>
            <div className="modal-actions">
              {isEditMode && <button className="save-btn" onClick={handleSave}>Save</button>}
              <button className="close-btn" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
