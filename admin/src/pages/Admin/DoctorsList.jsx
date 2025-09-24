import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden border-indigo-400  cursor-pointer"
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-48 overflow-hidden bg-indigo-50 hover:bg-primary transition-all duration-500"
            />
            <div className="p-4">
              <p className="text-xl font-semibold text-gray-800">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
              <div className="flex items-center gap-2 mt-3">
                <input
                  onChange={() => changeAvailability(item._id)}
                  className="w-4 h-4 accent-blue-600"
                  type="checkbox"
                  checked={item.available}
                />
                <p
                  className={`text-sm font-medium ${
                    item.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Available
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
