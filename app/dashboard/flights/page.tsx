"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Manage = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("Generate Schedual");

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  // const handleSchedual = async () => {
  //   setLoading(true);
  //   try {
  //     const requestHeaders: HeadersInit = new Headers();
  //     requestHeaders.set("Content-Type", "application/json");
  //     requestHeaders.set(
  //       "Authorization",
  //       "key=BAfmM6jnotxdepHkkLc2ygp1K5qZNbsikjHwSUQHzqQQ-ErwqAgpZmVLAXepxc_lPJl_txc1k9JTdJPBZZvXw_E"
  //     );
  //     const MessageResponse = await fetch(
  //       "https://fcm.googleapis.com/gcm/send",
  //       {
  //         method: "POST", // *GET, POST, PUT, DELETE, etc.
  //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //         headers: requestHeaders,
  //         body: JSON.stringify({
  //           to: `/topics/test`,
  //           notification: {
  //             title: "Schedual Updates",
  //             body: "Their Are New Updates In Your Flights Schedual",
  //           },
  //         }),
  //       }
  //     );
  //     if (MessageResponse.status === 200) {
  //       console.log(text);
  //       setText("Success");
  //       setTimeout(() => {
  //         setLoading(false);
  //         setText("Generate Schedual");
  //       }, 600);
  //     } else {
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     setLoading(false);
  //   }
  // };
  const handleSchedual = () => {
    setLoading(true);
    setText("Generating...");
    setTimeout(() => {
      setLoading(false);
      setTimeout(
        () => {
          setText("Schedual Generated Successfully...");
          setTimeout(() => setText("Generate Schedual"), 2000);
        },

        2000
      );
    }, 3000);
  };
  return (
    <>
      {/* <!-- Content header --> */}
      <div className="flex items-center justify-between px-4 py-4 border-b lg:py-6 dark:border-primary-darker">
        <h1 className="text-2xl font-semibold">Manage Filghts</h1>
        {/* <a
          href="#"
          // href="https://github.com/Kamona-WD/kwd-dashboard"
          // target="_blank"
          className="px-4 py-2 text-sm text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
        >
          Explore
        </a> */}
      </div>
      <div className="grid grid-cols-1 p-4">
        <div className="w-full px-4 py-6 space-y-6 bg-white rounded-md dark:bg-darker">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base">Flight List</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <Link
                  href="/dashboard/flights/add"
                  className="bg-primary hover:bg-primary-dark text-white focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark text-xs font-bold uppercase px-3 py-1 rounded outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Create Flight
                </Link>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Title
                  </th>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Origin
                  </th>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Destination
                  </th>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Depart Time
                  </th>
                  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Arrive Time
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  ">
                    BUJ-989980-JH
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    جدة - السعودية
                  </td>
                  <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    Chicago - USA
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                    2022-08-01 05:00 PM
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                    2022-08-02 05:00 AM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center px-4 max-w-full">
            {/* <div className="relative p-5 cursor-pointer">
              <div
                onClick={handleSchedual}
                className="bg-primary hover:bg-primary-dark text-white focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark text-sm font-bold uppercase px-3 py-1 rounded outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                {loading ? "Generating..." : text}
              </div>
            </div> */}
            <div className="relative p-5 cursor-pointer">
              <div
                onClick={handleSchedual}
                className="bg-primary hover:bg-primary-dark text-white focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark text-sm font-bold uppercase px-3 py-1 rounded outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                {text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage;
