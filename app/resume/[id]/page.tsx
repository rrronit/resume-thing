"use client";
import { useState } from "react";
import Builder from "../../components/Builder";
import Customize from "../../components/Customize";
import Resume from "../../components/Resume";
import { usePDF } from "react-to-pdf";
import Resume2 from "../../components/Resume2";
import { Toaster } from "../../components/ui/toaster";
import { useParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { SkipBack, SkipForward } from "lucide-react";

const StaticData: { [key: string]: any } = {
    1: {
        name: "John Doe",
        email: "john@gmail.com",
        phone: "1234567890",
        summary:
            "I am a software developer with 5 years of experience in web development.",
        experience: [
            {
                title: "Software Developer",
                organization: "Google",
                date: "Jan 2020 - Present",
                description:
                    "Developed web applications using React.js and Node.js.",
            },
        ],
        education: [
            {
                title: "Bachelor's in Computer Science",
                institution: "MIT",
                year: "2015",
            },
        ],
        skills: [
            {
                name: "React.js",
                level: "Intermediate",
            },
        ],
        projects: [
            {
                title: "E-commerce Website",
                description:
                    "Developed an e-commerce website using React.js and Node.js.",
            },
        ],
        certifications: [
            {
                title: "React.js Certification",
                organization: "Coursera",
                date: "2020",
            },
        ],
        languages: [
            {
                name: "English",
                level: "Fluent",
            },
        ],
        hobbies: [
            {
                name: "Reading",
            },
        ],
    },
    2: {
        name: "Jane Doe",
        email: "jane@gmail.com",
        phone: "0987654321",
        summary:
            "I am a software developer with 5 years of experience in web development.",
        experience: [
            {
                title: "Software Developer",
                organization: "Google",
                date: "Jan 2020 - Present",
                description:
                    "Developed web applications using React.js and Node.js.",
            },
        ],
        education: [
            {
                title: "Bachelor's in Computer Science",
                institution: "MIT",
                year: "2015",
            },
        ],
        skills: [
            {
                name: "React.js",
                level: "Intermediate",
            },
        ],
        projects: [
            {
                title: "E-commerce Website",
                description:
                    "Developed an e-commerce website using React.js and Node.js.",
            },
        ],
        certifications: [
            {
                title: "React.js Certification",
                organization: "Coursera",
                date: "2020",
            },
        ],
        languages: [
            {
                name: "English",
                level: "Fluent",
            },
        ],
        hobbies: [
            {
                name: "Reading",
            },
        ],
    },
};

const Page = () => {
    const { id }: { id: string } = useParams();
    const [formData, setFormData] = useState([
        {
            name: "profile",
            value: [
                {
                    name: "name",
                    value: StaticData[id]?.name || "",
                },
                {
                    name: "email",
                    value: StaticData[id]?.email || "",
                },
                {
                    name: "phone",
                    value: StaticData[id]?.phone || "",
                },
            ],
            type: "Array",
        },
        {
            name: "summary",
            value: StaticData[id]?.summary || "",
            type: "String",
        },
        {
            name: "experience",
            value: StaticData[id]?.experience || [],
            type: "Array",
        },
        {
            name: "education",
            value: StaticData[id]?.education || [],
            type: "Array",
        },
        {
            name: "skills",
            value: StaticData[id]?.skills || [],
            type: "Array",
        },
        {
            name: "projects",
            value: StaticData[id]?.projects || [],
            type: "Array",
        },
        {
            name: "certifications",
            value: StaticData[id]?.certifications || [],
            type: "Array",
        },
        {
            name: "languages",
            value: StaticData[id]?.languages || [],
            type: "Array",
        },
        {
            name: "hobbies",
            value: StaticData[id]?.hobbies || [],
            type: "Array",
        },
        {
            name: "references",
            value: StaticData[id]?.references || [],
            type: "Array",
        },
    ]);

    const [selectedTemplate, setSelectedTemplate] = useState(1);

    const [isCustomizeOpen, setIsCustomizeOpen] = useState(true);

    const { toPDF, targetRef } = usePDF({ filename: "resume.pdf" });

    const toggleCustomize = () => {
        setIsCustomizeOpen(!isCustomizeOpen);
    };

    return (
        <div className="flex w-screen h-screen">
            <div className={`h-full ${isCustomizeOpen ? 'w-2/6' : 'w-4/12'} transition-all duration-300`}>
                <Toaster />
                <Builder formData={formData} setFormData={setFormData} />
            </div>
            <div className={`h-full ${isCustomizeOpen ? 'w-3/6' : 'w-8/12'} border-x border-gray-200 overflow-hidden transition-all duration-300`}>
                {selectedTemplate === 1 && (
                    <Resume targetRef={targetRef} formData={formData} />
                )}
                {selectedTemplate === 2 && (
                    <Resume2 targetRef={targetRef} formData={formData} />
                )}
            </div>
            <div className={`h-full ${isCustomizeOpen ? 'w-1/6' : 'w-0'} relative transition-all duration-300 `}>
                {isCustomizeOpen && (
                    <Customize
                        resumeDownload={toPDF}
                        formData={formData}
                        setFormData={setFormData}
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                    />
                )}
                <Button
                    className={`w-12 h-24 bg-zinc-500 rounded-l absolute top-1/2 -translate-y-1/2 ${
                        isCustomizeOpen ? '-left-12' : '-left-12'
                    } transition-all duration-300`}
                    onClick={toggleCustomize}
                >
                    {isCustomizeOpen ? (
                        <>
                            <SkipBack size={16} />
                        </>
                    ) : (
                        <>
                            <SkipForward size={16} />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Page;