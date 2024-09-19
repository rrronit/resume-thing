"use client";
import React, { useState, useRef } from "react";
import {
    Phone,
    Mail,
    Globe,
    MapPin,
    Briefcase,
    GraduationCap,
    Code,
    FolderOpen,
    Award,
    Languages,
    Heart,
    UserCheck,
    Share,
    Share2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Resume = ({ targetRef, formData }) => {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [scale, setScale] = useState(1);
    const dragRef = useRef(null);
    const { toast } = useToast();

    const onDragStart = (e) => {
        const rect = dragRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        e.dataTransfer.setData("text/plain", `${offsetX},${offsetY}`);
    };

    const onDrag = (e) => {
        if (e.clientX === 0 && e.clientY === 0) return;
        const parentRect = e.currentTarget.getBoundingClientRect();
        const [offsetX, offsetY] = e.dataTransfer
            .getData("text/plain")
            .split(",");
        const newX = e.clientX - parentRect.left - parseInt(offsetX, 10);
        const newY = e.clientY - parentRect.top - parseInt(offsetY, 10);
        setPosition({ x: newX, y: newY });
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const increaseScale = () => {
        setScale((prev) => Math.min(prev + 0.1, 2));
    };

    const decreaseScale = () => {
        setScale((prev) => Math.max(prev - 0.1, 0.5));
    };

    const renderSection = (section) => {
        const IconComponent = getSectionIcon(section.name);
        console.log(section);
        if (!section.value || section.value.length === 0) return null;
        switch (section.name.toLowerCase()) {
            case "profile":
                return null;
            case "summary":
                return (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2 flex items-center">
                            <IconComponent size={20} className="mr-2" />
                            Summary
                        </h2>
                        <p className="text-sm">{section.value}</p>
                    </div>
                );
            case "experience":
            case "education":
            case "projects":
            case "certifications":
                return (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2 flex items-center">
                            <IconComponent size={20} className="mr-2" />
                            {capitalizeFirstLetter(section.name)}
                        </h2>
                        {section.value.map((item, index) => (
                            <div key={index} className="mb-3">
                                <h3 className="font-semibold">
                                    {item.title || item.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {item.organization || item.institution} |{" "}
                                    {item.date || item.year}
                                </p>
                                {item.description && (
                                    <p className="text-sm mt-1">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                );
            case "skills":
            case "languages":
            case "hobbies":
                return (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2 flex items-center">
                            <IconComponent size={20} className="mr-2" />
                            {capitalizeFirstLetter(section.name)}
                        </h2>
                        <ul className="list-disc list-inside text-sm columns-2">
                            {section.value.map((item, index) => (
                                <li key={index}>
                                    {typeof item === "string"
                                        ? item
                                        : item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "references":
                return (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2 flex items-center">
                            <IconComponent size={20} className="mr-2" />
                            References
                        </h2>
                    </div>
                );
            default:
                return null;
        }
    };

    const getSectionIcon = (sectionName) => {
        switch (sectionName.toLowerCase()) {
            case "summary":
                return Globe;
            case "experience":
                return Briefcase;
            case "education":
                return GraduationCap;
            case "skills":
                return Code;
            case "projects":
                return FolderOpen;
            case "certifications":
                return Award;
            case "languages":
                return Languages;
            case "hobbies":
                return Heart;
            case "references":
                return UserCheck;
            default:
                return Globe;
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getPersonalInfo = () => {
        const profile = formData.find(
            (section) => section.name.toLowerCase() === "profile"
        )?.value;
        if (!profile) return { name: "", email: "", phone: "" };
        const name = profile.find(
            (item) => item.name.toLowerCase() === "name"
        )?.value;
        const email = profile.find(
            (item) => item.name.toLowerCase() === "email"
        )?.value;
        const phone = profile.find(
            (item) => item.name.toLowerCase() === "phone"
        )?.value;
        return { name, email, phone };
    };

    const { name, email, phone } = getPersonalInfo();

    return (
        <div className="h-full w-full border-x border-gray-200 relative flex flex-col">
            <div
                className="flex-grow relative w-full"
                onDragOver={onDragOver}
                onDrop={onDrag}
            >
                <div
                    ref={dragRef}
                    draggable
                    onDragStart={onDragStart}
                >
                    <div
                        ref={targetRef}
                        className="absolute aspect-[3/4] bg-white p-8 shadow-lg rounded-lg cursor-move text-black"
                        style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            transform: `scale(${scale})`,
                            transformOrigin: "top left",
                            width: "70%",
                            overflow: "auto",
                        }}
                    >
                        <div className="text-center mb-6 ">
                            <h1 className="text-3xl font-bold mb-2">{name}</h1>
                            <div className="flex justify-center space-x-4 text-sm text-gray-600">
                                {phone && (
                                    <span className="flex items-center">
                                        <Phone size={14} className="mr-1" />
                                        {phone}
                                    </span>
                                )}
                                {email && (
                                    <span className="flex items-center">
                                        <Mail size={14} className="mr-1" />
                                        {email}
                                    </span>
                                )}
                            </div>
                        </div>

                        {formData.map((section, index) => (
                            <div key={index}>{renderSection(section)}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 bg-zinc-800 bg-opacity-50 rounded-lg border-2 text-white absolute bottom-8 right-[50%] w-5/12 flex justify-center items-center space-x-4">
                <button onClick={decreaseScale} className=" px-4 py-2 rounded ">
                    -
                </button>
                <p className="text-xl">{(scale * 100).toFixed(0)}%</p>
                <button onClick={increaseScale} className=" px-4 py-2 rounded ">
                    +
                </button>
                <button
                    onClick={() => {
                        window.navigator.clipboard.writeText(
                            "ronit.resume.takeuforward.org"
                        );
                        toast({
                            title: "Link copied to clipboard",
                            variant: "destructive",
                        });
                    }}
                >
                    <Share2 className="w-12" />
                </button>
            </div>
        </div>
    );
};

export default Resume;
