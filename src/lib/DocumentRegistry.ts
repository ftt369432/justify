export interface PdfMapping {
    templateUrl: string;
    fields: Record<string, (answers: any) => string | boolean>;
}

export interface FormRegistry {
    [serviceType: string]: PdfMapping;
}

export const DOCUMENT_REGISTRY: FormRegistry = {
    'divorce': {
        templateUrl: '/forms/fl-100.pdf', // Requires placing this file in public/forms/
        fields: {
            // These field names must match the actual PDF Form Field Names
            'PetitionerName': (answers) => `${answers.client_name_first || ''} ${answers.client_name_last || ''}`,
            'StreetAddress': (answers) => answers.client_address || '123 Test St, Los Angeles, CA 90012',
            'CityStateZip': (answers) => answers.client_city_zip || 'Los Angeles, CA 90012',
            'Phone': (answers) => answers.client_phone || '',

            // Checkboxes often use string 'Yes' or boolean true depending on the PDF structure
            'Check_Dissolution': (answers) => 'Yes',
            'Check_Petitioner': (answers) => 'Yes',

            // Logic-based fields
            'DateOfMarriage': (answers) => answers.marriage_date || '',
            'DateOfSeparation': (answers) => answers.separation_date || '',
            'Check_MinorChildren': (answers) => answers.has_minor_children === true ? 'Yes' : 'No',
        }
    },
    'bankruptcy': {
        templateUrl: '/forms/b-101.pdf',
        fields: {
            'DebtorName': (answers) => `${answers.client_name_first || ''} ${answers.client_name_last || ''}`,
            'Chapter7': (answers) => answers.bankruptcy_chapter === 'chapter_7' ? 'Yes' : 'Off',
            'Chapter13': (answers) => answers.bankruptcy_chapter === 'chapter_13' ? 'Yes' : 'Off',
            'CreditCounselingYes': (answers) => answers.credit_counseling_done === true ? 'Yes' : 'Off',
            'EstimatedDebts': (answers) => answers.total_unsecured_debt || '',
        }
    },
    'workers-comp-dwc1': {
        templateUrl: '/forms/dwc-1.pdf',
        fields: {
            'EmployeeName': (answers) => answers.client_name || `${answers.client_name_first || ''} ${answers.client_name_last || ''}`,
            'EmployeeAddress': (answers) => answers.client_address || '',
            'EmployeeCity': (answers) => answers.client_city || '',
            'EmployeeState': (answers) => answers.client_state || 'CA',
            'EmployeeZip': (answers) => answers.client_zip || '',
            'DateOfInjury': (answers) => answers.injury_date || '',
            'TimeOfInjury': (answers) => answers.injury_time || '',
            'InjuryLocation': (answers) => answers.injury_location || '',
            'DescribeInjury': (answers) => answers.injury_description || '',
            'EmployerName': (answers) => answers.employer_name || '',
            'EmployerAddress': (answers) => answers.employer_address || '',
            'InsuranceCarrier': (answers) => answers.insurance_carrier || '',
        }
    }
};
