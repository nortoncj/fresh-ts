import React, { FC } from "react";
import getUserDetails from "@/app/actions/getuserDetails";
import Link from "next/link";
import { HiMail, HiPhone } from "react-icons/hi";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { FaMobile } from "react-icons/fa";
import { AddToContact } from "./components/addToContact";
import "./freemium.css";
import Image from "next/image";
interface ProfilePageProps {
  params: { username: string };
}
const ProfilePage: FC<ProfilePageProps> = async ({ params }) => {
  const user = await getUserDetails(params.username);
  const emailLink = "mailto:" + user?.email;
  const phoneLink = "sms:+" + user?.phone;
  return (
    <>
      {user ? (
        <>
          <div className="" id="lock">
            <div className="header h-30 w-full  py-2">
              <Image
                className="mx-auto"
                alt="Cardicus"
                src="/images/words_camel.png"
                height={100}
                width={300}
              />
            </div>
            <div className="content w-100 flex px-5 py-5 items-center flex-col  ">
              <div className="card relative h-[450px] ">
                <div className="user w-96 ">
                  <img
                    alt="image"
                    className=" user"
                    src={user?.image || "/images/default.png"}
                    srcSet={`${user?.image} 400w,
                  ${user?.image} 1600w,
                  ${user?.image} 800w,
                  `}
                    sizes="100vw"
                  />
                  <div className="profile justify-evenly flex rounded-xl">
                    <div className="profile-left">
                      <div className="name">
                        {" "}
                        {user?.name} {user?.lastName}
                      </div>
                      <div className="title">{user?.title}</div>
                    </div>
                    <div className=" local profile-right">
                      {" "}
                      <span>{user?.proNouns}</span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AddToContact data={user} />
            <div className="content w-100 flex mb-4 px-5 items-center flex-col ">
              <div className="card relative h-80  ">
                <div className="user-info">
                  <div className="text-center pt-4"> </div>
                  <div className=" text-center mx-auto font-serif px-5 font-medium text-lg">
                    {" "}
                    {user?.bio}{" "}
                  </div>
                  <div className="flex justify-evenly space-x-8 py-2 ">
                    <div className="">
                      <a href={phoneLink}>
                        <button className="phone text-center align-middle justify-center text-white flex rounded-3xl px-6 py-1">
                          <HiPhone size={25} color="white" />
                        </button>
                      </a>
                    </div>
                    <div className="">
                      <a href={emailLink}>
                        <button className=" email text-center align-middle justify-center text-white flex rounded-3xl px-6 pt-1">
                          <HiMail color="white" size={30} />
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                {user.link1 ? (
                  <Link href={user.link1}>
                    {" "}
                    <div className=" link button my-4 w-96 mx-auto ">
                      {user?.linkText1}
                    </div>
                  </Link>
                ) : null}
                {user.link2 ? (
                  <Link href={user.link2}>
                    <div className="link button w-96 mx-auto">
                      {user?.linkText2}
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>User Not Found</div>
      )}
    </>
  );
};
export default ProfilePage;
