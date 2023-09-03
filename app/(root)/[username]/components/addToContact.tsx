"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import React from "react";
import VCard from "vcard-creator";
import FileSaver from "file-saver";
import fs from "fs";
interface AddToContactProps {
  data: User | null;
}
export const AddToContact: React.FC<AddToContactProps> = ({ data }) => {
  const saveContact = () => {
    const vCard = new VCard();
    const firstName = data?.name;
    const lastName = data?.lastName;
    const title = data?.title;
    const email = data?.email;
    const phone = data?.phone;
    if (lastName && firstName) {
      vCard.addName(lastName, firstName);
    }
    if (title) {
      vCard.addJobtitle(title);
    }
    if (email) {
      vCard.addEmail(email);
    }
    if (phone) {
      vCard.addPhoneNumber(phone);
    }
    var file = new File(
      [vCard.toString()],
      data?.name + "-" + data?.lastName + ".vcf",
      { type: "text/vcard;charset=utf-8" }
    );
    FileSaver.saveAs(file);
    console.log(vCard.toString());
  };
  return (
    <div className="mx-auto text-center">
      <button
        className="  link button mb-5 content w-96 contact"
        onClick={saveContact}
      >
        Save Contact
      </button>
    </div>
  );
};
