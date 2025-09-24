import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Doctors Card */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
            <img src={assets.earning_icon} alt="doctor" className="w-12 h-12" />
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {currency}
                {dashData.earnings}
              </p>
              <p className="text-gray-500 font-medium">Earnings</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
            <img
              src={assets.appointments_icon}
              alt="appointments"
              className="w-12 h-12"
            />
            <div>
              <p className="text-3xl font-bold text-green-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 font-medium">Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
            <img
              src={assets.patients_icon}
              alt="patients"
              className="w-12 h-12"
            />
            <div>
              <p className="text-3xl font-bold text-purple-600">
                {dashData.patients}
              </p>
              <p className="text-gray-500 font-medium">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="mt-10 bg-white rounded shadow-lg p-4">
          <div className="flex items-center gap-2.5 px-4 py-3 border-b">
            <img src={assets.list_icon} alt="list" className="w-6 h-6" />
            <p className="font-semibold text-lg">Latest Bookings</p>
          </div>

          <div className="overflow-x-auto mt-4 w-full">
            <div className="min-w-[1000px]">
              {dashData.latestAppointments?.length > 0 ? (
                dashData.latestAppointments.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-6 py-3 gap-4 hover:bg-gray-50 border-b"
                  >
                    {/* Doctor Image */}
                    <img
                      className="rounded-full w-12 h-12"
                      src={item.userData?.image}
                      alt=""
                    />

                    {/* Doctor Info */}
                    <div className="flex-1 ml-4">
                      <p className="text-gray-800 font-medium">
                        {item.userData?.name}
                      </p>
                      <p className="text-gray-600">
                        {slotDateFormat(item.slotDate)}, {item.slotTime}
                      </p>
                    </div>

                    {item.cancelled ? (
                      <p className="text-red-400 text-xs font-medium">
                        Cancelled
                      </p>
                    ) : item.isCompleted ? (
                      <p className="text-green-500 text-xs font-medium">
                        Completed
                      </p>
                    ) : (
                      <div className="flex">
                        <img
                          onClick={() => cancelAppointment(item._id)}
                          className="w-10 cursor-pointer"
                          src={assets.cancel_icon}
                          alt=""
                        />
                        <img
                          onClick={() => completeAppointment(item._id)}
                          className="w-10 cursor-pointer"
                          src={assets.tick_icon}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="px-6 py-4 text-gray-500">No latest bookings</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
