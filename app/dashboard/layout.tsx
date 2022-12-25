"use client";
import "../../styles/globals.css";
import { useState, useRef } from "react";
import NavLink from "../../components/NavLink";
import avatar from "../../public/avatar.jpg";
import tarcologo from "../../public/tarcoair.png";

import {
  HomeIcon,
  AdjustmentsHorizontalIcon,
  DocumentIcon,
  ShieldExclamationIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import Backdrop from "../../components/Backdrop";
import SettingPanel from "../../components/SettingPanel";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { usePathname } from "next/navigation";
import NotificationPanel from "../../components/NotificationPanel";
import SearchPanel from "../../components/SearchPanel";
import { useLocalStorage } from "../../hooks/useStorage";
import { useLoaded } from "../../hooks/useLoaded";
import Link from "next/link";
import Image from "next/image";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { BounceLoader } from "react-spinners";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loaded = useLoaded();
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const notificationsPanelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  // const [selectedColor, setSelectedColor] = useState("cyan");
  // const [isDark, setIsDark] = useState<boolean>(
  //   window.localStorage.getItem("dark") == null
  //     ? false
  //     : JSON.parse(window.localStorage.getItem("dark")!)
  // );

  const [isDark, setIsDark] = useLocalStorage("dark", false);
  // const [isActive, setIsActive] = useState(false);
  const isActive = false;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  const [isMobileMainMenuOpen, setIsMobileMainMenuOpen] = useState(false);
  useState(false);

  const [sidebar, setSidebar] = useState(true);

  const pathname = usePathname();

  const [openSetting, openSettingHandler] = useCycle(false, true);
  const [openUserProfile, setOpenUserProfile] = useCycle(false, true);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useCycle(
    false,
    true
  );
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useCycle(false, true);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useCycle(false, true);

  // const setTheme = (value: string) => {
  //   window.localStorage.setItem("dark", value);
  // };
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    // setTheme(!isDark as unknown as string);
  };
  const toggleSidbarMenu = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const openSettingsPanel = () => {
    settingsPanelRef?.current?.focus();
    openSettingHandler();
  };
  const openNotificationsPanel = () => {
    notificationsPanelRef?.current?.focus();
    setIsNotificationsPanelOpen();
  };

  const OpenUserProfilePanel = () => {
    setOpenUserProfile();
    if (openUserProfile) {
      userMenuRef?.current?.focus();
    }
  };
  const openSearchPanel = () => {
    searchInputRef?.current?.focus();
    setIsSearchPanelOpen();
  };
  const handleUserSpace = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "32") {
      setOpenUserProfile();
    }
  };
  const handleSideMenuSpace = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "32") {
      setIsMobileSubMenuOpen();
    }
  };
  // const getColor = () => {
  //   if (window.localStorage.getItem("color")) {
  //     return window.localStorage.getItem("color");
  //   }
  //   return "cyan";
  // };

  const variants = {
    inactive: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    out: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    in: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  const [color, setColor] = useLocalStorage("color", "cyan");
  const setColors = (color: string) => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", `var(--color-${color})`);
    root.style.setProperty("--color-primary-50", `var(--color-${color}-50)`);
    root.style.setProperty("--color-primary-100", `var(--color-${color}-100)`);
    root.style.setProperty(
      "--color-primary-light",
      `var(--color-${color}-light)`
    );
    root.style.setProperty(
      "--color-primary-lighter",
      `var(--color-${color}-lighter)`
    );
    root.style.setProperty(
      "--color-primary-dark",
      `var(--color-${color}-dark)`
    );
    root.style.setProperty(
      "--color-primary-darker",
      `var(--color-${color}-darker)`
    );
    // setSelectedColor(color);
    // window.localStorage.setItem("color", color);
    setColor(color);
    //
  };
  useUpdateEffect(() => {
    setColors(color);
  }, []);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>مستقل</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script>0</script>
        {/* <AnimatePresence initial={false} mode="wait"> */}

        <div className={isDark && loaded ? "dark" : ""}>
          <div className="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
            {/* <!-- Loading screen --> */}
            {!loaded && (
              <div
                // x-ref="loading"

                className="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold bg-white"
                // className="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-primary-darker"
              >
                {/* Loading..... */}
                <BounceLoader size={50} color="#8b8d8d" speedMultiplier={3} />
              </div>
            )}

            {/* <!-- Sidebar --> */}

            <AnimatePresence>
              {sidebar && (
                <motion.aside
                  initial={{ x: -300 }}
                  animate={{
                    x: 0,
                    transition: {
                      ease: "easeIn",
                      duration: 0.3,
                    },
                  }}
                  exit={{
                    x: -200,
                    transition: {
                      ease: "easeOut",
                      duration: 0.3,
                    },
                  }}
                  className="flex-shrink-0 hidden w-64 bg-white border-r dark:border-primary-darker dark:bg-darker md:block"
                >
                  <div className="flex flex-col h-full">
                    {/*  <!-- Sidebar links --> */}
                    <nav
                      aria-label="Main"
                      className="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto"
                    >
                      {/*  <!-- Dashboards links --> */}
                      <NavLink
                        title="Dashboard"
                        icon={<HomeIcon className="w-5 h-5" />}
                        open={true}
                        active={isActive}
                      >
                        {/* <!-- active & hover classes 'text-gray-700 dark:text-light' --> */}
                        {/* <!-- inActive classes 'text-gray-400 dark:text-gray-400' --> */}
                        <Link
                          href="/dashboard/home"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                        >
                          Default
                        </Link>
                        {/* <a
                          href="#"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                        >
                          Project Mangement (soon)
                        </a>
                        <a
                          href="#"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                        >
                          E-Commerce (soon)
                        </a> */}
                      </NavLink>

                      <NavLink
                        title="Flights"
                        icon={<PaperAirplaneIcon className="w-5 h-5" />}
                        open={true}
                        active={isActive}
                      >
                        {/* <!-- active & hover classes 'text-gray-700 dark:text-light' --> */}
                        {/* <!-- inActive classes 'text-gray-400 dark:text-gray-400' --> */}
                        <Link
                          href="/dashboard/flights"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                        >
                          Manage
                        </Link>
                        <Link
                          href="/dashboard/flights/add"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                        >
                          Create
                        </Link>
                      </NavLink>

                      <NavLink
                        title="Crew Members"
                        icon={<DocumentIcon className="w-5 h-5" />}
                        open={true}
                        active={isActive}
                      >
                        {/* <!-- active & hover classes 'text-gray-700 dark:text-light' --> */}
                        {/* <!-- inActive classes 'text-gray-400 dark:text-gray-400' --> */}
                        <Link
                          href="/dashboard/crew"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                        >
                          Manage
                        </Link>
                        <Link
                          href="/dashboard/crew/add"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                        >
                          Create
                        </Link>
                      </NavLink>

                      {/* Authentication links */}
                      <NavLink
                        title="Authentication"
                        icon={<ShieldExclamationIcon className="w-5 h-5" />}
                        open={false}
                        active={false}
                      >
                        {/* <!-- active & hover classes 'text-gray-700 dark:text-light' -->
                  <!-- inActive classes 'text-gray-400 dark:text-gray-400' --> */}
                        <Link
                          href="/auth/register"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                        >
                          Register
                        </Link>
                        <a
                          href="/auth/login"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                        >
                          Login
                        </a>
                        <a
                          href="#"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                        >
                          Forgot Password
                        </a>
                        <a
                          href="#"
                          role="menuitem"
                          className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                        >
                          Reset Password
                        </a>
                      </NavLink>
                    </nav>

                    {/* <!-- Sidebar footer --> */}
                    <div className="flex-shrink-0 px-2 py-4 space-y-2">
                      <button
                        // @click="openSettingsPanel"
                        onClick={openSettingsPanel}
                        type="button"
                        className="flex items-center justify-center w-full px-4 py-2 text-sm text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-dark focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
                      >
                        <span aria-hidden="true">
                          <svg
                            className="w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                          </svg>
                        </span>
                        <span>Customize</span>
                      </button>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
            <div className="flex-1 h-full overflow-x-hidden overflow-y-auto">
              {/* <!-- Navbar --> */}
              <header className="relative bg-white dark:bg-darker">
                <div className="flex items-center justify-between p-2 border-b dark:border-primary-darker">
                  {/* <!-- Mobile menu button --> */}
                  <button
                    // @click="isMobileMainMenuOpen = !isMobileMainMenuOpen"
                    onClick={() => setIsMobileMainMenuOpen((prev) => !prev)}
                    className="p-1 transition-colors duration-200 rounded-md text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark md:hidden focus:outline-none focus:ring"
                  >
                    <span className="sr-only">Open main manu</span>
                    <span aria-hidden="true">
                      <svg
                        className="w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* <!-- Brand --> */}
                  <div className="flex items-center content-between ">
                    <span
                      onClick={() => setSidebar((prev) => !prev)}
                      className="p-1 transition-colors duration-200 rounded-md text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark md:inline-block hidden focus:outline-none focus:ring cursor-pointer"
                    >
                      {/* <Bars2Icon className="w-5 h-5" /> */}
                      <svg
                        className="w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </span>
                    <Link
                      href="/dashboard/home"
                      className="text-2xl pl-3 font-bold tracking-wider uppercase text-primary-dark dark:text-light"
                    >
                      <Image
                        src={tarcologo}
                        width={100}
                        height={60}
                        alt="logo"
                        className="mb-5"
                      />
                    </Link>
                  </div>

                  {/* <!-- Mobile sub menu button --> */}
                  <button
                    // @click="isMobileSubMenuOpen = !isMobileSubMenuOpen"
                    onClick={() => setIsMobileSubMenuOpen()}
                    className="p-1 transition-colors duration-200 rounded-md text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark md:hidden focus:outline-none focus:ring"
                  >
                    <span className="sr-only">Open sub manu</span>
                    <span aria-hidden="true">
                      <svg
                        className="w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* <!-- Desktop Right buttons --> */}
                  <nav
                    aria-label="Secondary"
                    className="hidden space-x-2 md:flex md:items-center"
                  >
                    {/* <!-- Toggle dark theme button -->  x-cloak @click="toggleTheme"*/}
                    <button
                      aria-hidden="true"
                      className="relative focus:outline-none"
                      onClick={() => toggleTheme()}
                    >
                      <div className="w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-lighter"></div>
                      <div
                        className={`absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-150 transform scale-110 rounded-full shadow-sm ${
                          isDark && loaded
                            ? "translate-x-6 text-primary-100 bg-primary-darker"
                            : "translate-x-0 -translate-y-px  bg-white text-primary-dark"
                        }`}
                        // :class="{ 'translate-x-0 -translate-y-px  bg-white text-primary-dark': !isDark, 'translate-x-6 text-primary-100 bg-primary-darker': isDark }"
                      >
                        <svg
                          // x-show="!isDark"
                          className={`w-4 h-4 ${isDark && loaded && "hidden"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                        <svg
                          // x-show="isDark"
                          className={`w-4 h-4 ${!isDark && loaded && "hidden"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* <!-- Notification button --> */}
                    <button
                      // @click="openNotificationsPanel"
                      onClick={openNotificationsPanel}
                      className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark focus:outline-none focus:bg-primary-100 dark:focus:bg-primary-dark focus:ring-primary-darker"
                    >
                      <span className="sr-only">Open Notification panel</span>
                      <svg
                        className="w-7 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </button>

                    {/* <!-- Search button --> */}
                    <button
                      // @click="openSearchPanel"
                      onClick={openSearchPanel}
                      className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark focus:outline-none focus:bg-primary-100 dark:focus:bg-primary-dark focus:ring-primary-darker"
                    >
                      <span className="sr-only">Open search panel</span>
                      <svg
                        className="w-7 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>

                    {/* <!-- Settings button --> */}
                    <button
                      // @click="openSettingsPanel"
                      onClick={openSettingsPanel}
                      className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark focus:outline-none focus:bg-primary-100 dark:focus:bg-primary-dark focus:ring-primary-darker"
                    >
                      <span className="sr-only">Open settings panel</span>
                      <svg
                        className="w-7 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>

                    {/* <!-- User avatar button --> x-data="{ open: false }"*/}
                    <div className="relative">
                      <button
                        onClick={OpenUserProfilePanel}
                        // @click="open = !open; $nextTick(() => { if(open){ $refs.userMenu.focus() } })"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={openUserProfile ? "true" : "false"}
                        className="transition-opacity duration-200 rounded-full dark:opacity-75 dark:hover:opacity-100 focus:outline-none focus:ring dark:focus:opacity-100"
                      >
                        <span className="sr-only">User menu</span>
                        <Image
                          className="w-10 h-10 rounded-full"
                          src={avatar}
                          alt="avatar"
                        />
                      </button>

                      {/* <!-- User dropdown menu --> */}
                      {openUserProfile && (
                        <AnimatePresence>
                          <motion.div
                            // x-show="open"
                            ref={userMenuRef}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: {
                                ease: "easeOut",
                                duration: 0.3,
                              },
                            }}
                            exit={{
                              opacity: 0,
                              y: 20,
                              transition: {
                                ease: "easeIn",
                                duration: 0.2,
                              },
                            }}
                            // x-transition:enter="transition-all transform ease-out"
                            // x-transition:enter-start="translate-y-1/2 opacity-0"
                            // x-transition:enter-end="translate-y-0 opacity-100"
                            // x-transition:leave="transition-all transform ease-in"
                            // x-transition:leave-start="translate-y-0 opacity-100"
                            // x-transition:leave-end="translate-y-1/2 opacity-0"
                            // @click.away="open = false"
                            // @keydown.escape="open = false"
                            onKeyDown={handleUserSpace}
                            className={`absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none z-10`}
                            tabIndex={-1}
                            role="menu"
                            aria-orientation="vertical"
                            aria-label="User menu"
                          >
                            <a
                              href="#"
                              role="menuitem"
                              className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"
                            >
                              Your Profile
                            </a>
                            <a
                              href="#"
                              role="menuitem"
                              className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"
                            >
                              Settings
                            </a>
                            <a
                              href="#"
                              role="menuitem"
                              className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"
                            >
                              Logout
                            </a>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
                  </nav>

                  {/* <!-- Mobile sub menu --> */}
                  <AnimatePresence>
                    {isMobileSubMenuOpen && (
                      <motion.nav
                        initial={{ opacity: 0, y: 100 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            ease: "easeInOut",
                            duration: 0.3,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: 100,
                          transition: {
                            ease: "easeOut",
                            duration: 0.2,
                          },
                        }}
                        // x-transition:enter="transition duration-200 ease-in-out transform sm:duration-500"
                        // x-transition:enter-start="-translate-y-full opacity-0"
                        // x-transition:enter-end="translate-y-0 opacity-100"
                        // x-transition:leave="transition duration-300 ease-in-out transform sm:duration-500"
                        // x-transition:leave-start="translate-y-0 opacity-100"
                        // x-transition:leave-end="-translate-y-full opacity-0"
                        // x-show="isMobileSubMenuOpen"
                        // @click.away="isMobileSubMenuOpen = false"
                        onKeyDown={handleSideMenuSpace}
                        className={`absolute flex items-center z-10 p-4 bg-white rounded-md shadow-lg dark:bg-darker top-16 inset-x-4 md:hidden`}
                        aria-label="Secondary"
                      >
                        <div className="space-x-2">
                          {/* <!-- Toggle dark theme button --> x-cloak @click="toggleTheme"*/}
                          <button
                            aria-hidden="true"
                            className="relative focus:outline-none"
                            onClick={() => toggleTheme()}
                          >
                            <div className="w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-lighter"></div>
                            <div
                              className={`absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 transform scale-110 rounded-full shadow-sm
                          ${
                            isDark && loaded
                              ? "translate-x-6 text-primary-100 bg-primary-darker"
                              : "translate-x-0 -translate-y-px  bg-white text-primary-dark"
                          }`}
                              // :class="{ 'translate-x-0 -translate-y-px  bg-white text-primary-dark': !isDark, 'translate-x-6 text-primary-100 bg-primary-darker': isDark }"
                            >
                              <svg
                                // x-show="!isDark"
                                className={`w-4 h-4 ${
                                  isDark && loaded ? "hidden" : ""
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                              </svg>
                              <svg
                                // x-show="isDark"
                                className={`w-4 h-4 ${
                                  !isDark && loaded ? "hidden" : ""
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            </div>
                          </button>

                          {/* <!-- Notification button --> */}
                          <button
                            // @click="openNotificationsPanel(); $nextTick(() => { isMobileSubMenuOpen = false })"
                            onClick={() => {
                              openNotificationsPanel();
                              setIsMobileSubMenuOpen();
                            }}
                            className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark focus:outline-none focus:bg-primary-100 dark:focus:bg-primary-dark focus:ring-primary-darker"
                          >
                            <span className="sr-only">
                              Open notifications panel
                            </span>
                            <svg
                              className="w-7 h-7"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                              />
                            </svg>
                          </button>

                          {/* <!-- Search button --> */}
                          <button
                            onClick={() => {
                              openSearchPanel();
                              setIsMobileSubMenuOpen();
                              // setTimeout(() => setIsMobileSubMenuOpen(), 100);
                            }}
                            // @click="openSearchPanel(); $nextTick(() => { $refs.searchInput.focus(); setTimeout(() => {isMobileSubMenuOpen= false}, 100) })"
                            className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark focus:outline-none focus:bg-primary-100 dark:focus:bg-primary-dark focus:ring-primary-darker"
                          >
                            <span className="sr-only">Open search panel</span>
                            <svg
                              className="w-7 h-7"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </button>

                          {/* <!-- Settings button --> */}
                          <button
                            onClick={() => {
                              openSettingsPanel();
                              setIsMobileSubMenuOpen();
                            }}
                            // @click="openSettingsPanel(); $nextTick(() => { isMobileSubMenuOpen = false })"
                            className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark focus:outline-none focus:bg-primary-100 dark:focus:bg-primary-dark focus:ring-primary-darker"
                          >
                            <span className="sr-only">Open settings panel</span>
                            <svg
                              className="w-7 h-7"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* <!-- User avatar button --> x-data="{ open: false }"*/}
                        <div className="relative ml-auto">
                          <button
                            // @click="open = !open"
                            onClick={OpenUserProfilePanel}
                            type="button"
                            aria-haspopup="true"
                            // :aria-expanded="open ? 'true' : 'false'"
                            aria-expanded={openUserProfile ? "true" : "false"}
                            className="block transition-opacity duration-200 rounded-full dark:opacity-75 dark:hover:opacity-100 focus:outline-none focus:ring dark:focus:opacity-100"
                          >
                            <span className="sr-only">User menu</span>
                            <Image
                              className="w-10 h-10 rounded-full"
                              src={avatar}
                              alt="Ahmed Kamel"
                            />
                          </button>
                          {/* <!-- User dropdown menu --> */}
                          {openUserProfile && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                  ease: "easeOut",
                                  duration: 0.3,
                                },
                              }}
                              exit={{
                                opacity: 0,
                                y: 20,
                                transition: {
                                  ease: "easeIn",
                                  duration: 0.2,
                                },
                              }}
                              // x-show="open"
                              // x-transition:enter="transition-all transform ease-out"
                              // x-transition:enter-start="translate-y-1/2 opacity-0"
                              // x-transition:enter-end="translate-y-0 opacity-100"
                              // x-transition:leave="transition-all transform ease-in"
                              // x-transition:leave-start="translate-y-0 opacity-100"
                              // x-transition:leave-end="translate-y-1/2 opacity-0"
                              // @click.away="open = false"
                              className={`absolute right-0 w-48 py-1 origin-top-right bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 dark:bg-dark`}
                              role="menu"
                              aria-orientation="vertical"
                              aria-label="User menu"
                            >
                              <a
                                href="#"
                                role="menuitem"
                                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"
                              >
                                Your Profile
                              </a>
                              <a
                                href="#"
                                role="menuitem"
                                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"
                              >
                                Settings
                              </a>
                              <a
                                href="#"
                                role="menuitem"
                                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"
                              >
                                Logout
                              </a>
                            </motion.div>
                          )}
                        </div>
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </div>
                {/* <!-- Mobile main manu --> */}
                <div
                  className={`border-b md:hidden dark:border-primary-darker ${
                    !isMobileMainMenuOpen ? "hidden" : ""
                  }`}
                  // x-show="isMobileMainMenuOpen"
                  // @click.away="isMobileMainMenuOpen = false"
                >
                  <nav aria-label="Main" className="px-2 py-4 space-y-2">
                    {/*  <!-- Dashboards links --> */}

                    <NavLink
                      title="Dashboard"
                      icon={<HomeIcon className="w-5 h-5" />}
                      open={true}
                      active={isActive}
                    >
                      {/* <!-- active & hover classes 'text-gray-700 dark:text-light' --> */}
                      {/* <!-- inActive classes 'text-gray-400 dark:text-gray-400' --> */}
                      <Link
                        href="/dashboard/home"
                        role="menuitem"
                        className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                      >
                        Default
                      </Link>
                    </NavLink>

                    <NavLink
                      title="Flights"
                      icon={<PaperAirplaneIcon className="w-5 h-5" />}
                      open={true}
                      active={isActive}
                    >
                      {/* <!-- active & hover classes 'text-gray-700 dark:text-light' --> */}
                      {/* <!-- inActive classes 'text-gray-400 dark:text-gray-400' --> */}
                      <Link
                        href="/dashboard/flights"
                        role="menuitem"
                        className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                      >
                        Manage
                      </Link>
                      <Link
                        href="/dashboard/flights/add"
                        role="menuitem"
                        className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                      >
                        Create
                      </Link>
                    </NavLink>

                    <NavLink
                      title="Crew Members"
                      icon={<DocumentIcon className="w-5 h-5" />}
                      open={true}
                      active={isActive}
                    >
                      {/* <!-- active & hover classes 'text-gray-700 dark:text-light' --> */}
                      {/* <!-- inActive classes 'text-gray-400 dark:text-gray-400' --> */}
                      <Link
                        href="/dashboard/crew"
                        role="menuitem"
                        className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                      >
                        Manage
                      </Link>
                      <Link
                        href="/dashboard/crew/add"
                        role="menuitem"
                        className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700"
                      >
                        Create
                      </Link>
                    </NavLink>

                    {/* Authentication links */}
                    <NavLink
                      title="Authentication"
                      icon={<ShieldExclamationIcon className="w-5 h-5" />}
                      open={false}
                      active={false}
                    >
                      {/* <!-- active & hover classes 'text-gray-700 dark:text-light' -->
                  <!-- inActive classes 'text-gray-400 dark:text-gray-400' --> */}
                      <Link
                        href="/auth/register"
                        role="menuitem"
                        className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                      >
                        Register
                      </Link>
                      <Link
                        href="/auth/login"
                        role="menuitem"
                        className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                      >
                        Login
                      </Link>
                      <a
                        href="#"
                        role="menuitem"
                        className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                      >
                        Forgot Password
                      </a>
                      <a
                        href="#"
                        role="menuitem"
                        className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                      >
                        Reset Password
                      </a>
                    </NavLink>
                  </nav>
                </div>
              </header>

              {/* <!-- Main content --> */}
              <main>
                {/* <!-- Content --> */}
                <motion.div
                  key={pathname}
                  variants={variants}
                  initial="in"
                  animate="inactive"
                  exit="out"
                  className="m-2"
                >
                  {children}
                </motion.div>
              </main>
            </div>

            {/* Panels and Backdrops */}

            <AnimatePresence>
              {openSetting && (
                <>
                  <Backdrop
                    isOpen={openSetting}
                    handleClick={() => openSettingHandler()}
                  />
                  <SettingPanel
                    isDark={isDark}
                    setIsDark={setIsDark}
                    // setIsSettingsPanelOpen={setIsSettingsPanelOpen}
                    handleClick={() => openSettingHandler()}
                    settingPanelRef={settingsPanelRef}
                    // setSelectedColor={setSelectedColor}
                  />
                </>
              )}

              {isNotificationsPanelOpen && (
                <>
                  <Backdrop
                    isOpen={isNotificationsPanelOpen}
                    handleClick={() => setIsNotificationsPanelOpen()}
                  />
                  <NotificationPanel
                    handleClick={() => setIsNotificationsPanelOpen()}
                    NotificationPanelRef={notificationsPanelRef}
                  />
                </>
              )}

              {isSearchPanelOpen && (
                <>
                  <Backdrop
                    isOpen={isSearchPanelOpen}
                    handleClick={() => setIsSearchPanelOpen()}
                  />
                  <SearchPanel
                    handleClick={() => setIsSearchPanelOpen()}
                    SearchPanelRef={searchInputRef}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </body>
    </html>
  );
}
