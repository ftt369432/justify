export type QuestionType = 'TEXT' | 'CHOICE' | 'YESNO' | 'DATE' | 'CURRENCY';

export interface Question {
    id: string;
    type: QuestionType;
    title: string;
    description?: string;
    options?: { label: string; value: string; icon?: string }[];
    validation?: (value: any) => string | null; // Returns error message or null
    condition?: (answers: any) => boolean; // Logic to show/hide this question
}

export const DIVORCE_FLOW: Question[] = [
    {
        id: 'petitioner_residency',
        type: 'YESNO',
        title: 'California Residency',
        description: 'Have you lived in California for at least the last 6 months, and in your current county for the last 3 months?',
    },
    {
        id: 'marriage_date',
        type: 'DATE',
        title: 'Date of Marriage',
        description: 'When were you legally married? This determines the start of the community property period.',
    },
    {
        id: 'separation_date',
        type: 'DATE',
        title: 'Date of Separation',
        description: 'When did you arguably part ways with the intent to end the marriage? This determines the end of the community property period.',
    },
    {
        id: 'has_minor_children',
        type: 'YESNO',
        title: 'Minor Children',
        description: 'Do you and your spouse have any minor children together (under 18)?',
    },
    {
        id: 'child_custody_pref',
        type: 'CHOICE',
        title: 'Custody Preference',
        description: 'What is your preferred physical custody arrangement?',
        condition: (answers) => answers.has_minor_children === true,
        options: [
            { label: '50/50 Joint Custody', value: 'joint_50_50' },
            { label: 'Primary Physical Custody (Me)', value: 'primary_petitioner' },
            { label: 'Primary Physical Custody (Spouse)', value: 'primary_respondent' },
        ]
    },
    {
        id: 'property_ownership',
        type: 'CHOICE',
        title: 'Real Estate',
        description: 'Do you own any real estate together (or separately)?',
        options: [
            { label: 'Yes, we own a home together', value: 'joint_home' },
            { label: 'Yes, I own a home separately', value: 'separate_home_petitioner' },
            { label: 'Yes, spouse owns a home separately', value: 'separate_home_respondent' },
            { label: 'No, we rent', value: 'none' },
        ]
    }
];

export const BANKRUPTCY_FLOW: Question[] = [
    {
        id: 'bankruptcy_chapter',
        type: 'CHOICE',
        title: 'Chapter Selection',
        description: 'Which type of bankruptcy are you looking to file?',
        options: [
            { label: 'Chapter 7 (Liquidation)', value: 'chapter_7' },
            { label: 'Chapter 13 (Repayment Plan)', value: 'chapter_13' },
            { label: 'I am not sure yet', value: 'unsure' },
        ]
    },
    {
        id: 'credit_counseling_done',
        type: 'YESNO',
        title: 'Credit Counseling Course',
        description: 'Have you completed the mandatory Pre-Filing Credit Counseling course (within the last 180 days)?',
    },
    {
        id: 'credit_counseling_date',
        type: 'DATE',
        title: 'Course Completion Date',
        description: 'Please enter the date listed on your certificate.',
        condition: (answers) => answers.credit_counseling_done === true
    },
    {
        id: 'has_prior_filings',
        type: 'YESNO',
        title: 'Prior Bankruptcies',
        description: 'Have you filed for bankruptcy in the last 8 years?',
    },
    {
        id: 'total_unsecured_debt',
        type: 'TEXT', // Ideally CURRENCY type
        title: 'Unsecured Debt',
        description: 'Roughly how much total credit card, medical, and personal loan debt do you have?',
    },
    {
        id: 'owns_real_estate',
        type: 'YESNO',
        title: 'Real Estate',
        description: 'Do you own any homes, land, or other real estate?',
    },
    {
        id: 'home_equity',
        type: 'TEXT',
        title: 'Home Equity',
        description: 'Approximately how much equity (Value minus Mortgage) is in your property?',
        condition: (answers) => answers.owns_real_estate === true
    }
];

export const WORKERS_COMP_FLOW: Question[] = [
    {
        id: 'injury_date',
        type: 'DATE',
        title: 'Date of Injury',
        description: 'When did the injury occur? This is critical for the statute of limitations.',
    },
    {
        id: 'reported_to_employer',
        type: 'YESNO',
        title: 'Reported to Employer',
        description: 'Did you report the injury to your manager or supervisor within 30 days?',
    },
    {
        id: 'body_parts',
        type: 'TEXT',
        title: 'Injured Body Parts',
        description: 'Which parts of your body were injured? (e.g., Lower Back, Left Knee)',
    },
    {
        id: 'still_working',
        type: 'YESNO',
        title: 'Still Working',
        description: 'Are you currently performing your usual job duties?',
    },
    {
        id: 'employer_name',
        type: 'TEXT',
        title: 'Employer Name',
        description: 'Who were you working for at the time of the injury?',
    },
];

export const getQuestionsForService = (serviceId: string) => {
    const normalize = serviceId.toLowerCase();
    if (normalize.includes('bankruptcy')) return BANKRUPTCY_FLOW;
    if (normalize.includes('divorce')) return DIVORCE_FLOW;
    if (normalize.includes('workers') || normalize.includes('comp') || normalize.includes('injury')) return WORKERS_COMP_FLOW;

    // Default to Divorce if unknown
    return DIVORCE_FLOW;
};
