"use client";
import React, { useState, useRef, DragEvent } from 'react';
import { Phone, Mail, Globe, MapPin, Briefcase, GraduationCap, Code, FolderOpen, Award, Languages, Heart, UserCheck, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Define types for section items
interface SectionItem {
  title?: string;
  name?: string;
  organization?: string;
  institution?: string;
  date?: string;
  year?: string;
  description?: string;
}

// Define types for sections
interface Section {
  name: string;
  value: SectionItem[] | string;
}

interface Resume2Props {
  targetRef: React.RefObject<HTMLDivElement>;
  formData: Section[];
}

const Resume2: React.FC<Resume2Props> = ({ targetRef, formData }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [scale, setScale] = useState<number>(1);
  const dragRef = useRef<HTMLDivElement>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      e.dataTransfer.setData('text/plain', `${offsetX},${offsetY}`);
    }
  };

  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    if (e.clientX === 0 && e.clientY === 0) return;
    const parentRect = e.currentTarget.getBoundingClientRect();
    const [offsetX, offsetY] = e.dataTransfer.getData('text/plain').split(',');
    const newX = e.clientX - parentRect.left - parseInt(offsetX, 10);
    const newY = e.clientY - parentRect.top - parseInt(offsetY, 10);
    setPosition({ x: newX, y: newY });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const increaseScale = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const decreaseScale = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const renderSection = (section: Section) => {
    const IconComponent = getSectionIcon(section.name);
    if (!section.value || (Array.isArray(section.value) && section.value.length === 0)) return null;
    switch (section.name.toLowerCase()) {
      case 'profile':
        return null; // These will be handled in the header
      case 'summary':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2 flex items-center">
              <IconComponent size={20} className="mr-2" />
              Summary
            </h2>
            <p className="text-sm">{section.value as string}</p>
          </div>
        );
      case 'experience':
      case 'education':
      case 'projects':
      case 'certifications':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2 flex items-center">
              <IconComponent size={20} className="mr-2" />
              {capitalizeFirstLetter(section.name)}
            </h2>
            {(section.value as SectionItem[]).map((item, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">{item.title || item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.organization || item.institution} | {item.date || item.year}
                </p>
                {item.description && <p className="text-sm mt-1">{item.description}</p>}
              </div>
            ))}
          </div>
        );
      case 'skills':
      case 'languages':
      case 'hobbies':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2 flex items-center">
              <IconComponent size={20} className="mr-2" />
              {capitalizeFirstLetter(section.name)}
            </h2>
            <ul className="list-disc list-inside text-sm columns-2">
              {(section.value as (string | { name: string })[]).map((item, index) => (
                <li key={index}>{typeof item === 'string' ? item : item.name}</li>
              ))}
            </ul>
          </div>
        );
      case 'references':
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

  const getSectionIcon = (sectionName: string) => {
    switch (sectionName.toLowerCase()) {
      case 'summary': return Globe;
      case 'experience': return Briefcase;
      case 'education': return GraduationCap;
      case 'skills': return Code;
      case 'projects': return FolderOpen;
      case 'certifications': return Award;
      case 'languages': return Languages;
      case 'hobbies': return Heart;
      case 'references': return UserCheck;
      default: return Globe;
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getPersonalInfo = () => {
    const profile = formData.find((section) => section.name.toLowerCase() === 'profile')?.value as Section[];
    if (!profile) return { name: '', email: '', phone: '' };
    const name = profile.find((item) => item.name?.toLowerCase() === 'name')?.value as String || '' ;
    const email = profile.find((item) => item.name?.toLowerCase() === 'email')?.value as String || '' ;
    const phone = profile.find((item) => item.name?.toLowerCase() === 'phone')?.value as String || '' ;
    return { name, email, phone };
  };

  const { name, email, phone } = getPersonalInfo();

  return (
    <div className="h-full border-x border-gray-200 relative flex flex-col">
      <div
        ref={targetRef}
        className="flex-grow relative"
        onDragOver={onDragOver}
        onDrop={onDrag}
      >
        <div
          ref={dragRef}
          draggable
          onDragStart={onDragStart}
          className="absolute aspect-[3/4] bg-white p-8 shadow-lg rounded-lg cursor-move text-pink-500"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: '70%',
            maxHeight: '90%',
            overflow: 'auto',
          }}
        >
          <div className="text-center mb-6 ">
            <h1 className="text-3xl font-bold mb-2">{name}</h1>
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              {phone && <span className="flex items-center"><Phone size={14} className="mr-1" />{phone}</span>}
              {email && <span className="flex items-center"><Mail size={14} className="mr-1" />{email}</span>}
            </div>
          </div>
          
          {formData.map((section, index) => (
            <div key={index}>{renderSection(section)}</div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-zinc-800 bg-opacity-50 rounded-lg border-2 text-white absolute bottom-8 right-[50%] w-96 flex justify-center items-center space-x-4">
        <button 
          onClick={decreaseScale} 
          className="px-4 py-2 rounded hover:bg-red-700"
        >
          -
        </button>
        <p className="text-xl">{(scale * 100).toFixed(0)}%</p>
        <button 
          onClick={increaseScale} 
          className="px-4 py-2 rounded hover:bg-green-700"
        >
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

export default Resume2;
