import { Download, Move, Save, Share } from "lucide-react";
import { Button } from "./ui/button";
import templateImg1 from "@/templates/1.jpeg";
import templateImg2 from "@/templates/2.jpeg";
import Image from "next/image";
import { useState } from "react";

const Customize = ({ resumeDownload, formData, setFormData,selectedTemplate, setSelectedTemplate }: any) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: any, index: number) => {
        e.preventDefault();
        if (draggedIndex === null) return;

        const draggedItem = formData[draggedIndex];
        const updatedFormData = [...formData];
        updatedFormData.splice(draggedIndex, 1);
        updatedFormData.splice(index, 0, draggedItem);

        setDraggedIndex(index);
        setFormData(updatedFormData);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className="p-4 overflow-y-scroll h-screen">
            <div>
                <h1 className="text-4xl">Templates</h1>
                <div className="flex flex-col gap-2">
                    {[templateImg1, templateImg2].map((i, index) => (
                        <div  onClick={()=>setSelectedTemplate(index+1)} key={index} className={` ${selectedTemplate===(index+1) && "border-[10px] border-red-800"}`}>
                            <Image src={i} alt={`template-${index}`} />
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="text-2xl font-bold my-4">Layout</h2>
            <div className="space-y-4">
                {formData.filter((e:any)=>!["profile","summary"].includes(e.name)).map((field: any, index: any) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(index+2)}
                        onDragOver={(e) => handleDragOver(e, index+2)}
                        onDragEnd={handleDragEnd}
                        className="p-2 border rounded cursor-move flex justify-between"
                    >
                        {field.name}
                        <span>
                            <Move className="h-4 w-4" />
                        </span>
                    </div>
                ))}
            </div>

            <div className="space-y-2 mt-6">
                <Button className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button className="w-full" onClick={resumeDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button className="w-full">
                    <Share className="mr-2 h-4 w-4" /> Share
                </Button>
            </div>
        </div>
    );
};

export default Customize;
