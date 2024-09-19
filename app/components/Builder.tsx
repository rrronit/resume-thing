import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { Bot, PlusCircle, Trash2 } from "lucide-react";

type FieldType = "Array" | "String";

interface Field {
    name: string;
    value: any; // `any` can be replaced with a more specific type based on the value
    type: FieldType;
}

interface ArrayFieldProps {
    field: Field;
    onUpdate: (fieldName: string, newValue: any) => void;
}

const ArrayField: React.FC<ArrayFieldProps> = ({ field, onUpdate }) => {
    const addItem = () => {
        onUpdate(field.name, [...field.value, {}]);
    };

    const updateItem = (index: number, key: string, value: string) => {
        const newValue = field.value.map((item: any, i: number) =>
            i === index ? { ...item, [key]: value } : item
        );
        onUpdate(field.name, newValue);
    };

    const removeItem = (index: number) => {
        const newValue = field.value.filter((_: any, i: number) => i !== index);
        onUpdate(field.name, newValue);
    };

    if (field.name === "profile") {
        return (
            <div>
                {field.value.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                    >
                        <label>
                            <span className="text-lg font-medium">
                                {item.name}
                            </span>
                        </label>
                        <Input
                            value={item.value}
                            onChange={(e) =>
                                updateItem(index, "value", e.target.value)
                            }
                            placeholder="Field Value"
                        />
                    </div>
                ))}

                <Button
                    onClick={() => {
                        onUpdate(field.name, [
                            ...field.value,
                            { name: "", value: "" },
                        ]);
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Field
                </Button>
            </div>
        );
    }

    return (
        <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
                {field.name}
            </label>
            <Accordion type="multiple" className="w-full">
                {field.value.map((item: any, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                            {item.title || `${field.name} ${index + 1}`}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                <Input
                                    placeholder="Title"
                                    value={item.title || ""}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    placeholder="Organization"
                                    value={item.organization || ""}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            "organization",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    placeholder="Date"
                                    value={item.date || ""}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            "date",
                                            e.target.value
                                        )
                                    }
                                />
                                <Textarea
                                    placeholder="Description"
                                    value={item.description || ""}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                                <Button size="sm" className="mr-2">
                                <Bot className="h-4 w-4 mr-2" />Fix with AI
                                    </Button>
                                <Button
                                    onClick={() => removeItem(index)}
                                    variant="destructive"
                                    size="sm"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button
                onClick={addItem}
                variant="outline"
                size="sm"
                className="mt-2"
            >
                <PlusCircle className="h-4 w-4 mr-2" /> Add {field.name}
            </Button>
        </div>
    );
};

const Builder = ({
    formData,
    setFormData,
}: {
    formData: any;
    setFormData: any;
}) => {
    const [customFields, setCustomFields] = useState<
        { name: string; value: string }[]
    >([]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: string
    ) => {
        const { value } = e.target;
        setFormData((prev: any) =>
            prev.map((field: any) =>
                field.name === fieldName ? { ...field, value } : field
            )
        );
    };

    const handleArrayFieldUpdate = (fieldName: string, newValue: any) => {
        setFormData((prev: any) =>
            prev.map((field: any) =>
                field.name === fieldName ? { ...field, value: newValue } : field
            )
        );
    };

    const handleAddCustomField = () => {
        setCustomFields((prev) => [...prev, { name: "", value: "" }]);
    };

    const handleCustomFieldChange = (
        index: number,
        key: "name" | "value",
        value: string
    ) => {
        setCustomFields((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [key]: value };
            return updated;
        });
    };

    const renderField = (field: Field) => {
        switch (field.type) {
            case "Array":
                return (
                    <ArrayField
                        field={field}
                        onUpdate={handleArrayFieldUpdate}
                    />
                );
            case "String":
                if (field.name === "summary") {
                    return (
                        <div className="my-4">
                            <label className="block text-xl font-medium mb-1">
                                Summary
                            </label>
                            <Textarea
                                name={field.name}
                                value={field.value}
                                onChange={(e) =>
                                    handleInputChange(e, field.name)
                                }
                                placeholder="Write a brief summary..."
                                rows={5}
                            />
                            <Button className="my-2">Fix with AI</Button>
                        </div>
                    );
                }
                return (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            {field.name}
                        </label>
                        <Input
                            name={field.name}
                            value={field.value}
                            onChange={(e) => handleInputChange(e, field.name)}
                            placeholder={`Enter ${field.name}`}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-4 overflow-y-auto h-screen bg-gray-100">
            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="basics">
                        <TabsList className="grid w-full grid-cols-3 mb-4">
                            <TabsTrigger value="basics">Basics</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="custom">Custom</TabsTrigger>
                        </TabsList>
                        <TabsContent value="basics">
                            {formData
                                .filter((field: any) =>
                                    ["profile", "summary"].includes(
                                        field.name.toLowerCase()
                                    )
                                )
                                .map((field: any) => renderField(field))}
                        </TabsContent>
                        <TabsContent value="details">
                            {formData
                                .filter(
                                    (field: any) =>
                                        !["profile", "summary"].includes(
                                            field.name.toLowerCase()
                                        )
                                )
                                .map((field: any) => renderField(field))}
                        </TabsContent>
                        <TabsContent value="custom">
                            {customFields.map((field, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 mb-2"
                                >
                                    <Input
                                        value={field.name}
                                        onChange={(e) =>
                                            handleCustomFieldChange(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Field Name"
                                    />
                                    <Input
                                        value={field.value}
                                        onChange={(e) =>
                                            handleCustomFieldChange(
                                                index,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Field Value"
                                    />
                                </div>
                            ))}
                            <Button
                                onClick={handleAddCustomField}
                                variant="outline"
                                size="sm"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" /> Add
                                Custom Field
                            </Button>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default Builder;
