import { PDFDocument } from 'pdf-lib';
import { DOCUMENT_REGISTRY } from './DocumentRegistry';

export const documentEngine = {
    /**
     * Generates a filled PDF based on the service type and user answers.
     * Returns a Blob URL for download.
     */
    async generateDocument(serviceType: string, answers: any): Promise<string> {

        // 1. Get the Mapping Recipe
        // Fallback to divorce if specific type not found, or handle error
        const mapping = DOCUMENT_REGISTRY[serviceType?.toLowerCase()] || DOCUMENT_REGISTRY['divorce'];

        if (!mapping) {
            throw new Error(`No document mapping found for service: ${serviceType}`);
        }

        try {
            // 2. Load the PDF Template
            // Note: In a real app, ensure this URL is accessible (in public folder)
            const formUrl = mapping.templateUrl;
            const existingPdfBytes = await fetch(formUrl).then(res => {
                if (!res.ok) throw new Error(`Failed to load template: ${formUrl}`);
                return res.arrayBuffer();
            });

            // 3. Load into pdf-lib
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();

            // 4. Fill Fields based on Mapping
            Object.entries(mapping.fields).forEach(([fieldName, valueExtractor]) => {
                try {
                    const field = form.getField(fieldName);
                    const value = valueExtractor(answers);

                    if (field.constructor.name === 'PDFTextField') {
                        const textField = form.getTextField(fieldName);
                        textField.setText(value.toString());
                    } else if (field.constructor.name === 'PDFCheckBox') {
                        const checkBox = form.getCheckBox(fieldName);
                        if (value === 'Yes' || value === true) checkBox.check();
                        else checkBox.uncheck();
                    }
                } catch (err) {
                    console.warn(`Field '${fieldName}' not found in PDF template or error filling it.`, err);
                }
            });

            // 5. Serialize and Return Blob
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            return URL.createObjectURL(blob);

        } catch (error) {
            console.error('PDF Generation Error:', error);
            // Fallback for Demo: Create a Blank PDF with Text if template fails
            return await this.createFallbackPDF(serviceType, answers);
        }
    },

    async createFallbackPDF(serviceType: string, answers: any): Promise<string> {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        page.drawText(`GENERATED DOCUMENT: ${serviceType.toUpperCase()}`, {
            x: 50,
            y: height - 50,
            size: 20,
        });

        let y = height - 100;
        Object.entries(answers).forEach(([key, value]) => {
            if (y < 50) return; // Simple truncation
            page.drawText(`${key}: ${value}`, { x: 50, y, size: 12 });
            y -= 20;
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
    }
};
