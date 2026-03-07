"use client"

import { useFetchData } from "@/hooks/useFetchData";
import FormCard from "../FormCard";
import { useParams, useSearchParams } from "next/navigation";

import { ApiResponse, FormDesignData, FormField, FormTemplateData, DesignJson, FormConfig } from "@/app/config/forms";

export default function FormPage() {
    const params = useParams();
    const search = useSearchParams()
    const id = params?.id as string;
    const isStyle = search.get("isStyle")

    const { data, isLoading, error } = useFetchData<ApiResponse>({
        queryKey: ["form", id, isStyle!],
        endpoint: isStyle === "true" ? `FormDesign/GetDesignFormById/${id}` : `FormTemplates/GetFormById/${id}`,
        options: {
            enabled: !!id
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 uppercase font-black text-2xl">
                <div className="animate-pulse text-gray-400">Loading form...</div>
            </div>
        );
    }

    if (error || !data || !data.success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 capitalize font-bold text-xl">
                <div className="text-red-500">Error: Form not found or failed to load.</div>
            </div>
        );
    }

    // Transform API response to FormConfig structure
    let formConfig: FormConfig;

    if (isStyle === "true") {
        const designData = data.data as FormDesignData;
        let designJson: DesignJson = { version: "1.0", formTitle: "", fields: [] };

        try {
            if (designData.designJson) {
                designJson = typeof designData.designJson === "string"
                    ? JSON.parse(designData.designJson)
                    : designData.designJson;
            }
        } catch (e) {
            console.error("Failed to parse designJson:", e);
        }

        formConfig = {
            id: designData.formTemplateId || designData.id,
            formTitle: designJson.formTitle || designData.formTemplateName || "Untitled Form",
            isStyle: true,
            isPaid: false, // FormDesignData might not have this directly, adjust if needed
            price: 0,
            fields: Array.isArray(designJson.fields) ? designJson.fields : []
        };
    } else {
        const templateData = data.data as FormTemplateData;

        // If the template says it should be styled and has designs, use the latest design
        if (templateData.isStyle && templateData.formDesigns && templateData.formDesigns.length > 0) {
            // Sort by createdAt descending to get the latest
            const latestDesign = [...templateData.formDesigns].sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )[0];

            let designJson: DesignJson = { version: "1.0", formTitle: "", fields: [] };
            try {
                if (latestDesign.designJson) {
                    designJson = typeof latestDesign.designJson === "string"
                        ? JSON.parse(latestDesign.designJson)
                        : latestDesign.designJson;
                }
            } catch (e) {
                console.error("Failed to parse designJson from template:", e);
            }

            formConfig = {
                id: templateData.id,
                formTitle: designJson.formTitle || templateData.formName || "Untitled Form",
                isStyle: true,
                isPaid: templateData.isPaid,
                price: templateData.price,
                fields: Array.isArray(designJson.fields) ? designJson.fields : []
            };
        } else {
            let fields: (string | FormField)[] = [];

            try {
                if (templateData.templateFields) {
                    fields = typeof templateData.templateFields === "string"
                        ? JSON.parse(templateData.templateFields)
                        : templateData.templateFields;
                }
            } catch (e) {
                console.error("Failed to parse templateFields:", e);
            }

            // Add static button if missing and isStyle is false
            const hasButton = fields.some(f => {
                if (typeof f === "string") {
                    const lower = f.toLowerCase();
                    return lower === "button" || lower === "submit";
                }
                const field = f as any;
                return field.type === "button" || field.name === "Button" || field.name === "submit";
            });

            if (!hasButton) {
                fields.push({
                    name: "Button",
                    label: "Submit",
                    type: "button"
                } as any);
            }

            formConfig = {
                id: templateData.id,
                formTitle: templateData.formName || "Untitled Form",
                isStyle: false,
                isPaid: templateData.isPaid,
                price: templateData.price,
                fields: Array.isArray(fields) ? fields : []
            };
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 shadow-sm">
            <div className="mx-auto max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        {formConfig.formTitle}
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Please provide the required information in the fields below.
                    </p>
                </div>

                <div className="flex justify-center items-center">
                    <FormCard config={formConfig} />
                </div>
            </div>
        </div>
    );
}
