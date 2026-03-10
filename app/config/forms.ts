export interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    styles?: Record<string, any>;
    strengthMeter?: boolean;
    maxSizeMB?: number;
    accept?: string;
    hint?: string;
    icon?: string;
}

export interface FormTemplateData {
    id: string;
    businessId: string;
    business: any | null;
    formImage: string;
    formName: string;
    templateFields: string; // JSON string
    description: string;
    isPaid: boolean;
    price: number;
    isCashAvailable: boolean;
    availableSlots: number;
    isVisible: boolean;
    isStyle: boolean;
    needVerfication: boolean;
    createdAt: string;
    onlyFlowing: boolean;
    forAll: boolean;
    submissions: any[];
    importantSuggestions: any[];
    suggestionTemplate: any[];
    unwantedSuggestions: any[];
    feedbackEntities: any[];
    comments: any[];
    formDesigns: any[];
}

export interface FormDesignData {
    id: string;
    formTemplateId: string;
    formTemplateName: string;
    designJson: string;
    version: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string | null;
    description: string | null;
}

export interface DesignJson {
    version: string;
    formTitle: string;
    fields: FormField[];
}

export interface ApiResponse<T = FormTemplateData | FormDesignData> {
    success: boolean;
    data: T;
}

export interface FormConfig {
    id?: string;
    formTitle: string;
    isStyle?: boolean;
    isPaid?: boolean;
    price?: number;
    templateFields?: (string | FormField)[]; // Adding this for compatibility if needed
    fields?: (string | FormField)[];
    isCashAvailable?: boolean;
}

export interface FormState {
    values: Record<string, string>;
    files: Record<string, File | null>;
    errors: Record<string, string>;
    submitted: boolean;
}

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export interface StrengthResult {
    pct: number;
    color: string;
    label: string;
    emoji: string;
}
