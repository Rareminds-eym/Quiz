import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchStudentById } from "../composables/helpers";
import { User } from "../types";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user?.RollNo) {
        const data = await fetchStudentById(user.RollNo);
        if (data) {
          setUserData(data);
        } else {
          console.log("Unable to fetch user data");
        }
      }
    };

    fetchData();
  }, [user?.RollNo]);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <UserIcon className="h-5 w-5 text-blue-600" />
        </div>
        <span className="font-medium hidden md:block">
          {userData?.name}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-3 border-b">
            <p className="text-sm leading-5 font-medium text-gray-900">
              {userData?.name}
            </p>
            <p className="text-sm leading-5 text-gray-500 truncate">
              {user.email}
            </p>
          </div>

          <a
            href="#profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              navigate("/profile");
            }}
          >
            Profile Information
          </a>

          <a
            href="#logout"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <div className="flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
