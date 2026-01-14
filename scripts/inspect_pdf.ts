
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function inspectPdf(filename: string) {
    const filePath = path.join(process.cwd(), 'public', 'forms', filename);

    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        console.log(`   Please download the form and place it in 'public/forms/'`);
        return;
    }

    try {
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
        const form = pdfDoc.getForm();
        const fields = form.getFields();

        console.log(`\n🔍 Inspecting PDF: ${filename}`);
        console.log(`   Found ${fields.length} interactive fields:\n`);
        console.log('--- FIELD MANIFEST ---');

        fields.forEach(field => {
            const type = field.constructor.name;
            const name = field.getName();
            console.log(`[${type}] ${name}`);
        });

        console.log('----------------------\n');
        console.log('✅ Inspection Complete. Copy these field names into src/lib/DocumentRegistry.ts');

    } catch (err) {
        console.error('Error inspecting PDF:', err);
    }
}

// Check arguments
const targetFile = process.argv[2];

if (!targetFile) {
    console.log("Usage: npx tsx scripts/inspect_pdf.ts <filename>");
    console.log("Example: npx tsx scripts/inspect_pdf.ts fl-100.pdf");
} else {
    inspectPdf(targetFile);
}
