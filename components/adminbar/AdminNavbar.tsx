"use client";
import useAdminRoutes from "@/app/hooks/adminRoutes";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import NavItem from "./NavItem";
import { HiBars3 } from "react-icons/hi2";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import SettingsModal from "../sidebar/SettingsModal";

interface AdminNavProps {
  currentUser: User;
  children: any;
}

const AdminNavbar: React.FC<AdminNavProps> = ({ currentUser, children }) => {
  const routes = useAdminRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const [isSideOpen, setSideOpen] = useState(Boolean);

  const sidebar = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  });

  const handleClickOutside = (e: any) => {
    if (!sidebar.current!.contains(e.target)) {
      setSideOpen(false);
    }
  };
  console.log({ currentUser });
  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <aside ref={sidebar} className={isSideOpen ? "block" : ""}>
        <div className="user-page__top">
          <div className="user-page-logo">
            <a className="user-page-logo" href="/admin">
              <Image
                height="40"
                width="40"
                alt="logo"
                className="opcacity-70  "
                src="/images/icon_camel.png"
              />
              <h2>Brand Name</h2>
            </a>
          </div>
          <div className="close" id="close-btn">
            <i className="fa-light fa-xmark"></i>
          </div>
        </div>

        <div className="sidebar">
          {routes.map((item) => (
            <NavItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </div>
      </aside>
      {children}
      <div className="right px-4">
        <div className="top">
          <button
            id="menu-btn"
            onClick={() => {
              setSideOpen(true);
            }}
          >
            <HiBars3 className="w-6 h-6" />
          </button>

          <div className="profile">
            <div className="info">
              <p>
                Hey, <b>{currentUser.name}</b>
              </p>
              <small className="text-muted">{currentUser.role}</small>
            </div>
            <div className="profile-photo">
              <div
                className="cursor-pointer hover:opacity-75 transition"
                onClick={() => setIsOpen(true)}
              >
                <Avatar user={currentUser} />
              </div>
            </div>
          </div>
        </div>

        <div className="recent-updates">
          <h2>Recent Updates</h2>
          <div className="updates">
            <div className="update">
              <div className="profile-photo">
                <Avatar />
              </div>
              <div className="message">
                <p>
                  <b>Imran Patel</b> received his order of order of Khopesh
                </p>
                <small className="text-muted">2 minutes ago</small>
              </div>
            </div>
            <div className="update">
              <div className="profile-photo">
                <Avatar />
              </div>
              <div className="message">
                <p>
                  <b>Justin Perry</b> received his order of order of Gladius
                </p>
                <small className="text-muted">8 minutes ago</small>
              </div>
            </div>
            <div className="update">
              <div className="profile-photo">
                <Avatar />
              </div>
              <div className="message">
                <p>
                  <b>Jade Mendoza</b> received his order of order of Gladius
                </p>
                <small className="text-muted">32 minutes ago</small>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics">
          <h2>Analytics</h2>
          <div className="item online">
            <div className="icon">
              <i className="fa-solid fa-cart-plus"></i>
            </div>
            <div className="right">
              <div className="info">
                <h3>ONLINE ORDERS</h3>
                <small className="text-muted"> Last 24 Hours</small>
              </div>
              <h5 className="success">+39%</h5>
              <h3>3849</h3>
            </div>
          </div>
          <div className="item nearby">
            <div className="icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="right">
              <div className="info">
                <h3>NEARBY CONVERSIONS</h3>
                <small className="text-muted"> Last 24 Hours</small>
              </div>
              <h5 className="danger">-17%</h5>
              <h3>110</h3>
            </div>
          </div>
          <div className="item activity">
            <div className="icon">
              <i className="fa-regular fa-chart-line"></i>
            </div>
            <div className="right">
              <div className="info">
                <h3>ACTIVITY</h3>
                <small className="text-muted"> Last 24 Hours</small>
              </div>
              <h5 className="success">+39%</h5>
              <h3>817</h3>
            </div>
          </div>
          <div className="item add-contact">
            <div className="">
              <i className="fa-solid fa-plus"></i>
              <h3>Add Contact</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
